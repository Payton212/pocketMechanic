import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
      isContractor
      customer {
        customerId
        username
        email
        firstName
        lastName
        customerPost {
          customerPostId
          image
          description
          budget
          firstName
          lastName
        }
        car {
          carId
          carYear
          carMake
          carModel
        }
        customerPostCount
      }
      contractor {
        contractorId
        email
        username
        employees {
          employeeId
          image
          description
        }
        contractorPost {
          contractorPostId
          description
          contractorNumber
          contractorName
        }
        description
        contractorPostCount
      }
    }
  }
`;

export const GET_CONTRACTOR_POSTS = gql`
query getContractractorPosts {
  contractorPosts {
    _id
    description
    image
    contractorName
  }
}
`;
export const GET_CUSTOMER_POSTS = gql`
query getCustomerPosts {
  customerPosts {
    _id
    image
    description
    budget
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
