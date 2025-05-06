import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { GET_ME } from "../utils/queries.js";
import { useQuery } from "@apollo/client";
import { UPDATE_CONTRACTOR_PROFILE } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const editContractorProfile = () => {
    const { loading, data } = useQuery(GET_ME);
    const [updateContractorProfile, { data: ContractorProfileData }] = useMutation(UPDATE_CONTRACTOR_PROFILE);
    const user = data?.me.contractor;
    const [editedProfile, editProfile] = useState({
        businessName: "",
        ownerName: "",
        userNumber: "",
        profileImg: "",
      
    });
     useEffect(() => {
       if (!loading)
         editProfile({
           businessName: user.businessName || "",
           ownerName: user.ownerName || "",
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
     };
      const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
          await updateContractorProfile({
            variables: {
              input: {
                contractorId: user._id,
                ...editedProfile,
              },
            },
          });
        } catch (e) {
          console.error(e);
        }
      };
    return (
      <>
        <h1>edit Profile</h1>
        {ContractorProfileData ? (
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
                placeholder="what is your business phone number?"
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
                placeholder="what is your business phone number?"
                type="businessName"
                name="businessName"
                value={editedProfile.businessName}
                onChange={handleChange}
              />
            </div>
            <div>
              <h2> Last Name</h2>
              <input
                className="form-input"
                placeholder="what is the owner's name?"
                type="ownerName"
                name="ownerName"
                value={editedProfile.ownerName}
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
}
export default editContractorProfile;