import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER, ADD_CONTRACTOR, ADD_CUSTOMER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    isContractor: Boolean,
    firstName: "",
    lastName:"",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const [addContractor] = useMutation(ADD_CONTRACTOR);
  const [addCustomer] = useMutation(ADD_CUSTOMER);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;

    // If the input type is checkbox, update the isContractor state
    if (type === "checkbox") {
      setIsChecked(checked);
      setFormState({
        ...formState,
        [name]: checked, 
      });
    } else {
      
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: {
          input: {
            email: formState.email,
            username: formState.username,
            password: formState.password,
            isContractor: formState.isContractor,
          },
        },
      });
      Auth.login(data.addUser.token);
      if (data.addUser.user.isContractor === true) {
        try {
          const { data: ContractorData } = await addContractor({
          variables: {
            input: {
              email: formState.email,
              username: formState.username,
              firstName: formState.firstName,
              lastName: formState.lastName,
            },
          },
        });
        console.log(ContractorData);
        } catch (e) {
          console.error(e);
        }
      }
      else {
        try {
        const { data: CustomerData } = await addCustomer({
          variables: {
            input: {
              email: formState.email,
              username: formState.username,
              firstName: formState.firstName,
              lastName: formState.lastName,
            },
          },
        });
          console.log(CustomerData)
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <label htmlFor="isContractor">Contractor?</label>
                <input
                  className="form-input"
                  type="checkbox"
                  id="checkIsContractor"
                  name="isContractor"
                  checked={isChecked}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="first name"
                  name="firstName"
                  type="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="last name"
                  name="lastName"
                  type="lastName"
                  value={formState.lastName}
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

export default Signup;