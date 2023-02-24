import { Router, Request, Response } from "express";
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
import  AuthService from "../auth/Auth";
import { verifySignUp } from "../auth/middlewares/verifySignUp";

const router = Router();

router.post('/signup', jsonParser, [verifySignUp.checkDuplicateUsername],
async (req: Request, res: Response) => {
  try {
    // const inserts = await AuthService.saveUser(req);
    const inserts = await AuthService.signup(req, res);
    res.json(inserts);
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
});

// app.post(
//   "/api/auth/signin", async (req, res) => {
//       return controller.signin(req, res);
//   }
// );
router.post('/signin', jsonParser, async(req: Request, res: Response) => {
  try{
    const currentUser = await AuthService.signin(req, res)
    res.json (currentUser)
  } catch (err) {
    res.status(500).send({message: err});
  }
})

router.get('/me', jsonParser, async (req, res) => {
  try{
    const currentUser = await AuthService.getCurrentUser(req, res);
    res.json(currentUser)
  } catch (err) {
    res.status(500).send({message: err});
  }
  }
)

export default router;