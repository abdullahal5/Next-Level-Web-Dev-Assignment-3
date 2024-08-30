import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import config from "../../config";

const registerUser = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await UserService.createUserIntoDB(body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserService.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production" ? true : false,
    httpOnly: true,
    // sameSite: config.NODE_ENV === "production" ? "none" : "lax",
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in succesfully!",
    data: {
      accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await UserService.refreshToken(refreshToken);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token is retrieved succesfully!",
    data: result,
  });
});

export const UserController = {
  registerUser,
  loginUser,
  refreshToken,
};
