import { db } from "../../db/models";
const User = db.user;
import  { Request, Response, NextFunction } from 'express';

const checkDuplicateUsername = (req: Request, res: Response, next: NextFunction) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    next();
  });
};

export const verifySignUp = {
  checkDuplicateUsername,
};