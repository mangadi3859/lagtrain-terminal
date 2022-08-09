"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toArray(arr) {
    let shape = arr.shape;
    if (shape.length < 3)
        throw RangeError("Not valid ndarray");
    let res = [];
    for (let x = 0; x < shape[0]; x++) {
        res[x] = [];
        for (let y = 0; y < shape[1]; y++) {
            res[x][y] = [];
            for (let z = 0; z < shape[2]; z++) {
                res[x][y][z] = arr.get(x, y, z);
            }
        }
    }
    return res;
}
exports.default = toArray;
