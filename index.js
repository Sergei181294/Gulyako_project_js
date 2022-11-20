import { todos } from "./store.js";
import { storage } from "./service.js";



const body = document.querySelector("body");
body.setAttribute("data-theme", "dark");
const header = document.createElement("header");

const sectionAddTask = document.createElement("section");
sectionAddTask.classList.add("box");
const h1 = document.createElement("h1");
h1.textContent = "Todo List 2022"





const form = document.createElement("form");
form.setAttribute("method", "get");
form.classList.add('form');
form.innerHTML = `
<label>
<input   class="new-task-input" id="first-input" type="text" name="nameTask" placeholder="Write about your task">
</label>
<label>
<input class="new-task-input" id="second-input" type="text" name="description" placeholder="Describe your task">
</label>
<button class="new-task-submit" type="submit">Add task</button>
`;

const formMode = document.createElement("form");
formMode.setAttribute("method", "get");
formMode.innerHTML = `
<div class="themeDecor">
<p class="nameTheme">Light Mode</p>
<label class="switch">
<input type="checkbox" class="switch_input">
<span id="changeTheme" class="switch_slider"></span>
</label> 
</div>
`


const formSearch = document.createElement("form");
formSearch.classList.add("formSearch");

formSearch.setAttribute("method", "get");
formSearch.innerHTML = `
<label>
<input type="search" class="inputSearch" placeholder="Search here...">
</label>
`
const divModeAndFiltering = document.createElement("div");
const buttonCompleted = document.createElement("button");
buttonCompleted.classList.add("btn-compl");
buttonCompleted.textContent = "Show completed tasks"
const buttonImportant = document.createElement("button");
buttonImportant.classList.add("btn-imp");
buttonImportant.textContent = "Show important tasks"
const buttonAllTasks = document.createElement("button");
buttonAllTasks.classList.add("btn-all");
buttonAllTasks.textContent = "Show all tasks"


divModeAndFiltering.append(formMode, buttonCompleted, buttonImportant, buttonAllTasks);
divModeAndFiltering.classList.add("modeAndFiltering")

header.append(divModeAndFiltering, formSearch);

const main = document.createElement("main");
const divContent = document.createElement("div");
main.append(divContent);
const h2 = document.createElement("h2");
main.prepend(h2);
h2.textContent = "Tasks";

body.append(header, sectionAddTask, main);
sectionAddTask.append(h1, form);





const todosTemplate = {
       renderToDo() {
              divContent.innerHTML = null;
              if (todos.tasks.length === 0) {
                     const h3 = document.createElement("h3");
                     h3.classList.add('empty-color');
                     h3.textContent = "The list is empty";
                     return divContent.append(h3);
              }





              const ul = document.createElement("ul");
              ul.classList.add("taskContainer");
              divContent.append(ul);
              console.log(todos.tasks)
              todos.tasks.forEach((task) => {
                     const checked = task.completed ? "checked" : "";
                     const checked_2 = task.importance ? "checked" : "";
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
                                   <div class="descriptionTask">
                                   <input type="text" data-description-id="${task.id}" class="descriptionName" value="${task.describeTask}" readonly>
                                   </div>
                                   </div>
                            <div class="block">
                                   <div class="completedTask">
                                   <input type="checkbox"  ${checked} class="completed" data-complete-id="${task.id}">
                                   <p class="${task.completed ? "check-on" : "check-off"}">Completed</p>
                                   </div>
                                   </div>
                            <div class="block">
                                   <div class="importantTask">
                                   <input type="checkbox" ${checked_2} class="important" data-importance-id="${task.id}">
                                   <p  class="${task.importance ? "checkOn-importance" : "checkOff-importance"}">Importance</p>
                                   </div>
                                   </div>
                                   </div>
                                                                
                            </li>
                            `;
              });
       },




       addRemoveTaskHandler() {
              divContent.addEventListener("click", (e) => {
                     const taskId = e.target.getAttribute("data-remove-id");
                     if (taskId) {
                            todos.removeTask(Number(taskId));
                            this.renderToDo();
                     }
              })

       },



       addTask() {
              let task = {
                     completed: false,
                     importance: false,
              };
              form.addEventListener("click", (e) => {
                     e.preventDefault();
                     if (e.target.type === "submit") {
                            const first_input = document.getElementById("first-input");
                            const second_input = document.getElementById("second-input");
                            if (first_input.value.length === 0) {
                                   alert("Write about your task")
                            } else {
                                   task[first_input.name] = first_input.value;
                                   task[second_input.name] = second_input.value;
                                   todos.anotherTask(task.nameTask, task.description, task.completed, task.importance);
                                   this.renderToDo();
                                   form.reset();
                                   storage.setTodos(todos.tasks);
                            }
                     }

              })

       },

       searchTask() {
              formSearch.addEventListener("input", (e) => {
                     if (e.target.value === "") {
                            todos.tasks = JSON.parse(localStorage.getItem("tasks"));
                     }
                     todos.tasks = JSON.parse(localStorage.getItem("tasks"));
                     todos.tasks = todos.tasks.filter(task => task.taskName.includes(e.target.value) === true);
                     this.renderToDo();
              })
       },

       changeTheme() {
              let theme = document.getElementById("changeTheme");
              theme.addEventListener("click", () => {
                     const themeName = document.body.getAttribute("data-theme");
                     if (themeName !== "dark") {
                            document.body.setAttribute("data-theme", "dark");
                            storage.setTheme("dark")
                     } else {
                            document.body.setAttribute("data-theme", "light")
                            storage.setTheme("light")
                     }
              });
       },

       changeCompleted(id) {
              const todo = todos.tasks.find((todo) => todo.id === id)
              if (todo && todo.completed === false) {
                     todo.completed = true;
                     storage.setTodos(todos.tasks)
              } else if (todo && todo.completed === true) {
                     todo.completed = false;
                     storage.setTodos(todos.tasks)
              }
       },

       addChangeComplitedHandler() {
              divContent.addEventListener("click", (e) => {
                     const checkboxId = e.target.getAttribute("data-complete-id")
                     if (checkboxId) {
                            this.changeCompleted(Number(checkboxId));
                            this.renderToDo();
                     }
              })
       },

       changeImportance(id) {
              const task = todos.tasks.find((todo) => todo.id === id)
              if (task && task.importance === false) {
                     task.importance = true;
                     storage.setTodos(todos.tasks)
              } else if (task && task.importance === true) {
                     task.importance = false;
                     storage.setTodos(todos.tasks)
              }
       },
       addChangeImportanceHandler() {
              divContent.addEventListener("click", (e) => {
                     const importanceId = e.target.getAttribute("data-importance-id")
                     if (importanceId) {
                            console.log("hello")
                            this.changeImportance(Number(importanceId));
                            this.renderToDo();
                     }
              })
       },
       filteringTasks() {
              buttonCompleted.addEventListener("click", (e) => {
                     e.preventDefault();
                     todos.tasks = storage.getTodos().filter(task => task.completed === true);
                     storage.setFilteringTasks(todos.tasks)
                     this.renderToDo();
              })
              buttonImportant.addEventListener("click", (e) => {
                     e.preventDefault();
                     todos.tasks = storage.getTodos().filter(task => task.importance === true);
                     storage.setFilteringTasks(todos.tasks)
                     this.renderToDo();
              })
              buttonAllTasks.addEventListener("click", (e) => {
                     e.preventDefault();
                     todos.tasks = storage.getTodos();
                     storage.setFilteringTasks(todos.tasks)
                     this.renderToDo();
              })
       },

       addEditHandler() {

              divContent.addEventListener("click", (e) => {
                     const editId = e.target.getAttribute("data-edit-id")
                     const todo = todos.tasks.find(todo => todo.id == editId)
                     const inputTaskName = document.querySelector(`[data-taskName-id = "${editId}"]`)
                     const inputDescription = document.querySelector(`[data-description-id = "${editId}"]`)
                     if(e.target.innerText.toLowerCase() === "edit"){
                            inputTaskName.removeAttribute("readonly")
                            inputDescription.removeAttribute("readonly")
                            e.target.innerText = "Save"
                            inputTaskName.focus();       
                     } else if (e.target.innerText.toLowerCase() === "save"){
                            inputTaskName.setAttribute("readonly","readonly")
                            inputDescription.setAttribute("readonly","readonly")
                            e.target.innerText = "Edit"
                            console.log(inputTaskName)
                            todo.taskName = inputTaskName.value
                            todo.describeTask = inputDescription.value
                            storage.setTodos(todos.tasks)
                     }
                    
                     
              })
       },


       init() {
              this.renderToDo();
              this.addRemoveTaskHandler();
              this.addTask();
              this.searchTask();
              this.changeTheme();
              this.addChangeComplitedHandler();
              this.addChangeImportanceHandler();
              this.filteringTasks();
              this.addEditHandler();
       },

}

todosTemplate.init();


