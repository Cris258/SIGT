import { Router } from "express";
import { createEstadoPersona, showEstadoPersona, showEstadoPersonaId, updateEstadoPersona, deleteEstadoPersona } from "../controller/EstadoPersona.controller.js";
import rolScheme from '../schemes/EstadoPersona.schema.js';
import rolMiddleware from '../middleware/validate.middleware.js';
import verifyToken  from "../middleware/jwt.middleware.js";
import authorizeRole from "../middleware/rol.middleware.js";
import { checkBlacklist } from "../middleware/tokenBlacklist.js";

const router = Router();

router.post('/estado', verifyToken, checkBlacklist, authorizeRole("SuperAdmin"), createEstadoPersona);
router.get('/estado', verifyToken, checkBlacklist, authorizeRole("SuperAdmin"), showEstadoPersona);
router.get('/estado/:id', verifyToken, checkBlacklist, authorizeRole("SuperAdmin"), showEstadoPersonaId);
router.put('/estado/:id', verifyToken, checkBlacklist, authorizeRole("SuperAdmin"), rolMiddleware(rolScheme.updateEstadoPersona), updateEstadoPersona);
router.delete('/estado/:id', verifyToken, checkBlacklist, authorizeRole("SuperAdmin"), deleteEstadoPersona);

export default router;