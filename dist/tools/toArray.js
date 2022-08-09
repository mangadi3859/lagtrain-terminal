"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(ndarray, width, height, col) {
    let shape = [...ndarray.shape];
    let _shape = ndarray.shape;
    if (width)
        shape[0] = width;
    if (height)
        shape[1] = height;
    if (col)
        shape[2] = col;
    let res = [];
    for (let x = 0; x < shape[0]; x++) {
        res[x] = [];
        let _x = x;
        if (width) {
            let pixelWidth = Math.floor(_shape[0] / width);
            _x = _x * pixelWidth;
        }
        for (let y = 0; y < shape[1]; y++) {
            res[x][y] = [];
            let _y = y;
            if (height) {
                let pixelHeight = Math.floor(_shape[1] / height);
                _y = _y * pixelHeight;
            }
            for (let z = 0; z < shape[2]; z++) {
                // console.log(x, y, z, ndarray.get(_x, _y, z));
                res[x][y][z] = ndarray.get(_x, _y, z);
            }
        }
    }
    return res;
}
exports.default = default_1;
