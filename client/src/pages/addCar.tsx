import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_CAR } from "../utils/mutations";

import Auth from "../utils/auth";

const addCarForm = () => {
    const [addCarState, setAddCar] = useState({
        carYear: 0,
        carMake: '',
        carModel: '',
    });

    const [addCar, { error, data }] = useMutation(ADD_CAR);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        setAddCar({
            ...addCarState,
            [name]: value,
        });
    }
    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault;
         const token = Auth.loggedIn() ? Auth.getToken() : null;

         if (!token) {
           return false;
         }
        try {
            const { data } = await addCar({
                variables: { input: { ...addCarState } },
            });
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
      <main>
        <div>
          <div>
            <h4> add Car</h4>
            <div>
              {data ? (
                <p>
                  Success! You may now head{" "}
                  <Link to="/">back to the homepage.</Link>
                </p>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <input
                    className="form-input"
                    placeholder="what year is your car"
                    type="year"
                    name="year"
                    value={addCarState.carYear}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="what make is your car"
                    type="make"
                    name="make"
                    value={addCarState.carMake}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="what model is your car"
                    type="model"
                    name="model"
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
              )}
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

