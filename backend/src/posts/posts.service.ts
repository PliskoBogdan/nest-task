import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/types/post';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {

    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { };

    async getAllPost(): Promise<Post[]> {

        const posts = await this.postModel.find().exec();

        return posts;
    }

    async getMyPosts(userId): Promise<Post[]>{
        
        const myPosts = await this.postModel.find({creator_id: userId});

        return myPosts
    }

    async getPost(postId): Promise<Post>{

        const post = await this.postModel.findById(postId).exec();

        return post;
    }

    async addPost(createPostDTO: CreatePostDto): Promise<Post>{

        const createdPost = await new this.postModel(createPostDTO);

        return createdPost.save();
    }

    async updatePost(postId, createPostDTO: CreatePostDto): Promise<Post>{
        
        const updatePost = await this.postModel.findByIdAndUpdate(postId, createPostDTO, {new:true});

        return updatePost
    }

    async deletePost(postId): Promise<any>{
        
        const deletedPost = await this.postModel.findByIdAndRemove(postId);

        return deletedPost;
    }
}
