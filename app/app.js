import express from "express";
import allPageVisitsRoute from "./routes/page_visits.routes.js";
import allUserRoutes from "./routes/user_data.routes.js";
import allNavigationPathRoutes from "./routes/navigation_paths.routes.js";

const routes = express.Router();

const baseUrl = "/api";

routes.use(baseUrl, allPageVisitsRoute);

routes.use(baseUrl, allUserRoutes);

routes.use(baseUrl, allNavigationPathRoutes);


export default routes;