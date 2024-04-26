const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const priority = priorityInput.value;
    const deadline = formatDate(deadlineInput.value); // Format the deadline date
    if (task.trim() === "" || deadline === "") {
        alert("Please enter a task and select a deadline.");
        return; // Don't add task if task or deadline is empty
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
        alert("Please select an upcoming date for the deadline.");
        return; // Don't add task if deadline is not in the future
    }

    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.innerHTML = `
        <p>${task}</p>
        <p>Priority: ${priority}</p>
        <p>Deadline: ${deadline}</p>
        <button class="mark-done">Mark Done</button>
    `;

    if (priority === "top") {
        // Insert top priority tasks at the beginning of the task list
        taskList.prepend(taskItem);
    } else {
        // Insert less priority tasks at the end of the task list
        taskList.appendChild(taskItem);
    }

    taskInput.value = "";
    priorityInput.value = "top";
    deadlineInput.value = "";
});

function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Month is zero-based
    const year = dateObject.getFullYear();

    // Pad single-digit day and month with leading zero if necessary
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
}

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement;
        if (event.target.textContent === "Mark Done") {
            taskItem.style.backgroundColor = "#f2f2f2";
            event.target.textContent = "Mark Undone";
        } else {
            taskItem.style.backgroundColor = ""; // Reset background color
            event.target.textContent = "Mark Done";
        }
    }
});
