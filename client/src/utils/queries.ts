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
        userNumber
        profileImg
        customerPost {
          _id
          username
          img
          description
          budget
          firstName
          lastName
          userNumber
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
        ownerName
        businessName
        userNumber
        email
        username
        profileImg
        employees {
          _id
          profileImg
          firstName
          lastName
          description
        }
        contractorPost {
          _id
          username
          description
          userNumber
          businessName
          img
        }
        contractorPostCount
      }
    }
  }
`;
export const GET_CUSTOMER_PROFILE = gql`
  query customerProfile($username: String!) {
    customerProfile(username: $username) {
      username
      email
      firstName
      lastName
      userNumber
      profileImg
      customerPost {
        username
        img
        description
        budget
        firstName
        lastName
        userNumber
      }
      car {
        carYear
        carMake
        carModel
      }
    }
  }
`;
export const GET_CONTRACTOR_PROFILE = gql`
  query contractorProfile($username: String!) {
    contractorProfile(username: $username) {
      ownerName
      businessName
      userNumber
      email
      username
      profileImg
      employees {
        profileImg
        firstName
        lastName
        description
      }
      contractorPost {
        username
        description
        userNumber
        businessName
        img
      }
    }
  }
`;
export const GET_CUSTOMER_ID = gql`
  query GetUserCustomerId($userId: ID!) {
    userCustomer(id: $userId) {
      customer {
        _id
        username
        email
        firstName
        lastName
        userNumber
        profileImg
      }
    }
  }
`;

export const GET_CONTRACTOR_ID = gql`
  query GetContractorId($userId: ID!) {
    userContractor(id: $userId) {
      contractor {
        _id
        ownerName
        businessName
        userNumber
        username
        email
        profileImg
      }
    }
  }
`;

export const GET_CONTRACTOR_POSTS = gql`
  query getContractractorPosts {
    contractorPosts {
      _id
      username
      description
      userNumber
      businessName
      img
    }
  }
`;
export const GET_CUSTOMER_POSTS = gql`
  query getCustomerPosts {
    customerPosts {
      _id
      username
      description
      budget
      firstName
      lastName
      userNumber
      img
    }
  }
`;
export const GET_SINGLE_CONTRACTOR_POSTS = gql`
  query getSingleContractorPost($contractorPostId: ID!) {
    contractorPost(contractorPostId: $contractorPostId) {
      _id
      username
      description
      img
      businessName
      userNumber
    }
  }
`;
export const GET_SINGLE_CUSTOMER_POSTS = gql`
  query getSingleCustomerPost($customerPostId: ID!) {
    customerPost(customerPostId: $customerPostId) {
      _id
      username
      description
      img
      budget
      userNumber
      firstName
      lastName
    }
  }
`;
