import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginInfo, TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { createToken } from "./user.utility";
import config from "../../config";

const createUserIntoDB = async (payload: TUser) => {
  const isUserExists = await UserModel.findOne({ email: payload.email });

  if (isUserExists) {
    throw new AppError(httpStatus.FORBIDDEN, "This email is Already Exists!!!");
  }
  const newUser = await UserModel.create(payload);

  const result = await UserModel.findById(newUser._id).select("-password");

  return result;
};

const loginUser = async (payload: TLoginInfo) => {
  const { email, password } = payload;

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found please Register!!!",
    );
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.Access_Token as string,
    config.Jwt_access_expires_in as string,
  );

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw new AppError(httpStatus.FORBIDDEN, "Please enter valid password");
  }

  const validateUser = await UserModel.findOne({ email: email }).select(
    "-password",
  );

  return { validateUser, token: accessToken };
};

export const UserService = {
  createUserIntoDB,
  loginUser,
};
