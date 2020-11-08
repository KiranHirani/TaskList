//Define UI variables 
const form = document.querySelector('form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners 
loadEventListeners();

function loadEventListeners() {

    //DOM Load Event 
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event 
    form.addEventListener('submit', addTask);
    //Remove task event 
    taskList.addEventListener('click', removeTask);
    //Clear tasks 
    clearBtn.addEventListener('click', clearTasks);
    //Filter Tasks Event 
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from localStorage 
function getTasks(event) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        //Create li element when a task is added 
        let li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append to li 
        li.appendChild(document.createTextNode(task));
        
        //Create new link element 
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content'
        //Add icon html 
        link.innerHTML = '<i class="fa fa-remove"></i>'
        li.appendChild(link);

        //Append the li to the ul
        taskList.appendChild(li);
    })
}

function addTask(event) {
    if (taskInput.value === '') {
        alert("Add a task");
    }

    //Create li element when a task is added 
    let li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and append to li 
    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link element 
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'
    //Add icon html 
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link);

    //Append the li to the ul
    taskList.appendChild(li);

    //Store in LS 
    storeTaskInLocalStorage(li.textContent);

    //Clear Input
    taskInput.value = '';

    event.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //Local storage can only store strings so we are gonna parse it as JSON 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(event) {
    let a = event.target.parentElement;
    if (a.classList.contains('delete-item')) {
        if (confirm('Are you sure you want to delete this item?')) {
            a.parentElement.remove(); //To remove the li element
            //Remove from LS 
            removeTaskFromLocalStorage(a.parentElement);
        }
    }

}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //Local storage can only store strings so we are gonna parse it as JSON 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks() {
    if (taskList.innerHTML === '') {
        alert('Its empty')
    }
    //Faster 
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild); //remove the li of the task list 
    }
    clearTasksFromLocalStorage();
}


function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block'; //That means it should show
        } else {
            task.style.display = 'none';
        }
    });
}

