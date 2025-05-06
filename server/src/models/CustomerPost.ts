import { Schema, model, type Document } from "mongoose";

interface CustomerPostDocument extends Document {
  description: String;
  username: String;
  budget: String;
  firstName: String;
  lastName: String;
  userNumber: String;
  img: String;
}

const customerPostSchema = new Schema<CustomerPostDocument>({
  description: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  img: String,
  budget: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userNumber: {
    type: String,
    required: true,
  },
});
const CustomerPost = model("CustomerPost", customerPostSchema);

export { type CustomerPostDocument, customerPostSchema };
export default CustomerPost