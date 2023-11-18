import { validateDataLogin } from '../schemas/login.js'
import { ClientesModel } from '../models/mysql/login.js'


export class LoginController{
    static async authLogin(req, res){
        const result = validateDataLogin(req.body)
        console.log(result);
        if(!result.success){
            return res
        }
        const resultadoC = await ClientesModel.login({ input: result.data })
        if(resultadoC == 1){
            res.render('index');
        }else{
        }
    }
}