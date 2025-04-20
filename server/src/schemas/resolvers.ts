import { User, Customer, Car, CustomerPost, ContractorPost, Contractor, Employee } from "../models/index.js";
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
  _id: string;
}
interface CustomerPostArgs {
  customerId: string;
  input: {
    image: string;
    description: string;
    budget: string;
    firstName: string;
    lastName: string;
  };
}
interface ContractorPost {
    _id: string;
}
interface ContractorPostArgs {
  contractorId: string;
  input: {
    description: string;
    image: string;
    contractorName: string;
    constractorNumber: string;
  }
}
interface EmployeeArgs {
  contractorId: string;
  input: {
    image: string;
    firstName: string;
    lastName: string;
    description: string;
  };
}
interface Employee {
    _id: string;
}
interface CarArgs{
  customerId: string;
    input: {
        carYear: string;
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
      const myUser = await User.findById({ _id: context.user._id })
        .populate({
          path: "customer",
          populate: [{ path: "car" }, { path: "customerPost" }],
        })
        .populate({
          path: "contractor",
          populate: [{ path: "employees" }, { path: "contractorPost" }],
        });
      return myUser;
    },
    userCustomer: async (_parent: any, { id }: any, context: any) => {
      if (context.user) {
        try {
          // Assuming you have a User model defined with Mongoose
          const user = await User.findById(id).populate("customer");
          if (!user) {
            throw new Error("User not found");
          }
          return user;
        } catch (error) {
          console.error(error);
        }
        return console.log(" i am an apple");
      } else {
        throw new AuthenticationError("could not authenticate User.");
      }
    },
    userContractor: async (_parent: any, { id }: any, context: any) => {
      if (context.user) {
        try {
          const user = await User.findById(id).populate("contractor");
          if (!user) {
            throw new Error("User not found");
          }
          return user
        } catch (error) {
          console.error(error);
        }
        return console.log(" i am an apple");
      } else {
        throw new AuthenticationError("could not authenticate User.");
      }
    },
    customerPosts: async () => {
      return await CustomerPost.find();
    },
    contractorPosts: async () => {
      return await ContractorPost.find();
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
        ).populate("customer");
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
        const addContractor = await Contractor.create({ ...input });
        console.log(addContractor);
        await User.findOneAndUpdate(
          { _id: user._id },
          { $set: { contractor: addContractor._id } },
          { new: true }
        ).populate("contractor");
        return addContractor;
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
      { input }: {input: ContractorPostArgs},
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const { contractorId, ...contractorData } = input;
        const addContractorPost = await ContractorPost.create({ ...contractorData });
        await Contractor.findOneAndUpdate(
          { _id: contractorId },
          { $push: {contractorPost: addContractorPost._id } },
          { new: true }
        );
        return addContractorPost;
      }
      throw new AuthenticationError("you need to be logged in");
    },
    deleteContractorPost: async (
      _parent: any,
      { _id }: ContractorPost,
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const deleteContractorPost = await User.findOneAndUpdate(
          { _id: user._id },
          {
            $pull: {
              contractor: {
                contractorPost: { contractorPostId: _id },
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
      { input }: {input: CustomerPostArgs},
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const { customerId, ...customerData } = input;
        const addCustomerPost = await CustomerPost.create({ ...customerData });
        await Customer.findOneAndUpdate(
          { _id: customerId },
          { $push: { customerPost: addCustomerPost._id } },
          { new: true }
        );
        return addCustomerPost;
      }
      throw new AuthenticationError("you need to be logged in");
    },
    deleteCustomerPost: async (
      _parent: any,
      { _id }: CustomerPost,
      context: any
    ) => {
      const user = context.user;
      if (user) {
        const deleteCustomerPost = await User.findOneAndUpdate(
          { _id: user._id },
          {
            $pull: {
              customer: { customerPost: { customerPostId: _id } },
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
      console.log(input);
      const user = context.user;
      if (user) {
        const { contractorId, ...contractorData } = input;
        const addEmployee = await Employee.create({ ...contractorData });
         await Contractor.findOneAndUpdate(
          { _id: contractorId },
          { $push: { employees: addEmployee._id } },
          { new: true }
         );
        console.log(addEmployee);
        return addEmployee;
      }
      throw new AuthenticationError("you need to be logged in");
    },
    deleteEmployee: async (_parent: any, { _id }: Employee, context: any) => {
      const user = context.user;
      if (user) {
        const deleteEmployee = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { contractor: { employees: { employeeId: _id } } } },
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
      console.log(input);
      const user = context.user;
      if (user) {
        const { customerId, ...carData } = input;
        const createCar = await Car.create({ ...carData });
        await Customer.findOneAndUpdate(
          { _id: customerId },
          { $push: { car: createCar._id } },
          { new: true }
        );
        console.log(createCar);
        return createCar;
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