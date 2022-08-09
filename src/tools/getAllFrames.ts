import fs from "fs";

export default function (): string[] {
    let frames = fs
        .readdirSync("frames")
        .filter((f) => f.endsWith(".jpg"))
        .sort((a, b) => <number>parseInt((<string[]>a.match(/(?<=_)\d+(?=\.)/))[0]) - parseInt((<string[]>b.match(/(?<=_)\d+(?=\.)/))[0]));

    return frames;
}
