import { Model } from 'mongoose';
import { Post } from 'src/types/post';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsService {
    private readonly postModel;
    constructor(postModel: Model<Post>);
    getAllPost(): Promise<Post[]>;
    getMyPosts(userId: any): Promise<Post[]>;
    getPost(postId: any): Promise<Post>;
    addPost(createPostDTO: CreatePostDto): Promise<Post>;
    updatePost(postId: any, createPostDTO: CreatePostDto): Promise<Post>;
    deletePost(postId: any): Promise<any>;
}
