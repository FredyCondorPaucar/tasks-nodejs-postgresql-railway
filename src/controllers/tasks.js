const pool = require('../db');

const createTasks = async (req, res, next) => {
    try {
        // Optener datos del body
        const { title, description } = req.body;
        // Verificar si llega los datos del body
        if (!title || !description) {
            return res.status(400).json({
                status: "error",
                message: "Debe llenar el titulo y la descripcion de la tarea"
            })
        }

        // Verificar si ya existe una tarea con el mismo título
        const existingTask = await pool.query('SELECT * FROM task WHERE title = $1', [title]);
        if (existingTask.rows.length > 0) {
            return res.status(400).json({
                status: "error",
                message: "Ya existe una tarea con ese título"
            });
        }

        // Insertar los datos en db de POSTGRESQL
        let result = await pool.query('INSERT INTO task (title, description) VALUES($1, $2) RETURNING *', [
            title,
            description
        ]);

        const createTask = result.rows[0];

        if (!createTask) {
            return res.status(400).json({
                status: "error",
                message: "Ocurrio un error al crear la tarea"
            })
        }
        // Devolver resultado
        return res.status(200).json({
            status: "success",
            message: "Se guardo la tarea correctamente!",
            createTask: createTask
        })
    } catch (error) {
        next(error);
    }

}

const listTasks = async (req, res, next) => {
    try {
        const tasks = await pool.query('SELECT * FROM task');

        if (tasks.rows.length <= 0) {
            return res.status(400).json({
                status: "error",
                message: "No existe datos a mostrar"
            })
        }

        const listData = tasks.rows;

        return res.status(200).json({
            status: "success",
            message: "Se genero la lista de Tareas correctamente!",
            tasks: listData

        })
    } catch (error) {
        next(error);
    }
}

const task = async (req, res, next) => {
    try {
        // Recoger el parametro del url
        const id = req.params.id;

        // Consultar en la bd

        const task = await pool.query('SELECT * FROM task WHERE id=$1', [id]);

        if (!task.rows[0]) {
            return res.status(400).json({
                status: "error",
                message: "No se encontro la tarea con el ID ingresado"
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Se genero la tarea!",
            task: task.rows[0]
        })
    } catch (error) {
        next(error);
    }
}

const updateTasks = async (req, res, next) => {
    try {
        // Recoger el Id del parametro de la url
        let params = req.params;

        // Recoger los datos del body
        const body = req.body;

        // Verificar si me llegan los datos completos del body
        if (!body.title || !body.description) {
            return res.status(400).json({
                status: "error",
                message: "El titulo y la descripcion de la tarea no debe estar vacio"
            })
        }

        // Validar si hay algun cambio con el titulo de la tarea 
        const taskUpdate = await pool.query('SELECT * FROM task WHERE id =$1', [params.id]);

        const existingTask = await pool.query('SELECT * FROM task WHERE title = $1', [body.title]);

        // Si hubiera cambio, validar si ya existe un titulo igual
        if (taskUpdate.rows[0].title !== body.title && existingTask.rows.length > 0) {
            return res.status(400).json({
                status: "error",
                message: "Ya existe una tarea con ese título"
            });
        }

        // Actualizar en la base de datos
        const resultUpdate = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *', [
            body.title,
            body.description,
            params.id
        ]);

        if (resultUpdate.rows.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "No se pudo actualizar la tarea, intente nuevamente"
            });
        }

        // Devolver respuesta    
        return res.status(200).json({
            status: "success",
            message: "Se actualizó correctamente la tarea!",
            task: resultUpdate.rows[0]
        })
    } catch (error) {
        next(error);
    }
}

const deleteTasks = async(req, res, next) => {
    try {
        // Obtener el id de la tarea desde los parámetros de la URL
        const { id } = req.params;

        // Verificar que el id exista
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Debe proporcionar un ID de tarea válido"
            });
        }

        // Eliminar la tarea en la base de datos
        const resultDelete = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id]);

        // Verificar si se eliminó alguna tarea
        if (resultDelete.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No se encontró la tarea para eliminar"
            });
        }

        // Devolver respuesta de éxito
        return res.status(200).json({
            status: "success",
            message: "Se eliminó correctamente la tarea!",
            task: resultDelete.rows[0] // Opción: Devolver la tarea eliminada
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createTasks,
    listTasks,
    task,
    updateTasks,
    deleteTasks
};