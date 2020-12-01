
import { Controller, Res, Param, Put, HttpStatus, Post, Body, Get, NotFoundException, UseGuards, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostsController {

    constructor(private postService: PostsService) { }
    
    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async addPost(@Res() res, @Body() CreatePostDto: CreatePostDto){

        const post = await this.postService.addPost(CreatePostDto);

        return res.status(HttpStatus.OK).json({
            message: "Post has been created!",
            post
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/myposts/:userId')
    async getMyPosts(@Res() res, @Param('userId') userId){
        console.log(userId);
        
        const myPosts = await this.postService.getMyPosts(userId);

        if(!myPosts) throw new NotFoundException('You dont have posts');

        return res.status(HttpStatus.OK).json(myPosts)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/update/:postId')
    async updatePost(@Res() res, @Param('postId') postId, @Body() CreatePostDto: CreatePostDto){
               
        const post = await this.postService.updatePost(postId, CreatePostDto);

        if(!post) throw new NotFoundException('Post does not exist!');

        return res.status(HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete/:postId')
    async deleteCustomer(@Res() res, @Param('postId')  postId) {
        console.log(postId);
        
        const post = await this.postService.deletePost(postId);
        if (!post) throw new NotFoundException('Post does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted',
            post
        })
    }
}
