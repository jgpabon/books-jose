"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const BookSchema = new mongoose_1.Schema({
    title: String,
    author: String,
    isbn: String
});
exports.default = mongoose_1.model('Book', BookSchema);
