function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function generateRandomTask() {
    return {
      text: `Texto aleatorio número ${getRandomInt(1, 1000)}`,
      isCompleted: getRandomInt(0, 1) === 1,
      isFav: getRandomInt(0, 1) === 1
    };
  }
  
  function getRandomArray() {
    const randomTasks = [];
    for (let i = 0; i < 10; i++) {
      randomTasks.push(generateRandomTask());
    }
    return randomTasks;
  }

  
  // Estas funciones serán las que iremos cambiando con los ejemplos
  function regenerateArray() {
    const tasks = getRandomArray();
    document.querySelector('#tasks').innerHTML = '';
    
    tasks.forEach((task) => {
      createTaskNode(task, true);
    });
  }
  
function createTaskNode(task, addToEnd) {
  const taskNode = document.createElement('div');
  taskNode.className = 'task';
  taskNode.innerHTML = `
    <span class="${task.isCompleted ? 'completed' : ''}">${task.text}</span> -
    <span class="status">${task.isCompleted ? 'completed' : 'pending'}</span>
    <button class="${task.isFav ? 'fav' : ''} like_btn" style="display:none">${task.isFav ? '💝' : '💔'}</button>`;

  const tasksNode = document.querySelector('#tasks');

  if(addToEnd) {
    tasksNode.appendChild(taskNode);
  } else {
    tasksNode.prepend(taskNode);
  }

  taskNode.addEventListener('click', function () {
    console.log('hola', task.text);
  });

  taskNode.addEventListener('click', () => {
    const taskTextNode = taskNode.querySelector('span');
    const isCompleted = taskTextNode.classList.contains('completed');
    taskTextNode.classList.toggle('completed');
    taskNode.querySelector('.status').innerText = isCompleted ? 'pending' : 'completed';
  });

  taskNode.querySelector('button').addEventListener('click', (event) => {  // even para parar el evento del listener
    const buttonSelected = taskNode.querySelector('button');
    const isFav = buttonSelected.classList.contains('fav');
    event.stopPropagation();    // para parar el evento del listener
    buttonSelected.classList.toggle('fav');
    buttonSelected.innerText = isFav ? '💝' : '💔';
  });
  
  const icon = taskNode.querySelector('.like_btn');

  taskNode.addEventListener('mouseover', () => {
    icon.style.display = '';
  });

  taskNode.addEventListener('mouseout', () => {
    icon.style.display = 'none';
  });
  
 

}

  function addTask(addToEnd) {
    const task = generateRandomTask();
    createTaskNode(task, addToEnd);  
  };

  // function addLast() {
  //   const task = generateRandomTask();
  //       const taskHtml = `<div class="task">
  //         <span class="${task.isCompleted ? 'completed' : ''}">${task.text}</span> -
  //         <span class="status">${task.isCompleted ? 'completed' : 'pending'}</span>
  //       </div>`
  //       document.querySelector('#tasks').innerHTML =  document.querySelector('#tasks').innerHTML + taskHtml;
  // }
  
  // event listeners para que los botones llamen a las funciones anteriores
  document.querySelector('#regenate').addEventListener('click', () => {
    regenerateArray();
  });
  
  document.querySelector('#add-first').addEventListener('click', () => {
    addTask(false);
  });
  
  document.querySelector('#add-last').addEventListener('click', () => {
    addTask(true);
  });

document.querySelector('#create-task').addEventListener('submit', (event) => {
  console.log(event);
  event.preventDefault();

  const formData = new FormData(event.target);
  const taskText = formData.get('taskText');
  const task = {
    text: taskText,
    isFav: false,
    isCompleted: false
  };
});
 
const button = document.querySelector('#state')
const input = document.querySelector('#ruperto')
document.querySelector(['name=taskText']).addEventListener('input', () => {
  
  if (input.length > 0) {
    button.disabled = true;
  } button.disabled = false;
});
  