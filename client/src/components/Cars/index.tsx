import { DELETE_CAR } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
interface Car {
  _id: string;
  carYear: string;
  carMake: string;
  carModel: string;
}
interface CarProps {
  cars: Car[];
  title: string;
  customerId?: string;
}

const CarList: React.FC<CarProps> = ({ cars, title, customerId }) => {
  const [removeCar] = useMutation(DELETE_CAR);
    if (!cars.length) {
      return <h3> No Cars</h3>;
    }
  const deleteCar = async (_id: string, customerId: string) => {
    try {
      const { data } = await removeCar({
        variables: {
          _id: _id,
          customerId: customerId
        },
      });
      console.log(`deleted: ${data}`);
    } catch (e) {
      console.error(e);
    }
  };
  if (customerId) {
    return (
      <div className="carLists">
        {cars &&
          cars.map((car) => (
            <div key={car._id} className="carCard cardBody">
              <h1>
                {car.carYear} {car.carMake} {car.carModel}
              </h1>
              <div className="deleteButton">
                <button
                  id="deleteButton"
                  onClick={() => deleteCar(car._id, customerId)}
                >
                  remove
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  } else {
    return (
      <div className="carBox">
        <h3 className="carTitle">{title}</h3>
        {cars &&
          cars.map((car) => (
            <div key={car._id} className="carCard cardBody">
              <h1>
                {car.carYear} {car.carMake} {car.carModel}
              </h1>
            </div>
          ))}
      </div>
    );
  }
};
export default CarList;
