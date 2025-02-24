// import jwt from 'jsonwebtoken';

// export const createToken = (
//   jwtPayload: { email: string; role: string },
//   secret: string,
//   expiresIn: string,
// ) => {
//   return jwt.sign(jwtPayload, secret, {
//     expiresIn,
//   });
// };

import jwt, { SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string | number,
) => {
  const options: SignOptions = {
    expiresIn: typeof expiresIn === 'string' ? parseInt(expiresIn) : expiresIn,
  };
  return jwt.sign(jwtPayload, secret, options);
};
