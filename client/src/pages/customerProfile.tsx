import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMER_PROFILE } from "../utils/queries";
import CustomerPostList from "../components/CustomerPosts/index.js";
import CarList from "../components/Cars/index.js";
const CustomerProfile = () => {
    const { username } = useParams();
    const { loading, data } = useQuery(GET_CUSTOMER_PROFILE, {
      variables: { username: username },
    });
    const user = data?.customerProfile || {};
    console.log(user)
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="profilePicBox">
            <div id="profilePicBox">
              <div>
                <h1 id="customerName">
                  {user.firstName} {user.lastName}
                </h1>
                <h1 id="customerUsername">{user.username}</h1>
                {user.ownerName}
              </div>
              <img className="profilePic" src={user.profileImg} />
              <div className="customerContact">
                <h1 id="customerContactHead">Contact: </h1>
                <p id="contact">{user.userNumber}</p>
              </div>
            </div>
            <div>
              <CarList cars={user.car || []} title="Cars" />
            </div>
          </div>
          <CustomerPostList
            customerPosts={user.customerPost || []}
            title="My"
          />
        </>
      )}
    </>
  );
};
export default CustomerProfile;
