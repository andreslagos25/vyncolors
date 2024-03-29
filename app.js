import express, { json } from 'express'
import { engine } from 'express-handlebars'
import { join, dirname } from 'path'
import { clientesRouter } from './routes/clientes.js'
import { homeRouter } from './routes/home.js';
import { fileURLToPath } from 'url'
import { loginRouter } from './routes/login.js'
import session from 'express-session'
import crypto from 'crypto';
import { carritoRouter } from './routes/carrito.js'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(json())
app.disable('x-powered-by')

const secret = crypto.randomBytes(32).toString('hex');

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}))

app.set('views', join(__dirname, 'views'))

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs')
app.use(express.urlencoded({ extended: false }))
app.use('/clientes', clientesRouter)
app.use('/login', loginRouter)
app.use('/carrito', carritoRouter)
app.use('/', homeRouter)
    


//Public files
app.use(express.static(join(__dirname, 'public')));

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`SERVIDOR http://localhost:${PORT}`)
})