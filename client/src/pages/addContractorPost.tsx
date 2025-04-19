import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_CONTRACTOR_POST } from "../utils/mutations";

import Auth from "../utils/auth";

const addContractorPostForm = () => {
  const [ContractorPostForm, setContractorPost] = useState({
    description: "",
    contractorNumber: "(000) 000-0000",
    contractorName: "",
  });

  const [addContractorPost, { error, data }] = useMutation(ADD_CONTRACTOR_POST);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setContractorPost({
      ...ContractorPostForm,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await addContractorPost({
        variables: { input: { ...ContractorPostForm } },
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
                  placeholder="what's your business's name"
                  type="contractorName"
                  name="contractorName"
                  value={ContractorPostForm.contractorName}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="what is your business phone number?"
                  type="contractorNumber"
                  name="contractorNumber"
                  value={ContractorPostForm.contractorNumber}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="tell me about your business"
                  type="description"
                  name="description"
                  value={ContractorPostForm.description}
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

export default addContractorPostForm;
