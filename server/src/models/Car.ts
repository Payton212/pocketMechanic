import { Schema, model, type Document } from "mongoose";


interface CarDocument extends Document {
  carYear: string;
  carMake: string;
  carModel: string;
}

const carSchema = new Schema<CarDocument>({
    carYear: {
        type: String,
        required: true,
    },
    carMake: {
        type: String,
        required: true,
    },
    carModel: {
        type: String,
        required: true,
    },
});

const Car = model("Car", carSchema);
export { type CarDocument, carSchema };
export default Car