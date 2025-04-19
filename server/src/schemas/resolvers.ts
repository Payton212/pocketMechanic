import { User } from '../models/index.js';
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
interface CustomerPost {
  customerPostId: string;
}
interface CustomerPostArgs {
  input: {
    image: string;
    description: String;
    budget: number;
  }
}
interface ContractorPost {
    contractorPostId: string;
}
interface ContractorPostArgs {
  input: {
    description: string;
    image: string;
    contractorName: string;
  }
}
interface EmployeeArgs {
  input: {
    image: string;
    name: string;
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

      return await User.findById(context.user._id);
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });

      const token = signToken(user.username, user.email, user._id);

      return { token, user };
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
      { input }: { input: ContractorPostArgs },
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const addContractorPost = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { contractor: { ContractorPost: input } } },
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
      { input }: { input: CustomerPostArgs },
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const addCustomerPost = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { customer: { CustomerPost: input } } },
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