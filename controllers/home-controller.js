import { Producto } from "./producto-controller.js"

export class HomeController{
    static async getHome(req, res){
        const productos = await Producto.getProducto();
        res.render('index', { session: req.session , productos: productos})
        
    }
    
}