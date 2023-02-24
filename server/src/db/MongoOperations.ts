import { User } from "../auth/interfaces";
import { initializeMongo } from "../mongo.config";

import { db } from "./models/index"

export default class MongoOperations {
  model: string;

  constructor (model: string) {
    initializeMongo();
    this.model = model;
  }

  
  async insert<Record> (record: Record){
    try {
      const newRecord = new db[this.model as keyof typeof db](record);
      const inserts = await newRecord.save();
      return inserts;
     } catch(err) {
      throw err
     }
  }

  async getOne<Record>(searchParams: any) {
    return db[this.model as keyof typeof db].findOne<Record>(searchParams);
  }

  async getOneById<Record>(id: string) {
    return db[this.model as keyof typeof db].findById<Record>(id);
  }
  // async list(filters: any): Promise<Record[]> {
  //   const direction = filters.orderBy?.direction === 'asc' ? 1 : -1;
  //   try {
  //     const foundHistory = await History.find(filters.where || {})
  //     // .sort({[filters.orderBy?.field]: -1})
  //     .sort({'date': direction})          //needs to be corrected to the dynamic date field
  //     .limit(filters.limit || 1)
  //     return foundHistory;
  //   } catch{
  //       throw 'error'
  //   };
  // }

  // async beforeInsert(record: Record) {}
}