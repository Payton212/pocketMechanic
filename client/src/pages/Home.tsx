import { useQuery } from '@apollo/client';

import ContractorPostList from '../components/ContractorPosts/index.js';
import CustomerPostList from '../components/CustomerPosts/index.js';

import { GET_CONTRACTOR_POSTS, GET_CUSTOMER_POSTS, GET_ME } from "../utils/queries";

import Auth from "../utils/auth";
import { useParams } from "react-router-dom";

const Home = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(GET_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || {};

  const { loading: loadingContractor, data: dataContractor } = useQuery(GET_CONTRACTOR_POSTS) ;
  const  { loading: loadingCustomer, data: dataCustomer } = useQuery(GET_CUSTOMER_POSTS);
  const ContractorPosts = dataContractor?.contractorPosts || [];
  const CustomerPosts = dataCustomer?.customerPosts || [];

  const checkUser = () => {
    console.log(user);
  }
  if (Auth.loggedIn() && Auth.getProfile().data.username) {
    if (loading) {
      return <div>Loading...</div>;
    } else {
      if (user.isContractor === true) {
        return (
          <>
            <button className="button" onClick={checkUser}>
              check user
            </button>
            <CustomerPostList
              customerPosts={CustomerPosts}
              title="Customer" />
          </>
        );
        
      } else if (user.isContractor === false) {
        return (
          <>
            <button className="button"
              onClick={checkUser}>check user</button>
            <ContractorPostList
              contractorPosts={ContractorPosts}
              title="Contractor"
            />
          </>);
      }
    }
  } else {
  
    return (
      <>
        {loadingContractor || loadingCustomer ? (
          <div>Loading...</div>
        ) : (<div>
          <button className="button"
            onClick={checkUser}>check user</button>
          <ContractorPostList
            contractorPosts={ContractorPosts}
            title="Contractor"
          />
          <CustomerPostList
            customerPosts={CustomerPosts}
            title="Customer"
          />
        </div>
        )}
      </>
    );
  }
};

export default Home;
