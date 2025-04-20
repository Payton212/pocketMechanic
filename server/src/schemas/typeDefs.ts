const typeDefs = `
type User {
_id: ID
username: String
email: String
password: String
isContractor: Boolean
customer: Customer
contractor: Contractor
}
    input addUser {
        email: String!
        password: String!
        username: String!
        isContractor: Boolean
    }

type Contractor {
_id: ID
firstName: String
lastName: String
employees: [Employee]
username: String
email: String
contractorPost: [ContractorPost]
contractorPostCount: Int
}
    input addContractor {
        username: String
        email: String
        firstName: String
        lastName: String
    }

type Customer {
_id: ID
username: String
email: String
firstName: String
lastName: String
customerPost: [CustomerPost]
car: [Car]
customerPostCount: Int
}
    input addCustomer {
        username: String
        email: String
        firstName: String
        lastName: String
    }

type CustomerPost {
_id: ID
image: String
description: String
budget: String
firstName: String
lastName: String
}
    input addCustomerPost {
        customerId: String
        image: String
        description: String
        budget: String
        firstName: String
        lastName: String
    }

type ContractorPost {
_id: ID
description: String
contractorNumber: String
contractorName: String
}
    input addContractorPost {
        contractorId: String
        description: String
        contractorNumber: String
        contractorName: String
    }
 
type Employee {
_id: ID
image: String
firstName: String
lastName: String
description: String
}
    input addEmployee {
        contractorId: String
        image: String
        firstName: String
        lastName: String
        description: String
    }
    
type Car {
  _id: ID
  carYear: String
  carMake: String
  carModel: String
}
    input addCar {
        customerId: String
        carYear: String
        carMake: String
        carModel: String
    }

type Auth {
token: ID
user: User
}

type Query {
me: User!
userCustomer(id: ID!): User
userContractor(id: ID!): User
contractorPosts: [ContractorPost]!
customerPosts: [CustomerPost]!
contractorPost(contractorPostId: ID!): ContractorPost!
customerPost(customerPostId: ID!): CustomerPost!
}

type Mutation {
login(email: String!, password: String!): Auth
addUser(input: addUser!): Auth
addContractor(input: addContractor!): Contractor
addCustomer(input: addCustomer!): Customer
addContractorPost(input: addContractorPost!): User
deleteContractorPost(contractorPostId: ID!): ContractorPost
addCustomerPost(input: addCustomerPost!): User
deleteCustomerPost(customerPostId: ID!): CustomerPost
addEmployee(input: addEmployee!): User
deleteEmployee(employeeId: ID!): Employee
addCar(input: addCar!): User
deleteCar(carId: ID!): Car
}
`;


export default typeDefs