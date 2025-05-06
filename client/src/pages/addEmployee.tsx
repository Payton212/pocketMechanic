import { useParams } from "react-router-dom";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_EMPLOYEE } from "../utils/mutations";
import { GET_CONTRACTOR_ID } from "../utils/queries";

import Auth from "../utils/auth";

const addEmployeeForm = () => {
    const { userId } = useParams();
  const [addEmployeeState, setEmployee] = useState({
    profileImg:"",
    firstName: "",
    lastName: "",
    description: "",
  });

  const { loading: contractorLoading, data: contractorData } = useQuery(
    GET_CONTRACTOR_ID,
    {
      variables: { userId },
    }
  );

  const [addEmployee, { error, data }] = useMutation(ADD_EMPLOYEE);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setEmployee({
      ...addEmployeeState,
      [name]: value,
    });
  };
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pocket-Mechanic");
    data.append("cloud_name", "dvxgfmiiu");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvxgfmiiu/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImage = await res.json();
    setEmployee({
      ...addEmployeeState,
      profileImg: uploadedImage.url,
    });
  };
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log(contractorData)
    if (contractorData && contractorData.userContractor && contractorData.userContractor.contractor && !contractorLoading) {
      const contractorId = contractorData.userContractor.contractor._id;
      if (!token) {
        return false;
      }
      try {
        await addEmployee({
          variables: { input: { ...addEmployeeState, contractorId } },
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Contractor data is not available");
    }
  };

  return (
    <main>
      <div>
        <div>
          <h4> add Employee </h4>
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
                  type="file"
                  onChange={handleFileUpload}
                />
                <input
                  className="form-input"
                  placeholder="what make is your employee's first name"
                  type="firstName"
                  name="firstName"
                  value={addEmployeeState.firstName}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="what make is your employee's last name"
                  type="lastName"
                  name="lastName"
                  value={addEmployeeState.lastName}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="give a description of your employee"
                  type="description"
                  name="description"
                  value={addEmployeeState.description}
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
export default addEmployeeForm;
