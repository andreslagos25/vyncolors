import { validateDataLogin } from '../schemas/login.js';
import { ClientesLoginModel } from '../models/mysql/login.js'
import jwt from 'jsonwebtoken'

export class LoginController{
    static async mostrarLogin(req, res){
        res.render('./partials/login')
    }
    static async authLogin(req, res){
        const input = validateDataLogin(req.body);
        const loggeo = await ClientesLoginModel.login({ input: input.data });
        if(loggeo == 0){
            res.render('./partials/login', { error: 'Credenciales incorrectas' })
        }else{
            
            const token = jwt.sign({"username": input.data.CORREO_CLIENTE}
            , 'secret_key', { expiresIn: '1h'})
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
            req.session.isLoggedIn = true;
            req.session.username = input.data.CORREO_CLIENTE;
            res.redirect('/')
        }
    }
}