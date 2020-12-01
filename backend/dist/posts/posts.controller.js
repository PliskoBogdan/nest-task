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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const passport_1 = require("@nestjs/passport");
let PostsController = class PostsController {
    constructor(postService) {
        this.postService = postService;
    }
    async addPost(res, CreatePostDto) {
        const post = await this.postService.addPost(CreatePostDto);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Post has been created!",
            post
        });
    }
    async getMyPosts(res, userId) {
        console.log(userId);
        const myPosts = await this.postService.getMyPosts(userId);
        if (!myPosts)
            throw new common_1.NotFoundException('You dont have posts');
        return res.status(common_1.HttpStatus.OK).json(myPosts);
    }
    async updatePost(res, postId, CreatePostDto) {
        const post = await this.postService.updatePost(postId, CreatePostDto);
        if (!post)
            throw new common_1.NotFoundException('Post does not exist!');
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post
        });
    }
    async deleteCustomer(res, postId) {
        console.log(postId);
        const post = await this.postService.deletePost(postId);
        if (!post)
            throw new common_1.NotFoundException('Post does not exist');
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Post has been deleted',
            post
        });
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post('/create'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "addPost", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get('/myposts/:userId'),
    __param(0, common_1.Res()), __param(1, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getMyPosts", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Put('/update/:postId'),
    __param(0, common_1.Res()), __param(1, common_1.Param('postId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Delete('/delete/:postId'),
    __param(0, common_1.Res()), __param(1, common_1.Param('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deleteCustomer", null);
PostsController = __decorate([
    common_1.Controller('post'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map