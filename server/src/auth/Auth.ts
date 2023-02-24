import MongoOperations from "../db/MongoOperations";
import { User, userData, JwtPayload } from "./interfaces";
import { authSecret } from "./auth.config";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { Request, Response } from "express";

export class AuthService {
  dbService: MongoOperations;

  constructor() {
    this.dbService = new MongoOperations('user');
  }

  async signup (req: Request, res: Response): Promise <User | void> {
    const newUser = {
      username: req.body.username,
      password: req.body.password
    }
    newUser.password = bcryptjs.hashSync(newUser.password, 8);
    await this.dbService.insert(newUser);
    return await this.signin(req, res);
    // user.password = '';  //todo: delete this propertry completely
    // return user
  };

  async signin (req: Request, res: Response): Promise<User>{
    const userData = await this.dbService.getOne<userData>({
      username: req.body.username
    });
    if (!userData) {
      throw "User Not found.";    //todo: error classes to be created
    }
    const passwordIsValid = this.isPasswordValid(req.body.password, userData!.password);
    if (!passwordIsValid) {
      throw "Invalid Password!"
    }
    const accessToken = this.getAccessToken(userData._id);
    const currentUser = {
      _id: userData._id,
      username: userData.username,
      fullname: userData.fullname,
      accessToken: accessToken
    };
    return currentUser;
  }

  getAccessToken(userid: string): string {
    const token = jwt.sign({id: userid}, authSecret.secret, {
      expiresIn: 86400 //24hours
    })
    return token;
  }

  isPasswordValid(encrypted: string, password: string): boolean {
    return bcryptjs.compareSync(
      encrypted,
      password
    )
  }
 
  async getCurrentUser(req: Request, res: Response) {
    const accessToken = req.headers.authorization?.substring(7);
    if(!accessToken) {
      throw 'no token'
    }
    // let userId: string | undefined;
    const {id} = jwt.verify(accessToken, authSecret.secret) as JwtPayload;
    if(!id) {
      throw 'Failed to authenticate token.';
    }
    const userData = await this.dbService.getOneById<userData>(id);
    if(!userData) {
      throw 'no user'
    }
    const currentUser = {
      _id: userData._id,
      username: userData.username,
      fullname: userData.fullname,
      accessToken: accessToken
    }
    return currentUser;
  }
}

export default new AuthService();