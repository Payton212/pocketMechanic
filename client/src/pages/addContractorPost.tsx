import { useParams } from "react-router-dom";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_CONTRACTOR_POST } from "../utils/mutations";
import { GET_CONTRACTOR_ID } from "../utils/queries";

import Auth from "../utils/auth";

const addContractorPostForm = () => {
  const { userId } = useParams();
  const { loading: contractorLoading, data: contractorData } = useQuery(
    GET_CONTRACTOR_ID,
    {
      variables: { userId },
    }
  );
  const [ContractorPostForm, setContractorPost] = useState({
      username: "",
      description: "",
      userNumber: "",
      businessName: "",
      img:"",
    });
  const [addContractorPost, { error, data }] = useMutation(ADD_CONTRACTOR_POST);
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
    setContractorPost({
      ...ContractorPostForm,
      img: uploadedImage.url,
    });
  };
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setContractorPost({
        ...ContractorPostForm,
        [name]: value,
        businessName: contractorData.userContractor.contractor.businessName,
        userNumber: contractorData.userContractor.contractor.userNumber,
        username: contractorData.userContractor.contractor.username,
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
          await addContractorPost({
            variables: { input: { ...ContractorPostForm, contractorId } },
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
                      type="file"
                        onChange={handleFileUpload}
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
