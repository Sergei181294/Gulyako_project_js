import { todos } from "./store.js";



const body = document.querySelector("body");
body.setAttribute("data-theme", "dark");
const header = document.createElement("header");
header.classList.add("box");
const h1 = document.createElement("h1");
h1.textContent = "Todo List 2022"





const form = document.createElement("form");
form.setAttribute("method", "get");
form.classList.add('form');
form.innerHTML = `
<label>
<input class="new-task-input" type="text" name="nameTask" placeholder="Write about your task">
</label>
<label>
<input class="new-task-input" type="text" name="description" placeholder="Describe your task">
</label>
<button class="new-task-submit" type="submit">Add task</button>
`;

const formMode = document.createElement("form");
formMode.setAttribute("method", "get");
formMode.innerHTML = `
<button type="button" class="dark-theme">Dark Mode</button>
<button type="button" class="light-theme">Light Mode</button>
`

const formSearch = document.createElement("form");
formSearch.setAttribute("method", "get");
formSearch.innerHTML = `
<label>
<input type="search" class="inputSearch" placeholder="Искать здесь...">
<label>
`

const main = document.createElement("main");
const divContent = document.createElement("div");
main.append(divContent);
const h2 = document.createElement("h2");
main.prepend(h2);
h2.textContent = "Tasks";

body.append(formMode, formSearch, header, main);
header.append(h1, form);


const todosTemplate = {
       renderToDo() {
              divContent.innerHTML = null;
              if (todos.tasks.length === 0) {
                     const h3 = document.createElement("h3");
                     h3.classList.add('color-primary');
                     h3.textContent = "Список пуст";
                     return divContent.append(h3);
              }

              const ul = document.createElement("ul");
              ul.classList.add("taskContainer");
              divContent.append(ul);

              todos.tasks.forEach((task) => {
                     ul.innerHTML += `
                            <li class="list">
                            <div>
                            <div class="block">
                                   <div class="titleTask">
                                   <input type="text" class="taskName" value="${task.taskName}" readonly>
                                   </div>
                                   <div class="btn-block">
                                   <button class="btn-edit edit-btn-one">Edit</button>
                                   <button class="btn-remove" type="button" data-task-id='${task.id}'>Remove</button>
                                   </div>
                                   </div>
                            <div class="block">
                                   <div class="descriptionTask">
                                   <input type="text" class="descriptionName" value="${task.describeTask}" readonly>
                                   </div>
                                   </div>
                            <div class="block">
                                   <div class="completedTask">
                                   <input type="text" class="completed" value="completed: ${task.complited}" readonly>
                                   </div>
                                   </div>
                            <div class="block">
                                   <div class="importantTask">
                                   <input type="text" class="important" value="important: ${task.important}" readonly>
                                   </div>
                                   </div>
                                   </div>
                                                                
                            </li>
                            `;
              });
              // this.edit();
       },


       removeTask() {
              divContent.addEventListener("click", (e) => {
                     const taskId = e.target.getAttribute("data-task-id");
                     if (taskId) {
                            todos.removeTask(Number(taskId));
                            this.renderToDo();
                     }
              })

       },



       addTask() {
              let task = {
                     complited: false,
                     important: false,
              };
              form.addEventListener("input", (e) => {
                     task[e.target.name] = e.target.value;
                     localStorage.setItem("tasks", JSON.stringify(task));
              })
              form.addEventListener("click", (e) => {
                     e.preventDefault();
                     if (e.target.type === "submit") {
                            let mytask = JSON.parse(localStorage.getItem("tasks"));
                            todos.anotherTask(mytask.nameTask, mytask.description, mytask.complited, mytask.important);
                            todosTemplate.renderToDo();
                            form.reset();
                            localStorage.setItem("tasks", JSON.stringify(todos.tasks));
                     }

              })

       },

       searchTask() {
              formSearch.addEventListener("input", (e) => {
                     todos.tasks = todos.tasks.filter(task => task.taskName.includes(e.target.value) === true);
                     todosTemplate.renderToDo();
                     todos.tasks = JSON.parse(localStorage.getItem("tasks"));
              })
       },

       changeTheme() {
              let dark = document.querySelector(".dark-theme")
              dark.addEventListener("click", (e) => {
                     e.preventDefault();
                     const themeName = document.body.getAttribute("data-theme");
                     if (themeName !== "dark") {
                            document.body.setAttribute("data-theme", "dark")
                     }
              });

              let light = document.querySelector(".light-theme");
              light.addEventListener("click", (e) => {
                     e.preventDefault();
                     const themeName = document.body.getAttribute("data-theme");
                     if (themeName !== "light") {
                            document.body.setAttribute("data-theme", "light")
                     }
              });
       },

       // edit() {
       //        const editTaskName = document.querySelector(".edit-btn-one");
       //        const inputTaskName = document.querySelector(".taskName");
       //        const inputDescription = document.querySelector(".descriptionName");
       //        const ul = document.querySelector("ul");

       //        ul.addEventListener("click", (e) => {
       //               e.preventDefault();
       //               if(editTaskName.innerText.toLowerCase() === "edit") {
       //                      inputTaskName.removeAttribute("readonly");
       //               inputDescription.removeAttribute("readonly");
       //               inputTaskName.focus();
       //               inputDescription.focus();
       //               editTaskName.innerText = "Save";
       //               } else {
       //                      inputTaskName.setAttribute("readonly", "readonly");
       //                      inputDescription.setAttribute("readonly", "readonly");
       //                      editTaskName.innerText = "Edit";
       //                  }
                     
       //        })
       // },

       init() {
              this.renderToDo();
              this.removeTask();
              this.addTask();
              this.searchTask();
              // this.changeTheme();
       },

}

todosTemplate.init();


