
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
        CALL CONSULTA_CLIENTE();
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

    static async updateCliente({ id, input}){
        const updateResult = await connection.query(
            `
            UPDATE CLIENTES
            SET ?
            WHERE ID_CLIENTE = UUID_TO_BIN(?);
            `,
            [input, id]
        )

        if(updateResult.affectedRows == 0){
            throw new Error("Cliente no encontrado");
        }
        const updateCliente = await connection.query(
            `
            SELECT
            BIN_TO_UUID(ID_CLIENTE) as id,
            DOCUMENTO_CLIENTE,
            PNOMBRE_CLIENTE,
            SNOMBRE_CLIENTE,
            PAPELLIDO_CLIENTE,
            SAPELLIDO_CLIENTE,
            TELEFONO_CLIENTE,
            ID_TIPODOC
            FROM CLIENTES
            WHERE ID_CLIENTE = UUID_TO_BIN(?);
        `,
        [id]
        );
        return updateCliente[0];
    }
}