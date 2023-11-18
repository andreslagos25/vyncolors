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
    static async login({ input }){
        const { CORREO_CLIENTE, PASSWORD_CLIENTE } = input
        const loginData = await connection.query(`
            SELECT 1 FROM CLIENTES WHERE CORREO_CLIENTE = ? AND PASSWORD_CLIENTE = SHA(?);
        `, [CORREO_CLIENTE, PASSWORD_CLIENTE])
        return loginData;
    }

    
}