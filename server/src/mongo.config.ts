import mongoose from "mongoose";

export function initializeMongo() {
  mongoose.connect(`mongodb://admin:password@localhost:27040/task-board`)
  .then(() => console.log('connected to mongo'))
  .catch((e: any) => { console.log('not connected'); console.log(e)});
}