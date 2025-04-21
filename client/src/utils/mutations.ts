import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation ($input: addUser!) {
  addUser(input: $input) {
    user {
      username
      isContractor
      _id
    }
    token
  }
}
`;

export const ADD_CONTRACTOR = gql`
  mutation addContracor($input: addContractor!) {
    addContractor(input: $input) {
      username
      email
    }
  }
`;

export const ADD_CUSTOMER = gql`
mutation addCustomer($input: addCustomer!) {
addCustomer(input: $input) {
  username
  email
  }
}
`
export const ADD_CONTRACTOR_POST = gql`
mutation addContractorPost($input: addContractorPost!) {
  addContractorPost(input: $input) {
  _id
  username
  email
    contractor{
      contractorPost {
        description
        contractorNumber
        contractorName
      }
        firstName
        lastName
        username
        email
        contractorPostCount
    }
  }
}
`
export const ADD_CUSTOMER_POST = gql`
  mutation addCustomerPost($input: addCustomerPost!) {
    addCustomerPost(input: $input) {
      _id
      username
      email
      customer {
        customerPost {
          description
          image
          firstName
          lastName
          budget
          customerNumber
        }
        username
        email
        firstName
        lastName
        customerPostCount
      }
    }
  }
`;
export const ADD_EMPLOYEE = gql`
mutation addEmployee($input: addEmployee!) {
  addEmployee(input: $input) {
    _id
    username
    email
    contractor {
      employees {
        image
        firstName
        lastName
        description
      }
    }
  }
}
`
export const ADD_CAR = gql`
  mutation addCar($input: addCar!) {
    addCar(input: $input) {
      _id
      username
      email
      customer {
        car {
          _id
          carYear
          carMake
          carModel
        
      }
    }
  }
}
`;
export const DELETE_CONTRACTOR_POST = gql`
  mutation deleteContractorPost($_id: ID!, $contractorId: ID!) {
    deleteContractorPost(_id: $_id, contractorId: $contractorId) {
      _id
      contractorPost {
        _id
        description
        contractorNumber
        contractorName
      }
    }
  }
`;
export const DELETE_CUSTOMER_POST = gql`
  mutation deleteCustomerPost($_id: ID!, $customerId: ID!) {
    deleteCustomerPost(_id: $_id, customerId: $customerId) {
      _id
      customerPost {
        _id
        image
        description
        budget
        firstName
        lastName
        customerNumber
      }
    }
  }
`;
export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($_id: ID!, $contractorId: ID!) {
    deleteEmployee(_id: $_id, contractorId: $contractorId) {
      _id
      employees {
        _id
        image
        firstName
        lastName
        description
      }
    }
  }
`;
export const DELETE_CAR = gql`
  mutation deleteCar($_id: ID!, $customerId: ID!) {
    deleteCar(_id: $_id, customerId: $customerId) {
      _id
      car {
        _id
        carYear
        carMake
        carModel
      }
    }
  }
`;