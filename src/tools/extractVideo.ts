import Ffmpeg from "ffmpeg";
import { fps } from "./config.json";

export default async function (): Promise<void> {
    console.log("Extracting...");
    let proc = new Ffmpeg("lagtrain.mp4");
    (await proc).fnExtractFrameToJPG("frames", { frame_rate: fps });
}
