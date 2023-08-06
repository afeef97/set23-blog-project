import { Router } from "express";
import registerUser from "../controllers/auth/postRegister";

const apiRoutes = Router();

apiRoutes.post('/register', registerUser);

export default apiRoutes;