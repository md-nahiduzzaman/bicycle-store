import { IUser } from './user.interface';
import User from './user.model';

// create user service
const createUser = async (payload: IUser): Promise<IUser> => {
  // payload.role = 'admin';
  const result = await User.create(payload);
  return result;
};

// get user service
const getUser = async () => {
  const result = await User.find();
  return result;
};

// get single user service
const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

// block user
const blockUser = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: { isBlocked: true } },
    { new: true, runValidators: true },
  );
  if (!user) throw new Error('User not found');
  return user;
};

export const userService = {
  createUser,
  getUser,
  getSingleUser,
  blockUser,
};
