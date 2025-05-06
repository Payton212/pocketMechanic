import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { GET_ME } from "../utils/queries.js";
import { useQuery } from "@apollo/client";
import { UPDATE_CUSTOMER_PROFILE } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const editCustomerProfile = () => {
  const { loading, data } = useQuery(GET_ME);
 const [updateCustomerProfile, { data: CustomerProfileData }] = useMutation(UPDATE_CUSTOMER_PROFILE);
  const user = data?.me.customer ;
    const [editedProfile, editProfile] = useState({
      firstName: "",
      lastName: "",
      userNumber: "",
      profileImg: "",
      
    });
    useEffect(() => {
        if (!loading)
            editProfile({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                userNumber: user.userNumber || "",
                profileImg: user.profileImg || "",
            });
    }, [data]);
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
       editProfile({
         ...editedProfile,
         profileImg: uploadedImage.url,
       });
     };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        editProfile({
          ...editedProfile,
          [name]: value,
        });
        console.log(editedProfile);
    }
    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await updateCustomerProfile({
                variables: {
                    input: {
                        customerId: user._id,
                        ...editedProfile
                    }
                }
            })
        } catch (e) {
            console.error(e);
        }
    }
  return (
    <>
      <h1>edit Profile</h1>
      {CustomerProfileData ? (
        <p>
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div>
            <div>
              <h2>Profile Image</h2>
              <input
                className="form-input"
                type="file"
                onChange={handleFileUpload}
              />
            </div>
            <h2> Phone Number</h2>
            <input
              className="form-input"
              placeholder="what is your phone number?"
              type="userNumber"
              name="userNumber"
              value={editedProfile.userNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <h2> First Name</h2>
            <input
              className="form-input"
              placeholder="what is your first name?"
              type="firstName"
              name="firstName"
              value={editedProfile.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <h2> Last Name</h2>
            <input
              className="form-input"
              placeholder="what is your last name?"
              type="lastName"
              name="lastName"
              value={editedProfile.lastName}
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};
export default editCustomerProfile;
