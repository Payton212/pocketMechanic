import { Schema, model, type Document } from "mongoose";

interface EmployeeDocument extends Document {
  employeeId: String;
  image: String;
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
    image: String,
    employeeId: {
        type: String,
        required: true,
    },
});
const Employee = model("employee", employeeSchema);
export { type EmployeeDocument, employeeSchema };
export default Employee