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
ownerName: String
businessName: String
userNumber: String
employees: [Employee]
username: String
email: String
contractorPost: [ContractorPost]
contractorPostCount: Int
}
    input addContractor {
        username: String
        email: String
        ownerName: String
        businessName: String
        userNumber: String
    }

type Customer {
_id: ID
username: String
email: String
firstName: String
lastName: String
userNumber: String
customerPost: [CustomerPost]
car: [Car]
customerPostCount: Int
}
    input addCustomer {
        username: String
        email: String
        firstName: String
        lastName: String
        userNumber: String
    }

type CustomerPost {
_id: ID
img: String
description: String
budget: String
firstName: String
lastName: String
userNumber: String
}
    input addCustomerPost {
        customerId: String
        img: String
        description: String
        budget: String
        firstName: String
        lastName: String
        userNumber: String
    }

type ContractorPost {
_id: ID
description: String
userNumber: String
businessName: String
img: String
}
    input addContractorPost {
        contractorId: String
        description: String
        userNumber: String
        businessName: String
        img: String
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
deleteContractorPost(_id: ID!, contractorId: ID!): Contractor
addCustomerPost(input: addCustomerPost!): User
deleteCustomerPost(_id: ID!, customerId: ID!): Customer
addEmployee(input: addEmployee!): User
deleteEmployee(_id: ID!, contractorId: ID!): Contractor
addCar(input: addCar!): User
deleteCar(_id: ID!, customerId: ID!): Customer
}
`;


export default typeDefs