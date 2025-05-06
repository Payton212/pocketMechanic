import { Schema, model, type Document } from "mongoose";

interface EmployeeDocument extends Document {
  _id: String;
  profileImg: String;
  firstName: String;
  lastName: String;
  description: String;
}

const employeeSchema = new Schema<EmployeeDocument>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    profileImg: String,
});
const Employee = model("Employee", employeeSchema);
export { type EmployeeDocument, employeeSchema };
export default Employee