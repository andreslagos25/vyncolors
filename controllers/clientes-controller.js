import { ClientesModel } from "../models/mysql/clientes.js"
import { validateCliente } from "../schemas/cliente.js"


export class ClientesController{
    static async getClientes(req, res){
        const clientes = await ClientesModel.getClientes()
        res.json(clientes)
    }

    static async crearCliente(req, res){
        const result = validateCliente(req.body)
        if(!result.success){
            return res.status(400).json({ error: JSON.parse(result.message) })
        }

        const nuevoCliente = await ClientesModel.crearCliente({ input: result.data})
        return res.status(201).json(nuevoCliente)

    }
}