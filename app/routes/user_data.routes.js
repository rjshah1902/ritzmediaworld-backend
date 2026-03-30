import express from "express";
import { getUsers, addUser, getUserDetails } from "./../controller/user_data.controller.js";

const routes = express.Router();

const baseUrl = "/users";

routes.get(baseUrl, getUsers);

routes.get(baseUrl + "/details", getUserDetails);

routes.post(baseUrl, addUser);


export default routes;