import { Schema, model, type Document } from "mongoose";

interface ContractorPostDocument extends Document {
  _id: String;
  description: String;
  image: String;
  contractorName: String;
  contractorNumber: String;
}

const contractorPostSchema = new Schema<ContractorPostDocument>({
    description: {
        type: String,
        required: true,
    },
    image: String,
    contractorName: {
        type: String,
        required: true,
    },
    contractorNumber: {
        type: String,
        required: true,
    },
});
const ContractorPost = model("ContractorPost", contractorPostSchema);
export { type ContractorPostDocument, contractorPostSchema };
export default ContractorPost