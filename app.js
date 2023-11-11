import express, { json } from 'express'
import { clientesRouter } from './routes/clientes.js'
const app = express()
app.use(json())
app.disable('x-powered-by')

app.use('/clientes', clientesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`SERVIDOR EN EL PUERTO ${PORT}`)
})