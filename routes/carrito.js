import { Router } from "express";
import { CarritoController } from "../controllers/carrito-controller.js";
export const carritoRouter = Router();


carritoRouter.get('/', CarritoController.getCarrito)