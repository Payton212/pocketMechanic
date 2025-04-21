import { useQuery } from '@apollo/client';

import ContractorPostList from '../components/ContractorPosts/index.js';
import CustomerPostList from '../components/CustomerPosts/index.js';

import { GET_CONTRACTOR_POSTS, GET_CUSTOMER_POSTS, GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Home = () => {
  const { loading, data } = useQuery(GET_ME);
  const user = data?.me || {};

  const  {  data: dataContractor } = useQuery(GET_CONTRACTOR_POSTS) ;
  const  { data: dataCustomer } = useQuery(GET_CUSTOMER_POSTS);
  const ContractorPosts = dataContractor?.contractorPosts || [];
  const CustomerPosts = dataCustomer?.customerPosts || [];

  if (Auth.loggedIn() && Auth.getProfile().data.username) {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (user && typeof user.isContractor === "boolean") {
      return (
        <>
          <h1>Home</h1>
          {user.isContractor ? (
            <CustomerPostList
              customerPosts={CustomerPosts}
              title="Customer"
            />
          ) : (
            <ContractorPostList
              contractorPosts={ContractorPosts}
                title="Contractor"
            />
          )}
        </>
      );
    } else {
      return <div>Unable to load user role.</div>;
    }
  }
};

export default Home;
