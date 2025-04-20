import { Schema, model, type Document } from "mongoose";

import {  type ContractorPostDocument } from './ContractorPost.js';
import { type EmployeeDocument } from './Employee.js';

interface ContractorDocument extends Document {
  _id: String;
  firstName: String;
  lastName: String;
  employees: EmployeeDocument[];
  username: String;
  email: String;
  contractorPost: ContractorPostDocument[];
  contractorPostCount: number;
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
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
});

contractorSchema.virtual('contractorPostCount').get(function () {
    return this.contractorPost.length;
});
const Contractor = model('Contractor', contractorSchema);
export { type ContractorDocument, contractorSchema };
export default Contractor