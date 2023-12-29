import { Router } from "express";
import { LoginController } from '../controllers/login-controller.js'
export const loginRouter = Router()

// loginRouter.get('/', (req, res) => {
//     res.render('./partials/login')
// })

loginRouter.get('/', LoginController.mostrarLogin)
loginRouter.post('/', LoginController.authLogin)

