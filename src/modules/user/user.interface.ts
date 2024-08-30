export type role = "admin" | "user";

export type TUser = {
  name: string;
  email: string;
  password: string;
  profileImage: string;
  phone: string;
  address: string;
  role: role;
};

export type TLoginInfo = {
  email: string;
  password: string;
};
