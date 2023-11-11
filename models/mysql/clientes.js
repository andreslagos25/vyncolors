import mysql from "mysql2/promise"

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'Hqrt24',
    database: 'cosmeticos'
}

const connection = await mysql.createConnection(config)

export class ClientesModel{
    static async getClientes(){
        const clientes = await connection.query(`
        SELECT * FROM CLIENTES;
        `)
        return clientes[0]
    }

    static async crearCliente({ input }){
        const {
            DOCUMENTO_CLIENTE,
            PNOMBRE_CLIENTE,
            SNOMBRE_CLIENTE,
            PAPELLIDO_CLIENTE,
            SAPELLIDO_CLIENTE,
            TELEFONO_CLIENTE,
            CORREO_CLIENTE, 
            PASSWORD_CLIENTE,
            ID_TIPODOC
        } = input

        const [uuidResult] = await connection.query('SELECT UUID() AS uuid;')
        const [{ uuid }] = uuidResult
        try{
            await connection.query(`
            CALL CREAR_CLIENTE(UUID_TO_BIN("${uuid}"),?,?,?,?,?,?,?,?,?);`, [DOCUMENTO_CLIENTE, PNOMBRE_CLIENTE, SNOMBRE_CLIENTE, PAPELLIDO_CLIENTE, SAPELLIDO_CLIENTE, TELEFONO_CLIENTE, CORREO_CLIENTE, PASSWORD_CLIENTE,ID_TIPODOC])
        }catch(e){
            throw new Error(e)
        }
    }
}