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
      contractorName
      description
    }
  }
`;

export const ADD_CUSTOMER = gql`
mutation addCustomer($input: addCustomer!) {
addCustomer(input: $input) {
  firstName
  lastName
  }
}
`
export const ADD_CONTRACTOR_POST = gql`
mutation addContractorPost($input: addContractorPost!) {
addContractorPost(input: $input) {
  description
  image
  contractorName
  }
}
`
export const ADD_CUSTOMER_POST = gql`
mutation addCustomerPost($input: addCustomerPost!) {
addCustomerPost(input: $input) {
  description
  image
  budget
  }
}
`
export const ADD_EMPLOYEE = gql`
mutation addEmployee($input: addEmployee!) {
addEmployee(input: $input) {
  image
  firstName
  lastName
  description
  }
}
`
export const ADD_CAR = gql`
mutation addCar($input: addCar!) {
addCar(input: $input) {
  carYear
  carMake
  carModel
  }
}
`
export const DELETE_CONTRACTOR_POST = gql`
mutation deleteContractorPost($contractorPostId: ID!) {
  deleteContractorPost(contractorPostId: $contractorPostId){
  _id
  username
  email
  contractor{
    contractorId
    employees
    contractorName
    contractorPost {
      contractorPostId
      image
      description
      contractorName
      }
    description
    contractorPostCount
    }
  }
}
`
export const DELETE_CUSTOMER_POST = gql`
mutation deleteCustomerPost($customerPostId: ID!) {
  deleteCustomerPost(customerPostId: $customerPostId) {
  _id
  username
  email
  customer{
    customerId
    firstName
    lastName
    customerPost {
      customerPostId
      image
      description
      budget
      }
    car
    customerPostCount
    }
  }
}
`
export const DELETE_EMPLOYEE = gql`
  mutation deleteCar($carId: ID!) {
    deleteCar(carId: $carId) {
      _id
      username
      email
      contractor {
        contractorId
        employees {
          employeeId
          image
          firstName
          lastName
          description
          }
        contractorName
        contractorPost 
        description
        contractorPostCount
      }
    }
  }
`;
export const DELETE_CAR = gql`
  mutation deleteCar($carId: ID!) {
    deleteCar(carId: $carId) {
      _id
      username
      email
      customer {
        customerId
        firstName
        lastName
        customerPost
        car {
          carId
          carYear
          carMake
          carModel
          }
        customerPostCount
      }
    }
  }
`;