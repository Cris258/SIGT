import tareaModel from "../models/Tarea.model.js";

export const createTarea = async (req, res) => {
  try {
    await tareaModel.sync();
    const dataTarea = req.body;
    const createTarea = await tareaModel.create({
      Descripcion: dataTarea.Descripcion,
      FechaAsignacion: dataTarea.FechaAsignacion,
      FechaLimite: dataTarea.FechaLimite,
      EstadoTarea: dataTarea.EstadoTarea,
      Prioridad: dataTarea.Prioridad,
      Persona_FK: parseInt(dataTarea.Persona_FK),
    });
    res.status(201).json({
      ok: true,
      status: 201,
      Message: "Tarea Creada",
      id: createTarea.idTarea,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salio mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

export const showTarea = async (req, res) => {
  try {
    await tareaModel.sync();
    let tareas;

    if (req.user.rol === "Empleado") {
      tareas = await tareaModel.findAll({ where: { Persona_FK: req.user.id } });
    } else {
      tareas = await tareaModel.findAll();
    }

    res.status(200).json({
      ok: true,
      status: 200,
      Message: "Ver Tareas",
      body: tareas,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salió mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

export const showIdTarea = async (req, res) => {
  try {
    await tareaModel.sync();
    const idTarea = req.params.id;

    const tarea = await tareaModel.findOne({ where: { idTarea } });

    if (!tarea) {
      return res.status(404).json({ Message: "Tarea no encontrada" });
    }

    if (req.user.rol === "Empleado" && tarea.Persona_FK !== req.user.id) {
      return res
        .status(403)
        .json({ Message: "No puedes ver tareas que no son tuyas" });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      Message: "Ver Tarea por ID",
      body: tarea,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salió mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

export const updateTarea = async (req, res) => {
  try {
    await tareaModel.sync();
    const dataTarea = req.body;
    const idTarea = req.params.id;
    const updateTarea = await tareaModel.update(
      {
        Descripcion: dataTarea.Descripcion,
        FechaAsignacion: dataTarea.FechaAsignacion,
        FechaLimite: dataTarea.FechaLimite,
        EstadoTarea: dataTarea.EstadoTarea,
        Prioridad: dataTarea.Prioridad,
        Persona_FK: parseInt(dataTarea.Persona_FK),
      },
      {
        where: {
          idTarea: idTarea,
        },
      }
    );
    res.status(200).json({
      ok: true,
      status: 201,
      Message: "Tarea Actualizada",
      body: updateTarea,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salio mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

export const deleteTarea = async (req, res) => {
  try {
    await tareaModel.sync();
    const idTarea = req.params.id;
    const deleteTarea = await tareaModel.destroy({
      where: {
        idTarea: idTarea,
      },
    });
    res.status(200).json({
      ok: true,
      status: 201,
      Message: "Tarea Eliminada",
      body: deleteTarea,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salio mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

// ============ AGREGA ESTAS FUNCIONES A TU Tarea.controller.js ============

import pool from "../config/connect.db.js";

// Función para obtener estadísticas de tareas
export const getEstadisticas = async (req, res) => {
  try {
    const query = `
      SELECT 
        EstadoTarea,
        COUNT(*) as Cantidad,
        ROUND((COUNT(*) * 100.0 / (SELECT COUNT(*) FROM tareas)), 2) as Porcentaje
      FROM tareas
      GROUP BY EstadoTarea
    `;

    const [results] = await pool.query(query);

    res.status(200).json({
      success: true,
      data: {
        general: results,
      },
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener estadísticas de tareas",
      error: error.message,
    });
  }
};

// Función para obtener Top 5 empleados
export const getTopEmpleados = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.idPersona,
        CONCAT(p.Primer_Nombre, ' ', p.Primer_Apellido) as NombreEmpleado,
        r.NombreRol,
        COUNT(CASE WHEN t.EstadoTarea = 'Completada' THEN 1 END) as TareasCompletadas,
        COUNT(CASE WHEN t.EstadoTarea = 'Pendiente' THEN 1 END) as TareasPendientes,
        COUNT(CASE WHEN t.EstadoTarea = 'En Progreso' THEN 1 END) as TareasEnProgreso,
        COUNT(t.idTarea) as TotalTareas,
        ROUND(
          (COUNT(CASE WHEN t.EstadoTarea = 'Completada' THEN 1 END) * 10 +
           COUNT(CASE WHEN t.EstadoTarea = 'En Progreso' THEN 1 END) * 5 -
           COUNT(CASE WHEN t.EstadoTarea = 'Pendiente' AND t.FechaLimite < NOW() THEN 1 END) * 3) 
          / NULLIF(COUNT(t.idTarea), 0), 2
        ) as ScoreRendimiento
      FROM personas p
      INNER JOIN roles r ON p.Rol_FK = r.idRol
      LEFT JOIN tareas t ON p.idPersona = t.Persona_FK
      WHERE r.NombreRol IN ('Empleado', 'Administrador')
        AND p.EstadoPersona_FK = 1
      GROUP BY p.idPersona, p.Primer_Nombre, p.Primer_Apellido, r.NombreRol
      HAVING COUNT(t.idTarea) > 0
      ORDER BY ScoreRendimiento DESC
      LIMIT 5
    `;

    const [results] = await pool.query(query);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Error al obtener top empleados:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener el top de empleados",
      error: error.message,
    });
  }
};

// Función para obtener lista de empleados con sus tareas
export const getEmpleadosTareas = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.idPersona as ID,
        CONCAT(p.Primer_Nombre, ' ', p.Primer_Apellido) as Empleado,
        r.NombreRol as Rol,
        COUNT(CASE WHEN t.EstadoTarea = 'Completada' THEN 1 END) as TareasHechas,
        COUNT(CASE WHEN t.EstadoTarea IN ('Pendiente', 'En Progreso') THEN 1 END) as Pendientes,
        COUNT(t.idTarea) as TotalTareas
      FROM personas p
      INNER JOIN roles r ON p.Rol_FK = r.idRol
      LEFT JOIN tareas t ON p.idPersona = t.Persona_FK
      WHERE r.NombreRol = 'Empleado'
        AND p.EstadoPersona_FK = 1
      GROUP BY p.idPersona, p.Primer_Nombre, p.Primer_Apellido, r.NombreRol
      HAVING COUNT(t.idTarea) > 0
      ORDER BY TotalTareas DESC, TareasHechas DESC
    `;

    const [results] = await pool.query(query);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Error al obtener empleados y tareas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener la lista de empleados",
      error: error.message,
    });
  }
};

export const getTareasByEmpleado = async (req, res) => {
  try {
    await tareaModel.sync();
    const { id } = req.params;

    const tareas = await tareaModel.findAll({
      where: { Persona_FK: parseInt(id) }
    });

    // Ordenar manualmente en JavaScript
    const tareasOrdenadas = tareas.sort((a, b) => {
      // Definir prioridad de estados
      const estadoOrder = { 'Pendiente': 2, 'En Progreso': 1, 'Completada': 3 };
      const estadoA = estadoOrder[a.EstadoTarea] || 4;
      const estadoB = estadoOrder[b.EstadoTarea] || 4;
      
      // Si tienen diferente estado, ordenar por estado
      if (estadoA !== estadoB) {
        return estadoA - estadoB;
      }
      
      const fechaA = a.FechaLimite ? new Date(a.FechaLimite).getTime() : Infinity;
      const fechaB = b.FechaLimite ? new Date(b.FechaLimite).getTime() : Infinity;
      return fechaA - fechaB;
    });

    res.status(200).json({
      ok: true,
      status: 200,
      Message: "Tareas obtenidas correctamente",
      body: tareasOrdenadas,
    });
  } catch (error) {
    console.error("Error al obtener tareas del empleado:", error);
    return res.status(500).json({
      Message: "Algo salió mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

export const updateEstadoTarea = async (req, res) => {
  try {
    await tareaModel.sync();
    const { id } = req.params;
    const { EstadoTarea } = req.body;

    // Validar que el estado sea válido
    const estadosValidos = ['Pendiente', 'En Progreso', 'Completada'];
    if (!estadosValidos.includes(EstadoTarea)) {
      return res.status(400).json({
        Message: 'Estado no válido',
        estadosPermitidos: estadosValidos
      });
    }

    const [updated] = await tareaModel.update(
      { EstadoTarea },
      { where: { idTarea: id } }
    );

    if (!updated) {
      return res.status(404).json({ Message: 'Tarea no encontrada' });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      Message: 'Estado actualizado correctamente'
    });
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    return res.status(500).json({
      Message: 'Algo salió mal con la solicitud',
      status: 500,
      error: error.message
    });
  }
};