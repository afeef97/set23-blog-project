import { Router } from "express";
import { registerUser } from "../controllers/auth/postRegister";
import { loginUser } from "../controllers/auth/postLogin";
import isAuthenticated from "../middleware/isAuthenticated";
import createBlogPost from "../controllers/users/postCreateBlogPost";
import isAuthor from "../middleware/isAuthor";
import editBlogPost from "../controllers/users/putEditBlogPost";
import deleteBlogPost from "../controllers/users/getDeleteBlogPost";
import getUsers from "../controllers/admin/getUsers";
import createComment from "../controllers/users/postCreateComment";
import checkReqBody from "../middleware/checkReqBody";
import editComment from "../controllers/users/putEditComment";

const apiRoutes = Router();
const privateAPI = Router();
const publicAPI = Router();

privateAPI.use(isAuthenticated);
apiRoutes.use(publicAPI);
apiRoutes.use(privateAPI);

// Authentication APIs
publicAPI.post("/register", registerUser);
publicAPI.post("/login", loginUser);
// Administrative APIs
privateAPI.get("/getUsers", getUsers);
// Blog post APIs
privateAPI.post("/createBlogPost", checkReqBody, createBlogPost);
privateAPI.put("/:slug/editBlogPost", checkReqBody, isAuthor, editBlogPost);
privateAPI.get("/:slug/deleteBlogPost", isAuthor, deleteBlogPost);
// Comment APIs
privateAPI.post("/:slug/createComment", checkReqBody, createComment);
privateAPI.put("/:slug/editComment", checkReqBody, editComment);

export default apiRoutes;
