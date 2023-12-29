import { validateDataLogin } from '../schemas/login.js';
import { ClientesLoginModel } from '../models/mysql/login.js'


export class LoginController{
    static async mostrarLogin(req, res){
        res.render('./partials/login')
    }
    static async authLogin(req, res){
        const input = validateDataLogin(req.body);
        const loggeo = await ClientesLoginModel.login({ input: input.data });
        if(loggeo == 0){
            try {
                throw new Error('Hubo un problema al iniciar sesion');
            } catch (error) {
                res.render('./partials/login', { error: error.message })
            }
        }else{
            res.render('./index')
            console.log("Loggeado")
        }
    }
}