import { Router } from "express";
import { registerUser } from "../controllers/auth/postRegister";
import { loginUser } from "../controllers/auth/postLogin";
import isAuthenticated from "../middleware/isAuthenticated";
import createBlogPost from "../controllers/users/postCreateBlogPost";
import isAuthor from "../middleware/isAuthor";
import editBlogPost from "../controllers/users/putEditBlogPost";
import deleteBlogPost from "../controllers/users/getDeleteBlogPost";

const apiRoutes = Router();
const privateAPI = Router();
const publicAPI = Router();

apiRoutes.use(privateAPI);
apiRoutes.use(publicAPI);
privateAPI.use(isAuthenticated);

// Authentication APIs
publicAPI.post("/register", registerUser);
publicAPI.post("/login", loginUser);
// Blog post APIs
privateAPI.post("/createBlogPost", createBlogPost);
privateAPI.put("/:slug/editBlogPost", isAuthor, editBlogPost);
privateAPI.get("/:slug/deleteBlogPost", isAuthor, deleteBlogPost);
// Comment APIs

export default apiRoutes;
