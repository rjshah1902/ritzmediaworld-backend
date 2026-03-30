import express from "express";
import { getVisitCount, addOrUpdateVisit } from "./../controller/page_visits.controller.js";

const routes = express.Router();

const baseUrl = "/page-visits";

routes.get(baseUrl, getVisitCount);

routes.post(baseUrl, addOrUpdateVisit);


export default routes;