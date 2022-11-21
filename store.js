export const todos = {
       tasks: [],
       setTodos(todos) {
              this.tasks = todos;
       },

       anotherTask(taskName, describeTask, completed, importance) {
              const newTask = {
                     id: Math.random(),
                     taskName,
                     describeTask,
                     completed,
                     importance,
              }
              this.tasks.push(newTask);
       },
       removeTask(taskId) {
              this.tasks = this.tasks.filter(task => task.id !== taskId);
              localStorage.setItem("tasks", JSON.stringify(this.tasks));

       },
}
let todosFromStorage = localStorage.getItem('tasks')

if (todosFromStorage !== null) {
       todosFromStorage = JSON.parse(todosFromStorage)
       todos.setTodos(todosFromStorage)
}
