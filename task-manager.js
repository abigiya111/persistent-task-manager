let tasks = [];
let currentFilter = "all";
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const showAllBtn = document.querySelector("#showAllBtn");
const showActiveBtn = document.querySelector("#showActiveBtn");
const showDoneBtn = document.querySelector("#showDoneBtn");
const taskList = document.querySelector("#taskList");
const counter = document.querySelector("#counter");
const clearDoneBtn = document.querySelector("#clearDoneBtn");

function loadTasks() {
const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
    tasks = JSON.parse(savedTasks);

} else {
    tasks = [];

}
}
function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
    let filteredTasks = tasks; 
    if (currentFilter === "active") 
        { 
            filteredTasks = tasks.filter(task => !task.completed); 

        } 
    else if (currentFilter === "done")
    { 
        filteredTasks = tasks.filter(task => task.completed); 

    }
taskList.innerHTML = filteredTasks.map(task => 
    { return ` 
        <li class="task-item ${task.completed ? "completed" : ""}"> 
           <span class="task-text"> ${task.text} </span> 
         <div class="task-actions">
           <button class="toggle-btn" data-id="${task.id}" > ${task.completed ? "Undo" : "Done"} </button>
           <button class="delete-btn" data-id="${task.id}" > Delete </button>
         </div> 
        </li> `; 
    }).join("");

    const total = tasks.length;

    const active = tasks.filter(
    task => !task.completed
).length;

counter.textContent = `${active} active / ${total} total`;
saveTasks();

}
function addTask() {
const text = taskInput.value.trim();

if (text === "") {

    return;

}

const newTask = {
id: Date.now(),
text: text,
completed: false

};
tasks.push(newTask);
taskInput.value = "";
taskInput.focus();
render();

}
function toggleTask(id) {
tasks = tasks.map(task => {

    if (task.id === id) {

        return {
            ...task,
            completed: !task.completed
        };

    }
   return task;

});
render();

}

function clearDone() {
tasks = tasks.filter(task => !task.completed);
render();

}
addBtn.addEventListener("click", () => {
addTask();
});

taskInput.addEventListener("keydown", (event) => {
if (event.key === "Enter") {

    addTask();
}
});

showAllBtn.addEventListener("click", () => {
currentFilter = "all";
updateFilterButtons();
render();

});

showActiveBtn.addEventListener("click", () => {
currentFilter = "active";
updateFilterButtons();
render();

});

showDoneBtn.addEventListener("click", () => {
currentFilter = "done";
updateFilterButtons();
render();

});

function updateFilterButtons() {

showAllBtn.classList.remove("active-filter");
showActiveBtn.classList.remove("active-filter");
showDoneBtn.classList.remove("active-filter");

if (currentFilter === "all") {
    showAllBtn.classList.add("active-filter");
}
else if (currentFilter === "active") {
    showActiveBtn.classList.add("active-filter");
}
else if (currentFilter === "done") {
    showDoneBtn.classList.add("active-filter");
}
}

taskList.addEventListener("click", (event) => {

const button = event.target;
const id = Number(button.dataset.id);

if (button.classList.contains("toggle-btn")) {
    toggleTask(id);
}
if (button.classList.contains("delete-btn")) {

    deleteTask(id);
}

});

clearDoneBtn.addEventListener("click", () => {
clearDone();
});

loadTasks();
updateFilterButtons();
render();
