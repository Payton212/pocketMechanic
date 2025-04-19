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
contractorName: String
contractorPost: [ContractorPost]
description: String
contractorPostCount: Int
}
    input addContractor {
        contractorName: String
        description: String
    }

type Customer {
firstName: String
lastName: String
customerId: ID
customerPost: [CustomerPost]
car: [Car]
customerPostCount: Int
}
    input addCustomer {
        firstName: String
        lastName: String
    }

type CustomerPost {
customerPostId: ID
image: String
description: String
budget: Int
firstName: String
lastName: String
}
    input addCustomerPost {
        image: String
        description: String
        budget: Int
        firstName: String
        lastName: String
    }

type ContractorPost {
contractorPostId: ID
description: String
image: String
contractorName: String
}
    input addContractorPost {
        description: String
        image: String
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
addContractorPost(input: addContractorPost!): ContractorPost
deleteContractorPost(contractorPostId: ID!): ContractorPost
addCustomerPost(input: addCustomerPost!): CustomerPost
deleteCustomerPost(customerPostId: ID!): CustomerPost
addEmployee(input: addEmployee!): Employee
deleteEmployee(employeeId: ID!): Employee
addCar(input: addCar!): Car
deleteCar(carId: ID!): Car
}
`;


export default typeDefs