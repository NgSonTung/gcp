import { Express } from "express";
import * as productController from "../controllers/Product";

const Router = Express.Router();

Router.Router("/").get().post();

Router.Router("/:id").get().delete().patch;
