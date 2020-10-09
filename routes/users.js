import express from "express";
import User from "./models/User";
import parseError from "../utils/parseError";
import { sendConfirmationEmail } from '../mailer';

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body.user;
  const user = new User({ email });
  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then(userRecord => {
      sendConfirmationEmail(userRecord);
      res.json({ user: userRecord.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseError(err.errors) }));
});

export default router;