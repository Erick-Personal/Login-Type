"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateToken = (req, res, next) => {
    console.log('Validate Token');
    next();
};
exports.default = validateToken;
