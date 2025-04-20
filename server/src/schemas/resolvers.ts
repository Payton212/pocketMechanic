import { User, Customer, CustomerPost, ContractorPost } from "../models/index.js";
import { signToken, AuthenticationError } from '../utils/auth.js'; 

interface AddUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    }
}
interface LoginUserArgs {
    email: string;
    password: string;
}
interface CustomerArgs{
  input: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}
interface CustomerId{
  customerId: string;
}
interface ContractorArgs {
  input: {
    username: string;
    email: string;
  };
}
interface CustomerPost {
  customerPostId: string;
}
interface CustomerPostArgs {
  input: {
    image: string;
    description: string;
    budget: string;
    firstName: string;
    lastName: string;
  };
}
interface ContractorPost {
    contractorPostId: string;
}
interface ContractorPostArgs {
  input: {
    description: string;
    image: string;
    contractorName: string;
    constractorNumber: string;
  }
}
interface EmployeeArgs {
  input: {
    image: string;
    firstName: string;
    lastName: string;
    description: string;
  }
}
interface Employee {
    employeeId: string;
}
interface CarArgs{
    input: {
        carYear: number;
        carMake: string;
        carModel: string;
    }
}
interface Car {
    carId: string;
}
const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError("could not authenticate User.");
      }

      return await User.findById({ _id: context.user._id });
    },
    user: async (_parent: any, { id }: any, context: any) => {
    if(context.user)
      try {
        // Assuming you have a User model defined with Mongoose
        const user = await User.findById(id).populate('customer');
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error('Error fetching user: ' );
      }
      throw new AuthenticationError("could not authenticate User.");
    },
  
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });

      const token = signToken(user.username, user.email, user._id);

      return { token, user };
    },
    addCustomer: async (
      _parent: any,
      { input }: CustomerArgs,
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const createCustomer = await Customer.create({ ...input });
        await User.findOneAndUpdate(
          { _id: user._id },
          { $set: { customer: createCustomer._id } },
          { new: true }
        );
        console.log(createCustomer);
        return createCustomer;
      }
      throw new AuthenticationError("Could not authenticate user.");
    },
    addContractor: async (
      _parent: any,
      { input }: ContractorArgs,
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const Contractor = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: { contractor: input } },
          { new: true }
        );
        return Contractor;
      }
      throw new AuthenticationError("Could not authenticate user.");
    },
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Could not authenticate user.");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Could not authenticate user.");
      }

      const token = signToken(user.username, user.email, user._id);

      return { token, user };
    },
    addContractorPost: async (
      _parent: any,
      { input }: ContractorPostArgs,
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const addContractorPost = await ContractorPost.create({ ...input });
        await User.findOneAndUpdate(
          { _id: user._id },
          {
            $addToSet: {
              contractor: { ContractorPost: addContractorPost._id },
            },
          },
          { new: true }
        );

        return addContractorPost;
      }
      throw new AuthenticationError("you need to be logged in");
    },
    deleteContractorPost: async (
      _parent: any,
      { contractorPostId }: ContractorPost,
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const deleteContractorPost = await User.findOneAndUpdate(
          { _id: user._id },
          {
            $pull: {
              contractor: {
                contractorPost: { contractorPostId: contractorPostId },
              },
            },
          },
          { new: true }
        );
        return deleteContractorPost;
      }
      throw new AuthenticationError("you need to be logged in");
    },
    addCustomerPost: async (
      _parent: any,
      { input }: any,
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const { customerId, ...customerData } = input;
        const addCustomerPost = await CustomerPost.create({ ...customerData });
        await User.findOneAndUpdate(
          { _id: customerId },
          { $push: { customer: { customerPost: addCustomerPost._id } } },
          { new: true }
        );
        return addCustomerPost;
      }
      throw new AuthenticationError("you need to be logged in");
    },
    deleteCustomerPost: async (
      _parent: any,
      { customerPostId }: CustomerPost,
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const deleteCustomerPost = await User.findOneAndUpdate(
          { _id: user._id },
          {
            $pull: {
              customer: { customerPost: { customerPostId: customerPostId } },
            },
          },
          { new: true }
        );
        return deleteCustomerPost;
      }
      throw new AuthenticationError("you need to be logged in");
    },
    addEmployee: async (
      _parent: any,
      { input }: { input: EmployeeArgs },
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const addEmployee = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { contractor: { employees: input } } },
          { new: true }
        );
        return addEmployee;
      }
      throw new AuthenticationError("you need to be logged in");
    },
    deleteEmployee: async (
      _parent: any,
      { employeeId }: Employee,
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const deleteEmployee = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { contractor: { employees: { employeeId: employeeId } } } },
          { new: true }
        );
        return deleteEmployee;
      }
      throw new AuthenticationError("you need to be logged in");
    },
    addCar: async (
      _parent: any,
      { input }: { input: CarArgs },
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const addCar = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { customer: { car: input } } },
          { new: true }
        );
        return addCar;
      }
      throw new AuthenticationError("you need to be logged in");
    },
    deleteCar: async (_parent: any, { carId }: Car, context: any) => {
      const user = context.user;
      if (user) {
        const deleteCar = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { customer: { car: { carId: carId } } } },
          { new: true }
        );
        return deleteCar;
      }
      throw new AuthenticationError("you need to be logged in");
    },
  },
};

export default resolvers