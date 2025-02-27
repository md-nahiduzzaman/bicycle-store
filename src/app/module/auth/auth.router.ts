import { Router } from 'express';
import { AuthControllers } from './auth.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';

const AuthRouter = Router();

AuthRouter.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.register,
);
AuthRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);
AuthRouter.post('/refresh-token', AuthControllers.refreshToken);
AuthRouter.post(
  '/change-password',
  auth('admin', 'customer'),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export default AuthRouter;
