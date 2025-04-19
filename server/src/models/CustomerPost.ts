import { Schema, model, type Document } from "mongoose";

interface CustomerPostDocument extends Document {
  customerPostId: string;
  image: String;
  description: String;
  budget: String;
}

const customerPostSchema = new Schema<CustomerPostDocument>({
    description: {
        type: String,
        required: true,
    },
    image: String,
    budget: {
        type: String,
        required: true,
    },
    customerPostId: {
        type: String,
        required: true,
    },
});
const CustomerPost = model("customerPost", customerPostSchema);

export { type CustomerPostDocument, customerPostSchema };
export default CustomerPost