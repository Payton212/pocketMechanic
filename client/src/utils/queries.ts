import { gql } from '@apollo/client';

export const GET_ME = gql`
 query me {
  me {
    _id
    username
    email
    isContractor
    customer {
      _id
      username
      email
      firstName
      lastName
      customerPost {
        _id
        image
        description
        budget
        firstName
        lastName
      }
      car {
        _id
        carYear
        carMake
        carModel
      }
      customerPostCount
    }
    contractor {
      _id
      firstName
      lastName
      email
      username
      employees {
        _id
        image
        firstName
        lastName
        description
      }
      contractorPost {
        _id
        description
        contractorNumber
        contractorName
      }
      contractorPostCount
    }
  }
}`;

export const GET_CUSTOMER_ID = gql`
  query GetUserCustomerId($userId: ID!) {
    userCustomer(id: $userId) {
      customer {
        _id
        username
        email
        firstName
        lastName
      }
    }
  }
`;

export const GET_CONTRACTOR_ID = gql`
  query GetContractorId($userId: ID!) {
    userContractor(id: $userId) {
      contractor {
        _id
        firstName
        lastName
        username
        email
      }
    }
  }
`

export const GET_CONTRACTOR_POSTS = gql`
query getContractractorPosts {
  contractorPosts {
    _id
    description
    contractorNumber
    contractorName
  }
}
`;
export const GET_CUSTOMER_POSTS = gql`
query getCustomerPosts {
  customerPosts {
    _id
    description
    budget
    firstName
    lastName
  }
}
`;
export const GET_SINGLE_CONTRACTOR_POSTS = gql`
query getSingleContractorPost($contractorPostId: ID!) {
  contractorPost(contractorPostId: $contractorPostId) {
    _id
    description
    image
    contractorName
  }
}
`;
export const GET_SINGLE_CUSTOMER_POSTS = gql`
  query getSingleCustomerPost($customerPostId: ID!) {
    customerPost(customerPostId: $customerPostId) {
      _id
      description
      image
      budget
    }
  }
`;
