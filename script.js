function inputValidation(input_value) {
  const error_msg = document.querySelector(".error-msg");
  if (input_value == "") {
    error_msg.querySelector("p").innerText = "Error: you didn't enter a task";
    error_msg.classList.add("active");
    return false;
  } else if (input_value.length > 30) {
    error_msg.querySelector("p").innerText =
      "Error: task is too long (max 30 characters)";
    error_msg.classList.add("active");
    return false;
  } else {
    error_msg.classList.remove("active");
    return true;
  }
}

function updateSummary() {
  const numOfTasks = document.getElementsByClassName("task").length;
  document.getElementById("total-tasks").innerHTML = numOfTasks;
  const numOfCompletedTasks = document.getElementsByClassName("checked").length;
  document.getElementById("completed-tasks").innerHTML = numOfCompletedTasks;
  const numOfUncompletedTasks = numOfTasks - numOfCompletedTasks;
  document.getElementById("uncompleted-tasks").innerHTML = numOfUncompletedTasks;
}

//move task up
function onMoveUp(element) {
    const task = element.parentElement.parentElement;
    const prevTask = task.previousElementSibling;
    if(prevTask){
        task.parentElement.insertBefore(task, prevTask);
    }
}

function onMoveDown(element) {
    const task = element.parentElement.parentElement;
    const nextTask = task.nextElementSibling;
    if(nextTask){
        task.parentElement.insertBefore(nextTask, task);
    }
}
function addTask(){
    const newTask_text = document.querySelector(".add-task-container .add-task-input").value;
    if (inputValidation(newTask_text)) {
        const newTask = document.createElement("li");
        newTask.classList.add("task");
        newTask.innerHTML = `<button class="task-check-btn" onclick='onChecked(this)'></button>
        <p class="task-text">${newTask_text}</p>
        <div class="btns">
          <button class="delete-btn" onclick='onDelete(this)'>DELETE</button>
          <button class="up-btn move-task-btn" onclick='onMoveUp(this)'></button>
          <button class="down-btn move-task-btn" onclick='onMoveDown(this)'></button>
        </div>`
        document.querySelector("ul.tasks").appendChild(newTask);
        document.querySelector(".add-task-container .add-task-input").value = "";
        updateSummary();
    }
}

function onChecked(element){
    element.parentElement.classList.toggle("checked");
    updateSummary();
}

function onDelete(element){
    element.parentElement.parentElement.remove();
    updateSummary();
}
