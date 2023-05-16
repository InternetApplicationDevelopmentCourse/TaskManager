function inputValidation(input_value) {
  const error_msg = document.querySelector(".error-msg");
  if (input_value == "") {
    error_msg.querySelector("p").innerText = "Error: you didn't enter title for the task";
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
  document.getElementById("uncompleted-tasks").innerHTML =
    numOfUncompletedTasks;
}

function onMoveUp(element) {
  const task = element.parentElement.parentElement;
  const prevTask = task.previousElementSibling;
  if (prevTask && isChecked(prevTask) == isChecked(task)) {
    task.classList.add("scale-0");
    setTimeout(() => {
      task.parentElement.insertBefore(task, prevTask);
    }, 300);
    setTimeout(() => {
      task.classList.remove("scale-0");
    }, 400);
  }
}

function isChecked(element) {
  if(element.classList.contains("checked")){
    fireWorks(element);
    return true;
  }
  return false;
}

function onMoveDown(element) {
  const task = element.parentElement.parentElement;
  const nextTask = task.nextElementSibling;
  if (nextTask && isChecked(nextTask) == isChecked(task)) {
    task.classList.add("scale-0");
    setTimeout(() => {
      task.parentElement.insertBefore(nextTask, task);
    }, 300);
    setTimeout(() => {
      task.classList.remove("scale-0");
    }, 400);
  }
}

function onCheckedReposition(element) {
  if (isChecked(element.parentElement)) {
    const task = element.parentElement.parentElement;
    task.appendChild(element.parentElement);
  } else {
    const firstCheckedLi = document.querySelector(".checked");
    element.parentElement.parentElement.insertBefore(
      element.parentElement,
      firstCheckedLi
    );
  }
}

function addTask() {
  const newTask_text = document.querySelector(
    ".add-task-container .add-task-input"
  ).value;
  if (inputValidation(newTask_text)) {
    const newTask = document.createElement("li");
    newTask.classList.add("task");
    newTask.classList.add("scale-0");
    newTask.innerHTML = `<button class="task-check-btn" onclick='onChecked(this)'></button>
        <p class="task-text">${newTask_text}</p>
        <div class="btns">
          <button class="delete-btn" onclick='onDelete(this)'></button>
          <button class="up-btn move-task-btn" onclick='onMoveUp(this)'></button>
          <button class="down-btn move-task-btn" onclick='onMoveDown(this)'></button>
          <button class="edit-btn" onclick='editTaskTitle(this)'></button>
        </div>`;
    const ul = document.querySelector("ul.tasks");
    const firstCheckedLi = document.querySelector(".checked");
    if (firstCheckedLi == null) {
      ul.appendChild(newTask);
    } else {
      ul.insertBefore(newTask, firstCheckedLi);
    }
    setTimeout(() => {
      newTask.classList.remove("scale-0");
    }, 100);
    document.querySelector(".add-task-container .add-task-input").value = "";
    updateSummary();
    document.querySelector(".add-task-container .add-task-input").focus();
    const filter = document.querySelector(".summary .filter-active");
    const filterProp = filter.getAttribute("data_filter");
    if (filterProp == 1) {
      document.querySelector("#total-tasks-filter").click();
    }
    document.querySelector("#current-task-length").innerHTML =
      inputTask.value.length;
  }
}

function onChecked(element) {
  element.parentElement.classList.add("scale-0");
  setTimeout(() => {
    element.parentElement.classList.toggle("checked");
    onCheckedReposition(element);
    updateSummary();
  }, 300);
  setTimeout(() => {
    const filter = document.querySelector(".summary .filter-active");
    const filterProp = filter.getAttribute("data_filter");
    onFilter(filter, filterProp);
    element.parentElement.classList.remove("scale-0");
  }, 400);
}

function onDelete(element) {
  element.parentElement.parentElement.classList.add("scale-0");
  setTimeout(() => {
    element.parentElement.parentElement.remove();
    updateSummary();
  }, 300);
}

function onFilter(element, opt) {
  const filter = document.querySelector(".summary .filter-active");
  filter.classList.remove("filter-active");
  element.classList.add("filter-active");

  if (opt == 0) {
    // show all tasks
    const tasks = document.querySelectorAll(".task");
    tasks.forEach((task) => {
      task.classList.remove("hidden");
    });
  } else if (opt == 1) {
    // show completed tasks
    const tasks = document.querySelectorAll(".task");
    tasks.forEach((task) => {
      if (!task.classList.contains("checked")) {
        task.classList.add("hidden");
      } else {
        task.classList.remove("hidden");
      }
    });
  } else if (opt == 2) {
    // show uncompleted tasks
    const tasks = document.querySelectorAll(".task");
    tasks.forEach((task) => {
      if (task.classList.contains("checked")) {
        task.classList.add("hidden");
      } else {
        task.classList.remove("hidden");
      }
    });
  }
}

document
  .querySelector(".add-task-container .add-task-input")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.querySelector(".add-task-container .add-task-btn").click();
    }
  });

function handleChange(event) {
  const currentTaskLength = document.querySelector("#current-task-length");
  if (event.target.value.length > 30) {
    currentTaskLength.parentElement.classList.add("error");
  } else currentTaskLength.parentElement.classList.remove("error");

  currentTaskLength.innerHTML = event.target.value.length;
}

const inputTask = document.querySelector(".add-task-container .add-task-input");
inputTask.addEventListener("input", handleChange);
document.querySelector("#current-task-length").innerHTML =
  inputTask.value.length;

function fireWorks(element) {
  const particles = [];
  const color = randomColor();

  const particle = document.createElement("span");
  particle.classList.add("particle", "move");

  const { x, y } = randomLocation();
  particle.style.setProperty("--x", x);
  particle.style.setProperty("--y", y);
  particle.style.background = color;

  element.parentElement.parentElement.appendChild(particle);

  particles.push(particle);

  setTimeout(() => {
    for (let i = 0; i < 100; i++) {
      const innerP = document.createElement("span");
      innerP.classList.add("particle", "move");
      innerP.style.transform = `translate(${x}, ${y})`;
      const xs = Math.random() * 200 - 100 + "px";
      const ys = Math.random() * 200 - 100 + "px";
      innerP.style.setProperty("--x", `calc(${x} + ${xs})`);
      innerP.style.setProperty("--y", `calc(${y} + ${ys})`);
      innerP.style.animationDuration = Math.random() * 300 + 200 + "ms";
      innerP.style.background = color;
      element.parentElement.parentElement.appendChild(innerP);
      particles.push(innerP);
    }
    setTimeout(() => {
      particles.forEach((particle) => {
        particle.remove();
      });
    }, 1000);
  }, 1000);
}

function randomLocation() {
  return {
    x: Math.random() * window.innerWidth - window.innerWidth / 2 + "px",
    y: Math.random() * window.innerHeight - window.innerHeight / 2 + "px",
  };
}

function randomColor() {
  return `hsl(${Math.floor(Math.random() * 361)}, 100%, 50%)`;
}

function editTaskTitle(element){
  const taskText = element.parentElement.parentElement.querySelector(".task-text");
  const taskInput = document.querySelector(".add-task-input");
  if(inputValidation(taskInput.value)){
    taskText.innerHTML = taskInput.value;
    taskInput.value = "";
    taskInput.focus();
    document.querySelector("#current-task-length").innerHTML =
      inputTask.value.length;
  }
}