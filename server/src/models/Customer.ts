import { Schema, model, type Document } from "mongoose";

import { type CustomerPostDocument } from "./CustomerPost.js";
import { type CarDocument } from "./Car.js";

interface CustomerDocument extends Document {
  _id: String;
  username: String;
  email: String;
  car: CarDocument[];
  firstName: String;
  lastName: String;
  customerPost: CustomerPostDocument[];
  customerPostCount: Number;
  userNumber: string;
  profileImg: String;
  // favoriteContractor: ContractorId;
}
const customerSchema = new Schema<CustomerDocument>({
  customerPost: [
    {
      type: Schema.Types.ObjectId,
      ref: "CustomerPost",
    },
  ],
  car: [
    {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
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
  userNumber: {
    type: String,
    required: true,
  },
  profileImg: String,
});

customerSchema.virtual('customerPostCount').get(function () {
  return this.customerPost.length;
});

const Customer = model('Customer', customerSchema);

export { type CustomerDocument, customerSchema };
export default Customer