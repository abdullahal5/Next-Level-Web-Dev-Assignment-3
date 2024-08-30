import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginInfo, TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { createToken, verifyToken } from "./user.utility";
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
    userId: user?._id,
    name: user?.name,
    email: user?.email,
    profileImage: user?.profileImage,
    role: user?.role,
    address: user?.address,
    phone: user?.phone,
    _id: user?._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.Access_Token as string,
    config.Jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.Refresh_Token as string,
    config.Jwt_refresh_expires_in as string,
  );

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw new AppError(httpStatus.FORBIDDEN, "Please enter valid password");
  }

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (refreshToken: string) => {
  const decoded = verifyToken(refreshToken, config.Refresh_Token as string);

  const isUserExist = await UserModel.findOne({ email: decoded?.email });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found. Please register");
  }

  const jwtPayload = {
    userId: isUserExist?._id,
    name: isUserExist?.name,
    email: isUserExist?.email,
    profileImage: isUserExist?.profileImage,
    role: isUserExist?.role,
    address: isUserExist?.address,
    phone: isUserExist?.phone,
    _id: isUserExist?._id
  };

  const accessToken = createToken(
    jwtPayload,
    config.Access_Token as string,
    config.Jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const UserService = {
  createUserIntoDB,
  loginUser,
  refreshToken,
};
