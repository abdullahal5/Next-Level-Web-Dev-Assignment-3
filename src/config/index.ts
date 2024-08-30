import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  databse_url: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  Bcrypt_Salt_Round: process.env.Bcrypt_Salt_Round,
  Access_Token: process.env.Access_token,
  Refresh_Token: process.env.Refresh_token,
  Jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  Jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};
