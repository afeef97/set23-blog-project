import express from "express";
import getRoot from "../controllers/root/getRoot";
import postRoot from "../controllers/root/postRoot";
import getBlogs from "../controllers/root/getBlogs";
import getBlogPage from "../controllers/root/getBlogPage";

const root = express.Router();

root.get("/", getRoot);
root.post("/", postRoot);

// Blog APIs
root.get("/blogs", getBlogs);
root.get("/blogs/:slug", getBlogPage);

export default root;
