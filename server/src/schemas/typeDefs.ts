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
contractorId: ID
employees: [Employee]
username: String
email: String
contractorPost: [ContractorPost]
description: String
contractorPostCount: Int
}
    input addContractor {
        username: String
        email: String
    }

type Customer {
customerId: ID
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
    }

type CustomerPost {
customerPostId: ID
image: String
description: String
budget: String
firstName: String
lastName: String
}
    input addCustomerPost {
        image: String
        description: String
        budget: String
        firstName: String
        lastName: String
    }

type ContractorPost {
contractorPostId: ID
description: String
contractorNumber: String
contractorName: String
}
    input addContractorPost {
        description: String
        contractorNumber: String
        contractorName: String
    }
 
type Employee {
employeeId: ID
image: String
firstName: String
lastName: String
description: String
}
    input addEmployee {
        image: String
        firstName: String
        lastName: String
        description: String
    }
    
type Car {
  carId: ID
  carYear: Int
  carMake: String
  carModel: String
}
    input addCar {
        carYear: Int
        carMake: String
        carModel: String
    }

type Auth {
token: ID
user: User
}

type Query {
me: User
contractorPosts: [ContractorPost]!
customerPosts: [CustomerPost]!
contractorPost(contractorPostId: ID!): ContractorPost
customerPost(customerPostId: ID!): CustomerPost
}

type Mutation {
login(email: String!, password: String!): Auth
addUser(input: addUser!): Auth
deleteUser(_id: ID!): User
addContractor(input: addContractor!): Contractor
addCustomer(input: addCustomer!): Customer
addContractorPost(input: addContractorPost!): User
deleteContractorPost(contractorPostId: ID!): ContractorPost
addCustomerPost(input: addCustomerPost!): User
deleteCustomerPost(customerPostId: ID!): CustomerPost
addEmployee(input: addEmployee!): Employee
deleteEmployee(employeeId: ID!): Employee
addCar(input: addCar!): Car
deleteCar(carId: ID!): Car
}
`;


export default typeDefs