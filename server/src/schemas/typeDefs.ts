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
profileImg: String
contractorPost: [ContractorPost]
contractorPostCount: Int
}
    input addContractor {
        username: String
        email: String
        ownerName: String
        businessName: String
        userNumber: String
        profileImg: String
    }

type Customer {
_id: ID
username: String
email: String
firstName: String
lastName: String
userNumber: String
profileImg: String
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
        profileImg: String
    }

type CustomerPost {
_id: ID
username: String
img: String
description: String
budget: String
firstName: String
lastName: String
userNumber: String
}
    input addCustomerPost {
        customerId: String
        username: String
        img: String
        description: String
        budget: String
        firstName: String
        lastName: String
        userNumber: String
    }

type ContractorPost {
_id: ID
username: String
description: String
userNumber: String
businessName: String
img: String
}
    input addContractorPost {
        contractorId: String
        username: String
        description: String
        userNumber: String
        businessName: String
        img: String
    }
 
type Employee {
_id: ID
profileImg: String
firstName: String
lastName: String
description: String
}
    input addEmployee {
        contractorId: String
        profileImg: String
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
        customerId: ID!
        carYear: String
        carMake: String
        carModel: String
    }
        input UpdateCustomerProfile {
        customerId: ID!
        firstName: String
        lastName: String
        userNumber: String
        profileImg: String
    }
        input UpdateContractorProfile {
        contractorId: ID!
        ownerName: String
        businessName: String
        userNumber: String
        profileImg: String    
    }

type Auth {
token: ID
user: User
}

type Query {
me: User!
userCustomer(id: ID!): User
customerProfile(username: String!): Customer
contractorProfile(username: String!): Contractor
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
updateCustomerProfile(input: UpdateCustomerProfile!): Customer
updateContractorProfile(input: UpdateContractorProfile!): Contractor
}
`;


export default typeDefs