import * as fs from "fs";
import * as config from "./tools/config.json";
import extractFrames from "./tools/extractVideo";
import getAllFrames from "./tools/getAllFrames";
import getPixels from "./tools/getPixelsPromise";
import toArray from "./tools/toArray";
import sleep from "./tools/sleep";

enum EncodedValue {
    A = "▓▓",
    B = "  ",
    C = "░░",
    D = "▒▒",
}

async function main() {
    if (!fs.existsSync("./frames/lagtrain_1.jpg")) await extractFrames();

    if (process.argv.includes("--fresh") || !fs.existsSync(`${__dirname}/tmp/ascii.js`) || !require(`./tmp/ascii`)?.default?.data?.length) {
        console.clear();
        console.log("Processing Frames...");

        let asciiStream = fs.createWriteStream(`${__dirname}/tmp/ascii.js`, { encoding: "utf-8" });

        asciiStream.write(`
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = {
            data: [

        `);

        for await (let frame of getAllFrames()) {
            let tmp = "`";

            let pixelData = await getPixels(`./frames/${frame}`);
            let shape = pixelData.shape;
            let pixel = toArray(pixelData, undefined, undefined, 1);
            for (let x = 0; x < shape[1]; x++) {
                for (let y = 0; y < shape[0]; y++) {
                    let char: string;
                    let colorCode = pixel[y][x][0];

                    if (colorCode >= 200) char = "A";
                    else if (colorCode <= 15) char = "B";
                    else if (colorCode <= 170) char = "C";
                    else char = "D";

                    tmp += char;
                }
                tmp += "\n";
            }

            tmp += "`,\n\n";
            asciiStream.write(tmp);
            console.log(`${frame} is encoded...`);
        }

        asciiStream.write(`
    ]
}`);

        asciiStream.end(null);
        await sleep(2000);
    }

    await playFrames();
}

async function playFrames(): Promise<void> {
    console.clear();
    let encodedData: string[] = (await require("./tmp/ascii")).default?.data;

    for await (let data of encodedData) {
        // let str = data;
        let str = data.replace(/A/g, EncodedValue.A).replace(/B/g, EncodedValue.B).replace(/C/g, EncodedValue.C).replace(/D/g, EncodedValue.D);
        process.stdout.write(str);
        await sleep(Math.floor(1000 / config.fps));
    }
}

main().catch(console.error);
