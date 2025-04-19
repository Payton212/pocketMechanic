import { Schema, model, type Document } from "mongoose";

import { customerPostSchema, type CustomerPostDocument } from "./CustomerPost.js";
import { carSchema, type CarDocument } from "./Car.js";

interface CustomerDocument extends Document {
  customerId: string;
  car: CarDocument[];
  firstName: String;
  lastName: String;
  customerPost: CustomerPostDocument[];
  customerPostCount: Number;
 // favoriteContractor: ContractorId;
}
const customerSchema = new Schema<CustomerDocument>({
  customerPost: [customerPostSchema],
  car: [carSchema],
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
});

customerSchema.virtual('customerPostCount').get(function () {
  return this.customerPost.length;
});

const Customer = model('Customer', customerSchema);

export { type CustomerDocument, customerSchema };
export default Customer