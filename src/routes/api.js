import { Router } from "express";
import { registerUser } from "../controllers/auth/postRegister";
import { loginUser } from "../controllers/auth/postLogin";

const apiRoutes = Router();

apiRoutes.post("/register", registerUser);
apiRoutes.post("/login", loginUser);

export default apiRoutes;
