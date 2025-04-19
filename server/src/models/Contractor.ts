import { Schema, model, type Document } from "mongoose";

import { contractorPostSchema, type ContractorPostDocument } from './ContractorPost.js';
import { employeeSchema, type EmployeeDocument } from './Employee.js';

interface ContractorDocument extends Document {
  contractorId: string;
  employees: EmployeeDocument[];
  contractorName: string;
  contractorPost: ContractorPostDocument[];
  description: string;
  contractorPostCount: number;
}

const contractorSchema = new Schema<ContractorDocument>(
    {
        contractorPost: [contractorPostSchema],
        employees: [employeeSchema],
        contractorName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        contractorId: {
            type: String,
            required: true,
        },
    }
);

contractorSchema.virtual('contractorPostCount').get(function () {
    return this.contractorPost.length;
});
const Contractor = model('contractor', contractorSchema);
export { type ContractorDocument, contractorSchema };
export default Contractor