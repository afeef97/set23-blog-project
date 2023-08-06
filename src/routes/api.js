import { Router } from "express";
import { registerUser } from "../controllers/auth/postRegister";
import { loginUser } from "../controllers/auth/postLogin";
import isAuthenticated from "../middleware/isAuthenticated";
import createBlogPost from "../controllers/users/postCreateBlogPost";
import isAuthor from "../middleware/isAuthor";
import editBlogPost from "../controllers/users/putEditBlogPost";

const apiRoutes = Router();

// Authentication APIs
apiRoutes.post("/register", registerUser);
apiRoutes.post("/login", loginUser);
// Blog post APIs
apiRoutes.post("/createBlogPost", isAuthenticated, createBlogPost);
apiRoutes.put("/:slug/editBlogPost", isAuthenticated, isAuthor, editBlogPost);
apiRoutes.put("/:slug/deleteBlogPost", isAuthenticated, isAuthor, editBlogPost);
// Comment APIs

export default apiRoutes;
