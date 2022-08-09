"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_pixels_1 = __importDefault(require("get-pixels"));
function default_1(path) {
    return new Promise((resolve, reject) => {
        (0, get_pixels_1.default)(path, (err, img) => {
            if (err)
                return reject(err);
            resolve(img);
        });
    });
}
exports.default = default_1;
