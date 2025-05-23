import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ContractorPostList from "../components/ContractorPosts/index.js";
import CustomerPostList from "../components/CustomerPosts/index.js";
import EmployeeList from "../components/Employees/index.js";
import CarList from "../components/Cars/index.js";
import {
  GET_ME
} from "../utils/queries.js";

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(GET_ME);
  const user = data?.me || {};
  if (
    userParam &&
    Auth.loggedIn() &&
    Auth.getProfile().data.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
  if (user.isContractor) {
    return (
      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="profilePicBox">
              <div>
                <h1>Profile Pic</h1>
                <img className="profilePic" src={user.contractor.profileImg} />
              </div>
              <div className="employeeBox">
                <EmployeeList
                  employees={user.contractor.employees || []}
                  contractorId={user.contractor._id || {}}
                />
              </div>
            </div>
            <div className="Lists">
              <h1>My Posts</h1>
              <div>
                <ContractorPostList
                  contractorPosts={user.contractor.contractorPost || []}
                  contractorId={user.contractor._id || {}}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="profilePicBox">
              <div>
                <h1>Profile Pic</h1>
                <img className="profilePic" src={user.customer.profileImg} />
              </div>
              <div className="carBox">
                <h3>My Cars's</h3>
                <CarList
                  cars={user.customer.car || []}
                  title="Cars"
                  customerId={user.customer._id || {}}
                />
              </div>
            </div>
            <div className="Lists">
              <h1>My Posts</h1>
              <div>
                <CustomerPostList
                  customerPosts={user.customer.customerPost || []}
                  title="My"
                  customerId={user.customer._id || {}}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
    
  }
};

export default Profile;
