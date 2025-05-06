import { Schema, model, type Document } from "mongoose";

import {  type ContractorPostDocument } from './ContractorPost.js';
import { type EmployeeDocument } from './Employee.js';

interface ContractorDocument extends Document {
  _id: String;
  ownerName: String;
  businessName: String;
  employees: EmployeeDocument[];
  username: String;
  email: String;
  contractorPost: ContractorPostDocument[];
  userNumber: string;
  contractorPostCount: number;
  profileImg: string;
}

const contractorSchema = new Schema<ContractorDocument>({
  contractorPost: [
    {
      type: Schema.Types.ObjectId,
      ref: "ContractorPost",
    },
  ],
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  ownerName: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  userNumber: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  profileImg: String,
});

contractorSchema.virtual('contractorPostCount').get(function () {
    return this.contractorPost.length;
});
const Contractor = model('Contractor', contractorSchema);
export { type ContractorDocument, contractorSchema };
export default Contractor