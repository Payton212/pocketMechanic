import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_CUSTOMER_POST } from "../utils/mutations";

import Auth from "../utils/auth";

const addCustomerPostForm = () => {
    const [CustomerPostForm, setCustomerPost] = useState({
        description: '',
        budget: '',
        firstName: '',
        lastName: '',
    });

    const [addCustomerPost, { error, data }] = useMutation(ADD_CUSTOMER_POST);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCustomerPost({
            ...CustomerPostForm,
            [name]: value,
        })
    };

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
         const token = Auth.loggedIn() ? Auth.getToken() : null;

         if (!token) {
           return false;
         }
        try {
             await addCustomerPost({
                variables: { input: { ...CustomerPostForm } },
                
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
      <main>
        <div>
          <div>
            <h4> add a post</h4>
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
                    placeholder="first name"
                    type="firstName"
                    name="firstName"
                    value={CustomerPostForm.firstName}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="last name"
                    type="lastName"
                    name="lastName"
                    value={CustomerPostForm.lastName}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="what is your budget?"
                    type="budget"
                    name="budget"
                    value={CustomerPostForm.budget}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="what is going on with your car?"
                    type="description"
                    name="description"
                    value={CustomerPostForm.description}
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

export default addCustomerPostForm