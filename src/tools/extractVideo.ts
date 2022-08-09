import Ffmpeg from "ffmpeg";
import { fps, width, height } from "./config.json";

export default async function (): Promise<void> {
    console.log("Extracting...");
    let proc = new Ffmpeg("assets/lagtrain.mp4");
    (await proc).fnExtractFrameToJPG("frames", { frame_rate: fps, size: `?x${height}`, keep_aspect_ratio: true, keep_pixel_aspect_ratio: true });
}
