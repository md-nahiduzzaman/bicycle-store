import config from '../../config';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';

const register = async (payload: IUser) => {
  const userPayload = {
    ...payload,
    role: payload.role || 'customer',
  };

  const result = await User.create(userPayload);

  return {
    _id: result._id,
    name: result.name,
    email: result.email,
    role: result.role,
  };
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  // check user
  if (!user) {
    throw new Error('User is not found !');
  }

  // check user block
  const userStatus = user?.isBlocked;
  if (userStatus === true) {
    throw new Error('User is blocked');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Wrong Password');
  }

  const jwtPayload = {
    email: user?.email,
    name: user?.name,
    role: user?.role,
  };

  //create token
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { token, user };
};

const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const isUserExist = await User.findOne({
    email: user?.email,
    role: user?.role,
  }).select('+password');

  if (!isUserExist) {
    throw new Error('User not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Old password is incorrect');
  }

  const hashedNewPassword = await bcrypt.hash(payload.newPassword, 10);

  const updatedUser = await User.findOneAndUpdate(
    {
      email: user?.email,
      role: user?.role,
    },
    { password: hashedNewPassword },
    { new: true },
  );

  if (!updatedUser) {
    throw new Error('Failed to update password');
  }

  return {
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new Error('Refresh token is required');
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(
      token,
      config.jwt_refresh_secret as string,
    ) as JwtPayload;

    const { email } = decoded;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    // Check if password was changed after token was issued
    // if (user.passwordChangedAt) {
    //   const passwordChangeTime = Math.floor(
    //     user.passwordChangedAt.getTime() / 1000,
    //   );

    //   if (passwordChangeTime > (iat || 0)) {
    //     throw new Error('Password was changed. Please login again');
    //   }
    // }

    // Generate new access token
    const accessToken = createToken(
      { email: user.email, role: user.role },
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    return { accessToken };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Invalid refresh token: ${error.message}`);
    }
    throw new Error('Invalid refresh token');
  }
};

export const AuthService = {
  register,
  login,
  changePassword,
  refreshToken,
};
