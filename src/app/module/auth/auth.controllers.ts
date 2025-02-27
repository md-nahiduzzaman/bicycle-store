import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import { JwtPayload } from 'jsonwebtoken';

const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: StatusCodes.ACCEPTED,
    data: {
      token: result?.token,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    message: 'Access token refreshed successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthService.changePassword(
    req.user as JwtPayload,
    req.body,
  );

  sendResponse(res, {
    success: true,
    message: 'Password changed successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const AuthControllers = {
  register,
  login,
  changePassword,
  refreshToken,
};
