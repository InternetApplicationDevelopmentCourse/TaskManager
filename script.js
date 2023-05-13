function inputValidation() {
  const input_value = document.querySelector(
    ".add-task-container .add-task-input"
  ).value;
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
