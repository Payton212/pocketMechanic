import { Schema, model, type Document } from "mongoose";


interface CarDocument extends Document {
  carId: string;
  carYear: number;
  carMake: string;
  carModel: string;
}

const carSchema = new Schema<CarDocument>({
    carYear: {
        type: Number,
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
    carId: {
        type: String,
        required: true,
    },
});

const Car = model("car", carSchema);
export { type CarDocument, carSchema };
export default Car