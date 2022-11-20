export const storage = {
       getTodos(defaultTodosList = []) {
              const todos = localStorage.getItem("tasks");

              return todos ? JSON.parse(todos) : defaultTodosList;
       },
       setTodos(todos) {
              localStorage.setItem("tasks", JSON.stringify(todos));
       },
       setTheme(theme) {
              localStorage.setItem("theme", theme);
       },
       setFilteringTasks(todos) {
              sessionStorage.setItem("filteringTasks", JSON.stringify(todos));
       }
};