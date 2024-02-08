import { Productos } from "../models/mysql/productos.js";

export class Producto{
    static async getProducto(req, res){
        const productos = await Productos.productos();
        return productos;
    }
}