import getPixels from "get-pixels";
import { NdArray } from "ndarray";

export default function (path: string): Promise<NdArray<Uint8Array>> {
    return new Promise<NdArray<Uint8Array>>((resolve, reject) => {
        getPixels(path, (err, img) => {
            if (err) return reject(err);
            resolve(img);
        });
    });
}
