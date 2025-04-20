import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_CAR } from "../utils/mutations";
import { GET_CUSTOMER_ID } from "../utils/queries";

import Auth from "../utils/auth";

const addCarForm = () => {
    const { userId } = useParams();
    const [addCarState, setAddCar] = useState({
        carYear: '',
        carMake: '',
        carModel: '',
    });

    const [addCar, { error }] = useMutation(ADD_CAR);
const { loading: customerLoading, data: customerData } = useQuery(
  GET_CUSTOMER_ID,
  {
    variables: { userId },
  }
);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        setAddCar({
            ...addCarState,
            [name]: value,
        });
    }
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(customerData);
    if (customerData && customerData.user && customerData.user.customer && !customerLoading) {
      const customerId = customerData.user.customer._id;
      console.log(customerId);
      if (!token) {
        return false;
      }
      try {
        await addCar({
          variables: { input: { ...addCarState, customerId } },
        });
            
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Car data is not available");
    }
  };
    return (
      <main>
        <div>
          <div>
            <h4> add Car</h4>
            <div>
              
                <form onSubmit={handleFormSubmit}>
                  <input
                    className="form-input"
                    placeholder="what year is your car"
                    type="text"
                    name="carYear"
                    value={addCarState.carYear}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="what make is your car"
                    type="text"
                    name="carMake"
                    value={addCarState.carMake}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="what model is your car"
                    type="text"
                    name="carModel"
                    value={addCarState.carModel}
                    onChange={handleChange}
                  />
                  <button
                    className="btn btn-block btn-primary"
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    );
};

export default addCarForm

