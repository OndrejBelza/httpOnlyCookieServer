import express from "express";
import users from "./data/users";
import { v4 } from "uuid";
import sessions from "./data/sessions";
import cors from "cors";
import cookieParser from "cookie-parser";

const port = 4000;

const main = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.set("trust proxy", 1);
  app.use(cookieParser());

  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log({ email, password });

    const user = users.find(
      (user) => user.password === password && user.email === email
    );

    if (!user) return res.sendStatus(401);

    const sessionId = v4();

    sessions.push({
      id: sessionId,
      data: user,
    });

    res.cookie("authorization", sessionId, {
      httpOnly: true,
    });

    return res.send();
  });

  app.get("/me", (req, res) => {
    const { authorization } = req.cookies;

    if (!authorization) return res.sendStatus(401);
    const session = sessions.find((ses) => ses.id === authorization);
    if (!session) return res.sendStatus(401);

    return res.send(session.data);
  });

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
};

main().catch(console.error);
