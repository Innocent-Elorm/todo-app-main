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
    ButtonFocus();
  } else if (darkmode === 'true') {
    body.classList.add('darkmode');
    icon.classList.add('fa-sun');
    ButtonFocus();
  } else if (darkmode === 'false') {
    icon.classList.add('fa-moon');
    ButtonFocus();
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
  const checkboxContainer = document.createElement('label');
  checkboxContainer.classList.add('checkbox-container');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  const checkmark = document.createElement('span');
  checkmark.classList.add('checkmark');

  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(checkmark);
  newLi.appendChild(checkboxContainer);

  if (input.value.trim() !== '') {
    newLi.textContent = input.value.trim();
    input.value = '';

    newLi.draggable = true;

    active.appendChild(newLi);
    const deleteIcon = document.createElement('span');
    deleteIcon.innerHTML = '<i class="fas fa-times"></i>';
    deleteIcon.classList.add('delete-icon');
    newLi.appendChild(deleteIcon);

    saveTask();
    updateItemCount();
  }
}

active.addEventListener('click', function (e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
    e.target.parentElement.parentElement.classList.toggle('checked');
    saveTask();
    updateItemCount();
  }

  if (e.target.tagName === ("LI")) {
    e.target.classList.toggle("checked");
    saveTask();
    updateItemCount();
  } else if (e.target.tagName === "SPAN" && !e.target.classList.contains("delete-icon")) {
    e.target.parentElement.classList.toggle("checked");
    saveTask();
    updateItemCount();
  } else if (e.target.tagName === "SPAN" && e.target.classList.contains("delete-icon")) {
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
  const completedTasks = active.querySelectorAll("li.checked");

  completedTasks.forEach(task => {
    task.remove();
  });

  saveTask();
  updateItemCount();
}

clearBtn.addEventListener('click', function () {
  clearCompletedTasks();
});


function filterTasks(type) {
  const tasks = active.querySelectorAll('li');

  if (type === 'all') {
    tasks.forEach(task => {
      task.style.display = 'block';
    });
  } else if (type === 'active') {
    tasks.forEach(task => {
      if (task.classList.contains('checked')) {
        task.style.display = 'none';
      } else {
        task.style.display = 'block';
      }
    });
  } else if (type === 'completed') {
    tasks.forEach(task => {
      if (task.classList.contains('checked')) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
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


let dragItem = null;

active.addEventListener('dragstart', function (e) {
  dragItem = e.target;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', dragItem.innerHTML);
  dragItem.classList.add('dragging');
});

active.addEventListener('dragover', function (e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  const afterElement = getDragAfterElement(active, e.clientY);
  const draggable = document.querySelector('.dragging');
  if (afterElement == null) {
    active.appendChild(draggable);
  } else {
    active.insertBefore(draggable, afterElement);
  }
});

active.addEventListener('dragend', function (e) {
  dragItem.classList.remove('dragging');
  saveTask();
});


function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function ButtonFocus() {
  document.getElementById("all-btn").focus();
}

let focusedElement = null;

const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(button => {
  button.addEventListener("focus", function(event) {
    focusedElement = event.target;
  });
});

document.addEventListener("click", function(event) {
  if (focusedElement && event.target !== focusedElement) {
    focusedElement.focus();
  }
});
