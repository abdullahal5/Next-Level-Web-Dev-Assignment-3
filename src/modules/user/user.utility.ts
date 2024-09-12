import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

type JwtpayloadData = {
  userId: Types.ObjectId;
  name: string;
  email: string;
  profileImage: string;
  role: string;
};

export const createToken = (
  jwtPayload: JwtpayloadData,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
