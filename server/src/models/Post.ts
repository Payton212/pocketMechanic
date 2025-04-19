import { Schema, model, type Document } from "mongoose";

interface PostDocument extends Document {
    postId: string;
    images: string;
    description: string;
    budget: number;
    contractorName: string;
}

const postSchema = new Schema<PostDocument>({
    postId: {
        type: String,
        required: true,
    },
    images: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
    },
    contractorName: {
        type: String,
    },
});

const Post = model("posts", postSchema);
export { type PostDocument, postSchema };
export default Post