import { todos } from "./store.js";
import { storage } from "./service.js";

(function () {
       const form = document.querySelector(".form");
       const formSearch = document.querySelector(".formSearch");
       const buttonCompleted = document.querySelector(".btnCompl");
       const buttonImportant = document.querySelector(".btnImp");
       const buttonAllTasks = document.querySelector(".btnAll");
       const divContent = document.querySelector(".divContent");
       const buttonAddTask = document.querySelector(".newTaskSubmit");
       const theme = document.getElementById("changeTheme");


       function renderToDo() {
              divContent.innerHTML = null;
              if (todos.tasks.length === 0) {
                     const h3 = document.createElement("h3");
                     h3.classList.add('empty-color');
                     h3.textContent = "The list is empty";
                     return divContent.append(h3);
              }

              const ul = document.createElement("ul");
              ul.classList.add("tasksContainer");
              divContent.append(ul);

              todos.tasks.forEach((task) => {
                     ul.innerHTML += `
                            <li class="${task.importance ? "list-importance" : "list"}">
                                   <div>
                                          <div class="block">
                                                 <div class="titleTask">
                                                        <input type="text" data-taskName-id="${task.id}" class="taskName" value="${task.taskName}" readonly>
                                                 </div>
                                                 <div class="btn-block">
                                                        <button class="btn-edit" data-edit-id="${task.id}">Edit</button>
                                                        <button class="btn-remove" type="button" data-remove-id='${task.id}'>Remove</button>
                                                  </div>
                                          </div>
                                          <div class="block">
                                                 <div>
                                                        <input type="text" data-description-id="${task.id}" class="descriptionName" value="${task.taskDescription}" readonly>
                                                 </div>
                                          </div>
                                          <div class="block">
                                                 <div class="completedTask">
                                                        <input type="checkbox" ${task.completed ? "checked" : ""} class="completed" data-complete-id="${task.id}">
                                                        <p class="${task.completed ? "check-on" : "check-off"}">Completed</p>
                                                 </div>
                                          </div>
                                          <div class="block">
                                                 <div class="importantTask">
                                                        <input type="checkbox" ${task.importance ? "checked" : ""} class="important" data-importance-id="${task.id}">
                                                        <p  class="${task.importance ? "checkOn-importance" : "checkOff-importance"}">Importance</p>
                                                 </div>
                                          </div>
                                   </div>
                                                                
                            </li>
                            `;
              });
       }







       function removeTaskHandler(e) {
              const taskId = e.target.getAttribute("data-remove-id");
              if (taskId) {
                     todos.removeTask(Number(taskId));
                     storage.setTodos(todos.tasks);
                     renderToDo();
              }
       }


       function addTaskHandler(e) {
              let task = {
                     completed: false,
                     important: false,
              };
              e.preventDefault();
              const inputTaskName = document.getElementById("addTaskName");
              const inputTaskDescription = document.getElementById("addDescriptionTask");
              if (inputTaskName.value.length === 0) {
                     alert("Write about your task")
              } else {
                     task[inputTaskName.name] = inputTaskName.value;
                     task[inputTaskDescription] = inputTaskDescription.value;
                     todos.addNewTask(task.nameTask, task.description, task.completed, task.important);
                     renderToDo();
                     form.reset();
                     storage.setTodos(todos.tasks);
              }
       }


       function searchTaskHandler(e) {
              if (e.target.value === "") {
                     todos.tasks = JSON.parse(localStorage.getItem("tasks"));
                     storage.setSearchTask(todos.tasks)
              }
              todos.tasks = JSON.parse(localStorage.getItem("tasks"));
              todos.tasks = todos.tasks.filter(task => task.taskName.includes(e.target.value) === true);
              storage.setSearchTask(todos.tasks)
              renderToDo();
       }




       function changeThemeHandler() {
              const themeName = document.body.getAttribute("data-theme");
              if (themeName !== "dark") {
                     document.body.setAttribute("data-theme", "dark");
                     storage.setTheme("dark")
              } else {
                     document.body.setAttribute("data-theme", "light")
                     storage.setTheme("light")
              }
       }

       function changeComplitedHandler(e) {
              const checkboxId = e.target.getAttribute("data-complete-id")
              if (checkboxId) {
                     const todo = todos.tasks.find((todo) => todo.id === +checkboxId)
                     if (todo) {
                            todo.completed = !todo.completed
                     }
                     storage.setTodos(todos.tasks)
                     renderToDo();
              }
       }


       function changeImportanceHandler(e) {
              const importanceId = e.target.getAttribute("data-importance-id")
              if (importanceId) {
                     const task = todos.tasks.find((todo) => todo.id === +importanceId)
                     if (task) {
                            task.importance = !task.importance
                     }
                     storage.setTodos(todos.tasks)
                     renderToDo();
              }
       }



       function filteringTasksHandler(e) {
              e.preventDefault();
              if (e.target.innerText === "Show completed tasks") {
                     console.log("hello")
                     todos.tasks = storage.getTodos().filter(task => task.completed === true);
                     storage.setFilteringTasks(todos.tasks)
                     renderToDo();
              } else if (e.target.innerText === "Show important tasks") {
                     e.preventDefault();
                     todos.tasks = storage.getTodos().filter(task => task.importance === true);
                     storage.setFilteringTasks(todos.tasks)
                     renderToDo();
              } else {
                     e.preventDefault();
                     todos.tasks = storage.getTodos();
                     storage.setFilteringTasks(todos.tasks)
                     renderToDo();
              }
       }


       function editHandler(e) {
              const editId = e.target.getAttribute("data-edit-id")
              const todo = todos.tasks.find(todo => todo.id == editId)
              const inputTaskName = document.querySelector(`[data-taskName-id = "${editId}"]`)
              const inputDescription = document.querySelector(`[data-description-id = "${editId}"]`)
              if (e.target.innerText.toLowerCase() === "edit") {
                     inputTaskName.removeAttribute("readonly")
                     inputDescription.removeAttribute("readonly")
                     e.target.innerText = "Save"
                     inputTaskName.focus();
              } else if (e.target.innerText.toLowerCase() === "save") {
                     inputTaskName.setAttribute("readonly", "readonly")
                     inputDescription.setAttribute("readonly", "readonly")
                     e.target.innerText = "Edit"
                     todo.taskName = inputTaskName.value
                     todo.taskDescription = inputDescription.value
                     storage.setTodos(todos.tasks)
              }
       }



       function init() {
              let todosFromStorage = storage.getTodos()
              todos.setTodos(todosFromStorage)

              divContent.addEventListener("click", (e) => removeTaskHandler(e))
              buttonAddTask.addEventListener("click", (e) => addTaskHandler(e))
              formSearch.addEventListener("input", (e) => searchTaskHandler(e))
              theme.addEventListener("click", changeThemeHandler)
              divContent.addEventListener("click", (e) => changeComplitedHandler(e))
              divContent.addEventListener("click", (e) => changeImportanceHandler(e))
              buttonCompleted.addEventListener("click", (e) => filteringTasksHandler(e))
              buttonImportant.addEventListener("click", (e) => filteringTasksHandler(e))
              buttonAllTasks.addEventListener("click", (e) => filteringTasksHandler(e))
              divContent.addEventListener("click", (e) => editHandler(e))

              renderToDo();
       }
       init();

}())




