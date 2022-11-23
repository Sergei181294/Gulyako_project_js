export const todos = {
       tasks: [],
       setTodos(todos) {
              this.tasks = todos;
       },

       addNewTask(taskName, taskDescription, completed, important) {
              const newTask = {
                     id: Math.random(),
                     taskName,
                     taskDescription,
                     completed,
                     important,
              }
              this.tasks.push(newTask);
       },
       removeTask(taskId) {
              this.tasks = this.tasks.filter(task => task.id !== taskId);
       },
}

