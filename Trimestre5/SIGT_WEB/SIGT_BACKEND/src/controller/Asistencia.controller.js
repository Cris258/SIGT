import asistenciaModel from "../models/Asistencia.model.js";

export const createAsistencia = async (req, res) => {
    try {
        await asistenciaModel.sync();
        const dataAsistencia = req.body;
        const { id, rol } = req.user;
        if (rol === "Empleado" && parseInt(dataAsistencia.Persona_FK) !== id) {
            return res.status(403).json({
                ok: false,
                status: 403,
                Message: "No puedes registrar asistencia para otra persona.",
            });
        }

        const createAsistencia = await asistenciaModel.create({
            Fecha: dataAsistencia.Fecha,
            Hora_Entrada: dataAsistencia.Hora_Entrada,
            Hora_Salida: dataAsistencia.Hora_Salida,
            Incapacidad: dataAsistencia.Incapacidad,
            Persona_FK: parseInt(dataAsistencia.Persona_FK),
        });

        res.status(201).json({
            ok: true,
            status: 201,
            Message: "Asistencia creada correctamente",
            id: createAsistencia.idAsistencia,
        });
    } catch (error) {
        return res.status(500).json({
            Message: "Algo salió mal con la solicitud",
            status: 500,
            error: error.message,
        });
    }
};

export const showAsistencia = async (req, res) => {
    try {
        await asistenciaModel.sync();
        const showAsistencia = await asistenciaModel.findAll();
        res.status(201).json(
            {
                ok: true,
                status: 201,
                Message: "Ver Asistencia",
                body: showAsistencia
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                Message: "Algo salio mal con la solicitud",
                status: 500,
                error: error.message
            }
        );
    }
};

export const showIdAsistencia = async (req, res) => {
    try {
        await asistenciaModel.sync();
        const idAsistencia = req.params.id;
        const showIdAsistencia = await asistenciaModel.findOne(
            {
                where: {
                    idAsistencia: idAsistencia
                }
            }
        );
        res.status(200).json(
            {
                ok: true,
                status: 201,
                Message: "Ver Asistencia por id",
                body: showIdAsistencia,
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                Message: "Algo salio mal con la solicitud",
                status: 500,
                error: error.message
            }
        );
    }
};

export const updateAsistencia = async (req, res) => {
    try {
        await asistenciaModel.sync();
        const dataAsistencia = req.body;
        const idAsistencia = req.params.id;
        const updateAsistencia = await asistenciaModel.update(
            {
                Fecha: dataAsistencia.Fecha,
                Hora_Entrada: dataAsistencia.Hora_Entrada,
                Hora_Salida: dataAsistencia.Hora_Salida,
                Incapacidad: dataAsistencia.Incapacidad,
                Persona_FK: parseInt(dataAsistencia.Persona_FK),
            },
            {
                where: {
                    idAsistencia: idAsistencia
                }
            }
        );
        res.status(200).json(
            {
                ok: true,
                status: 201,
                Message: "Asistencia Actualizada",
                body: updateAsistencia,
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                Message: "Algo salio mal con la solicitud",
                status: 500,
                error: error.message
            }
        );
    }
};

export const deleteAsistencia = async (req, res) => {
    try {
        await asistenciaModel.sync();
        const idAsistencia = req.params.id;
        const deleteAsistencia = await asistenciaModel.destroy(
            {
                where: {
                    idAsistencia: idAsistencia
                }
            }
        );
        res.status(200).json(
            {
                ok: true,
                status: 201,
                Message: "Asistencia Eliminada",
                body: deleteAsistencia,
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                Message: "Algo salio mal con la solicitud",
                status: 500,
                error: error.message
            }
        );
    }
};