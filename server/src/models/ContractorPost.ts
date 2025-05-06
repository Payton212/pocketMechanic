import { Schema, model, type Document } from "mongoose";

interface ContractorPostDocument extends Document {
  _id: String;
  username: String;
  description: String;
  img: String;
  businessName: String;
  userNumber: String;
}

const contractorPostSchema = new Schema<ContractorPostDocument>({
  description: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  img: String,
  businessName: {
    type: String,
    required: true,
  },
  userNumber: {
    type: String,
    required: true,
  },
});
const ContractorPost = model("ContractorPost", contractorPostSchema);
export { type ContractorPostDocument, contractorPostSchema };
export default ContractorPost