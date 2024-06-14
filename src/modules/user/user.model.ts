import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      default: "+8801914049327",
    },
    address: {
      type: String,
      default: "Dhaka, Bangladesh",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.Bcrypt_Salt_Round),
  );
  next();
});

export const UserModel = model<TUser>("User", userSchema);
