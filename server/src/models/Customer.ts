import { Schema, model, type Document } from "mongoose";

import { type CustomerPostDocument } from "./CustomerPost.js";
import { carSchema, type CarDocument } from "./Car.js";

interface CustomerDocument extends Document {
  customerId: String;
  username: String;
  email: String;
  car: CarDocument[];
  firstName: String;
  lastName: String;
  customerPost: CustomerPostDocument[];
  customerPostCount: Number;
  // favoriteContractor: ContractorId;
}
const customerSchema = new Schema<CustomerDocument>({
  customerPost: [{
      type: Schema.Types.ObjectId,
      ref: "CustomerPost",
    }],
  car: [carSchema],
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  firstName: {
    type: String,
    
  },
  lastName: {
    type: String,
    
  },
  
});

customerSchema.virtual('customerPostCount').get(function () {
  return this.customerPost.length;
});

const Customer = model('Customer', customerSchema);

export { type CustomerDocument, customerSchema };
export default Customer