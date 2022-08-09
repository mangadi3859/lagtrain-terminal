"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ffmpeg_1 = __importDefault(require("ffmpeg"));
const config_json_1 = require("./config.json");
async function default_1() {
    console.log("Extracting...");
    let proc = new ffmpeg_1.default("lagtrain.mp4");
    (await proc).fnExtractFrameToJPG("frames", { frame_rate: config_json_1.fps });
}
exports.default = default_1;
