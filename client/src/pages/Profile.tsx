import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ContractorPostList from "../components/ContractorPosts/index.js";
import CustomerPostList from "../components/CustomerPosts/index.js";

import { GET_ME } from '../utils/queries.js';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery( GET_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>
  }
  if (!user?.username) {
    return (
      <h4>You need to be logged in to see this. Use the navigation links above to
        sign up or log in!</h4>
    )
  }
  if (user.isContractor) {
    return (
    <ContractorPostList contractorPosts={user.Contractor.ContractorPosts} title="Contractor" />
  );
  } else {
    <CustomerPostList customerPosts={user.Customer.CustomerPosts} title="Customer"/>
  }
  
};

export default Profile;
