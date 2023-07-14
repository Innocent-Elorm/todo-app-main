//Dark Mode js codes
const body = document.querySelector('body');
const mode = document.querySelector('.mode');
const icon = document.querySelector('.mode-img')

function store(value){
  localStorage.setItem('darkmode', value);
}

function load() {
  const darkmode = localStorage.getItem('darkmode');

  if (!darkmode) {
    store(false);
    icon.classList.add('fa-moon');
  } else if (darkmode === 'true') {
    body.classList.add('darkmode');
    icon.classList.add('fa-sun');
  } else if (darkmode === 'false') {
    icon.classList.add('fa-moon');
  }
}
load()

mode.addEventListener('click', () => {
  body.classList.toggle('darkmode');
  store(body.classList.contains('darkmode'));

  if (body.classList.contains('darkmode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});

// To Do
const input = document.querySelector('#input');
const active = document.querySelector('#active');
const completed = document.querySelector('#completed');
const itemCount = document.querySelector('#item-count');
const clearBtn = document.querySelector('#clr-btn');

input.addEventListener('keyup', (e) => {
  (e.key === 'Enter' ? addList(e) : null);
});

function addList(e) {
  const newLi = document.createElement('li');

  if (input.value.trim() !== '') {
    newLi.textContent = input.value.trim();
    input.value = '';
    active.appendChild(newLi);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    newLi.appendChild(span);

    saveTask();
    updateItemCount();
  }
}

active.addEventListener('click', function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveTask();
    updateItemCount();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveTask();
    updateItemCount();
  }
}, false);

function saveTask() {
  localStorage.setItem('data', active.innerHTML);
}

function loadTask() {
  active.innerHTML = localStorage.getItem('data');
  updateItemCount();
}

function updateItemCount() {
  const activeTasks = active.querySelectorAll("li:not(.checked)");
  itemCount.textContent = `${activeTasks.length} item${activeTasks.length === 1 ? '' : 's'} left`;
}


function clearCompletedTasks() {
  const completedTasks = completed.querySelectorAll("li.checked");
  completedTasks.forEach(task => {
    task.remove();
  });

  saveTask();
  updateItemCount();
}

clearBtn.addEventListener('click', function () {
  clearCompletedTasks();
  saveTask();
  updateItemCount();
});

function filterTasks(type) {
  const tasks = active.querySelectorAll("li");

  if (type === "all") {
    tasks.forEach(task => {
      task.style.display = "block";
    });
  } else if (type === "active") {
    tasks.forEach(task => {
      if (task.classList.contains("checked")) {
        task.style.display = "none";
      } else {
        task.style.display = "block";
      }
    });
  } else if (type === "completed") {
    tasks.forEach(task => {
      if (task.classList.contains("checked")) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    });
  }
}

document.getElementById("all-btn").addEventListener("click", function () {
  filterTasks("all");
});

document.getElementById("active-btn").addEventListener("click", function () {
  filterTasks("active");
});

document.getElementById("com-btn").addEventListener("click", function () {
  filterTasks("completed");
});

loadTask();
updateItemCount();
filterTasks("all");
