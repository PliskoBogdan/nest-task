"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose = require("mongoose");
exports.PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    creator_id: String
});
//# sourceMappingURL=post.schema.js.map