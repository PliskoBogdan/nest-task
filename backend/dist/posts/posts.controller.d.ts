import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsController {
    private postService;
    constructor(postService: PostsService);
    addPost(res: any, CreatePostDto: CreatePostDto): Promise<any>;
    getMyPosts(res: any, userId: any): Promise<any>;
    updatePost(res: any, postId: any, CreatePostDto: CreatePostDto): Promise<any>;
    deleteCustomer(res: any, postId: any): Promise<any>;
}
