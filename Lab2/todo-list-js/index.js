const tasks = [];

function addTask() {
  const newTaskInput = document.getElementById('new-task');
  const newTask = newTaskInput.value;
  if (newTask.trim() !== '') {
    const task = { task: newTask, completed: false };
    tasks.push(task);
    const taskIndex = tasks.length - 1;

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const taskNameElement = document.createElement('span');
    taskNameElement.innerText = newTask;

    // Кнопка удаления ❌
    const deleteButton = document.createElement('button');
    deleteButton.innerText = '❌';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function (e) {
      e.stopPropagation();
      tasks.splice(taskIndex, 1);
      listItem.remove();
    };

    // Кнопка редактирования ✏
    const editButton = document.createElement('button');
    editButton.innerText = '✏';
    editButton.className = 'edit-btn';
    editButton.onclick = function (e) {
      e.stopPropagation();
      const newName = prompt('Введите новое название задачи:', task.task);
      if (newName && newName.trim() !== '') {
        task.task = newName;
        taskNameElement.innerText = newName;
      }
    };

    // Клик по задаче – завершение
    listItem.addEventListener('click', function () {
      task.completed = !task.completed;
      listItem.classList.toggle('completed');
    });

    listItem.appendChild(taskNameElement);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    document.getElementById('todo-list').appendChild(listItem);
    newTaskInput.value = '';
  }
}

document.getElementById('add-button').onclick = addTask;
