"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_1 = require("../types/post");
let PostsService = class PostsService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    ;
    async getAllPost() {
        const posts = await this.postModel.find().exec();
        return posts;
    }
    async getMyPosts(userId) {
        const myPosts = await this.postModel.find({ creator_id: userId });
        return myPosts;
    }
    async getPost(postId) {
        const post = await this.postModel.findById(postId).exec();
        return post;
    }
    async addPost(createPostDTO) {
        const createdPost = await new this.postModel(createPostDTO);
        return createdPost.save();
    }
    async updatePost(postId, createPostDTO) {
        const updatePost = await this.postModel.findByIdAndUpdate(postId, createPostDTO, { new: true });
        return updatePost;
    }
    async deletePost(postId) {
        const deletedPost = await this.postModel.findByIdAndRemove(postId);
        return deletedPost;
    }
};
PostsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Post')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map