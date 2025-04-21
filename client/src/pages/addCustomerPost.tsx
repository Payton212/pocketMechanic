import { useParams } from "react-router-dom";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_CUSTOMER_POST } from "../utils/mutations";
import { GET_CUSTOMER_ID } from "../utils/queries";

import Auth from "../utils/auth";

const addCustomerPostForm = () => {
  const { userId } = useParams();
  const [CustomerPostForm, setCustomerPost] = useState({
    description: "",
    budget: "",
    firstName: "",
    lastName: "",
    customerNumber:"",
  });
  const { loading: customerLoading, data: customerData } = useQuery(GET_CUSTOMER_ID, {
    variables: { userId },
  });
 

  const [addCustomerPost, { error, data }] = useMutation(ADD_CUSTOMER_POST);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomerPost({
      ...CustomerPostForm,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(customerData)
    if (customerData && customerData.userCustomer && customerData.userCustomer.customer && !customerLoading) {
      const customerId = customerData.userCustomer.customer._id;
      
      if (!token) {
        return false;
      }
      try {
        await addCustomerPost({
          variables: {
            input: { ...CustomerPostForm, customerId }
          },
        });
      } catch (err) {
        console.error(err);
      }
    } else {
    console.error("Customer data is not available");
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
                <input
                  className="form-input"
                  placeholder="what is your phone Number"
                  type="customerNumber"
                  name="customerNumber"
                  value={CustomerPostForm.customerNumber}
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

export default addCustomerPostForm;
