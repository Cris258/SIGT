import express from 'express';
import morgan from 'morgan';
import Asistencia from '../routers/Asistencia.router.js';
import Carrito from '../routers/Carrito.router.js';
import DetalleCarrito from '../routers/DetalleCarrito.router.js';
import DetalleVenta from '../routers/DetalleVenta.router.js';
import EstadoPersona from '../routers/EstadoPersona.router.js';
import Persona from '../routers/Persona.router.js';
import Producto from '../routers/Producto.router.js';
import Rol from '../routers/Rol.router.js';
import Tarea from '../routers/Tarera.router.js';
import Venta from '../routers/Venta.router.js';
import cors from "cors";

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
}));

app.use(morgan('dev'));
app.use(express.json());
app.use('/api', Persona);
app.use('/api', Asistencia);
app.use('/api', Carrito);
app.use('/api', DetalleCarrito);
app.use('/api', DetalleVenta);
app.use('/api', EstadoPersona);
app.use('/api', Producto);
app.use('/api', Rol);
app.use('/api', Tarea);
app.use('/api', Venta);
app.use((req, res, next) => {
    res.status(404).json(
        {
            Message: 'Endpoint no encontrado ❌'
        }
    );
}
);

export default app;