import { Router } from "express";
import { HomeController } from "../controllers/home-controller.js";


export const homeRouter = Router()

homeRouter.get('/', HomeController.getHome)
