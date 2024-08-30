import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import router from "./routes";

const app: Application = express();

app.use(
  cors({
    origin: [
      "https://next-level-web-dev-assignment-5.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next Level Developers 👋!!!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
