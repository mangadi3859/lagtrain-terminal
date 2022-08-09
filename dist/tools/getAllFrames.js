"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function default_1() {
    let frames = fs_1.default
        .readdirSync("frames")
        .filter((f) => f.endsWith(".jpg"))
        .sort((a, b) => parseInt(a.match(/(?<=_)\d+(?=\.)/)[0]) - parseInt(b.match(/(?<=_)\d+(?=\.)/)[0]));
    return frames;
}
exports.default = default_1;
