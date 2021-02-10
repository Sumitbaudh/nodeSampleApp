module.exports = function (app) {
    var todoList = require('../controllers/controllers');

    // todoList Routes
    app.route('/tasks')
        .get(todoList.listAllTask)
        .post(todoList.addTask);


    app.route('/tasks/:taskId')
        //.get(todoList.read_a_task)
        .put(todoList.markTaskComplete)
    //.delete(todoList.delete_a_task); 
    app.route('/tasks/delete/:taskId')
        .put(todoList.markTaskDeleted)
};
