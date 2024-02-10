// Get the necessary elements from the HTML
const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const list = document.querySelector('.todo-list');

// Function to add a new task to the list
function addTask(task) {
  const newTask = document.createElement('li');
  newTask.className = 'todo-item';

  // Create and append the task text
  const taskText = document.createElement('span');
  taskText.className = 'todo-text';
  taskText.innerText = task;
  newTask.appendChild(taskText);

  // Create and append the delete button
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  newTask.appendChild(deleteButton);

  // Add event listener to delete button
  deleteButton.addEventListener('click', () => {
    newTask.remove();
    saveTasks();
  });

  list.appendChild(newTask);
  saveTasks();
}

// Function to save the tasks to local storage
function saveTasks() {
  const taskArray = Array.from(list.children).map(task => task.querySelector('.todo-text').innerText);
  localStorage.setItem('tasks', JSON.stringify(taskArray));
}

// Function to load the tasks from local storage
function loadTasks() {
  const taskArray = JSON.parse(localStorage.getItem('tasks')) || [];
  taskArray.forEach(task => addTask(task));
}

// Event listener for the form submit event
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    addTask(input.value.trim());
    input.value = '';
  }
});

// Load tasks from local storage when the page loads
loadTasks();
