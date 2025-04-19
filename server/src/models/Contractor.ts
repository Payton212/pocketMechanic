import { Schema, model, type Document } from "mongoose";

import { contractorPostSchema, type ContractorPostDocument } from './ContractorPost.js';
import { employeeSchema, type EmployeeDocument } from './Employee.js';

interface ContractorDocument extends Document {
  contractorId: String;
  employees: EmployeeDocument[];
  username: String;
  email: String;
  contractorName: String;
  contractorPost: ContractorPostDocument[];
  description: String;
  contractorPostCount: number;
}

const contractorSchema = new Schema<ContractorDocument>({
  contractorPost: [contractorPostSchema],
  employees: [employeeSchema],
  contractorName: {
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
  description: {
    type: String,
    required: true,
  },
  contractorId: {
    type: String,
    required: true,
  },
});

contractorSchema.virtual('contractorPostCount').get(function () {
    return this.contractorPost.length;
});
const Contractor = model('contractor', contractorSchema);
export { type ContractorDocument, contractorSchema };
export default Contractor