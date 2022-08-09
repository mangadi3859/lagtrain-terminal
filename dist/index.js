"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const config = __importStar(require("./tools/config.json"));
const extractVideo_1 = __importDefault(require("./tools/extractVideo"));
const getAllFrames_1 = __importDefault(require("./tools/getAllFrames"));
const getPixelsPromise_1 = __importDefault(require("./tools/getPixelsPromise"));
const toArray_1 = __importDefault(require("./tools/toArray"));
const sleep_1 = __importDefault(require("./tools/sleep"));
var EncodedValue;
(function (EncodedValue) {
    EncodedValue["A"] = "\u2593\u2593";
    EncodedValue["B"] = "  ";
    EncodedValue["C"] = "\u2591\u2591";
    EncodedValue["D"] = "\u2592\u2592";
})(EncodedValue || (EncodedValue = {}));
async function main() {
    if (!fs.existsSync("./frames/lagtrain_1.jpg"))
        await (0, extractVideo_1.default)();
    if (process.argv.includes("--fresh") || !fs.existsSync(`${__dirname}/tmp/ascii.js`) || !require(`./tmp/ascii`)?.default?.data?.length) {
        console.clear();
        console.log("Processing Frames...");
        let asciiStream = fs.createWriteStream(`${__dirname}/tmp/ascii.js`, { encoding: "utf-8" });
        asciiStream.write(`
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = {
            data: [

        `);
        for await (let frame of (0, getAllFrames_1.default)()) {
            let tmp = "`";
            let pixelData = await (0, getPixelsPromise_1.default)(`./frames/${frame}`);
            let shape = pixelData.shape;
            let pixel = (0, toArray_1.default)(pixelData, undefined, undefined, 1);
            for (let x = 0; x < shape[1]; x++) {
                for (let y = 0; y < shape[0]; y++) {
                    let char;
                    let colorCode = pixel[y][x][0];
                    if (colorCode >= 200)
                        char = "A";
                    else if (colorCode <= 15)
                        char = "B";
                    else if (colorCode <= 170)
                        char = "C";
                    else
                        char = "D";
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
        await (0, sleep_1.default)(2000);
    }
    await playFrames();
}
async function playFrames() {
    console.clear();
    let encodedData = (await require("./tmp/ascii")).default?.data;
    for await (let data of encodedData) {
        // let str = data;
        let str = data.replace(/A/g, EncodedValue.A).replace(/B/g, EncodedValue.B).replace(/C/g, EncodedValue.C).replace(/D/g, EncodedValue.D);
        process.stdout.write(str);
        await (0, sleep_1.default)(Math.floor(1000 / config.fps));
    }
}
main().catch(console.error);
