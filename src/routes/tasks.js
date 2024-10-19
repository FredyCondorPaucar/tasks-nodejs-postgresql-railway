const {Router} = require('express');
const tasksControllers = require('../controllers/tasks');

const router = Router();

router.post("/create", tasksControllers.createTasks);
router.get("/task/:id", tasksControllers.task);
router.get("/list", tasksControllers.listTasks);
router.put("/update/:id", tasksControllers.updateTasks);
router.delete("/delete/:id", tasksControllers.deleteTasks);


// Exportar router
module.exports = router;