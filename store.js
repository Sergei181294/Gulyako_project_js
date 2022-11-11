export const todos = {
       tasks: [],
       setTodos(todos){
              this.tasks = todos;
       },

       anotherTask(taskName, describeTask, complited, important) {
              const newTask = {
                     id: Math.random(), 
                     taskName,
                     describeTask,
                     complited,
                     important,
              }
              this.tasks.push(newTask);
       },
       removeTask(taskId){
              this.tasks = this.tasks.filter(task => task.id !== taskId);

       },
}
let todosFromStorage = localStorage.getItem('tasks') 

if (todosFromStorage !== null) {
  todosFromStorage = JSON.parse(todosFromStorage)
  todos.setTodos(todosFromStorage)
}