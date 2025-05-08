import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CONTRACTOR_PROFILE } from "../utils/queries";
import ContractorPostList from "../components/ContractorPosts/index.js";
import EmployeeList from "../components/Employees/index.js";
const ContractorProfile = () => {
  const { username } = useParams();
  const { loading, data } = useQuery(GET_CONTRACTOR_PROFILE, {
    variables: { username: username },
  });
  const user = data?.contractorProfile || {};
  console.log(user);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="profilePicBox">
                          <div id="profilePicBox">
                              <div>
                              <h1>{user.username}</h1>
                              {user.ownerName}</div>
              <img className="profilePic" src={user.profileImg} />
              <div className="customerContact">
                <h1>Contact: </h1>
                <p id="contact">{user.userNumber}</p>
              </div>
            </div>
            <div className="employeeContainer">
              <h1> Employee's</h1>
              <EmployeeList employees={user.employees || []} />
            </div>
          </div>
          <h1>
            {user.firstName} {user.lastName}
          </h1>

          <ContractorPostList
            contractorPosts={user.contractorPost || []}
            title="My"
          />
        </>
      )}
    </>
  );
};
export default ContractorProfile;
