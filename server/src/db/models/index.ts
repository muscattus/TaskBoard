import mongoose from 'mongoose';
import user from "./User";

mongoose.Promise = global.Promise;

export const db = {
  user
};