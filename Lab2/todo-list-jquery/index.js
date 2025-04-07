const tasks = [];

function addTask() {
  const newTask = $('#new-task').val();
  if (newTask.trim() !== '') {
    const task = { text: newTask, completed: false };
    tasks.push(task);
    const taskIndex = tasks.length - 1;

    const listItem = $('<li class="todo-item"></li>');
    const taskText = $('<span class="task-text"></span>').text(newTask);
    const deleteBtn = $('<button class="delete-btn">❌</button>');
    const editBtn = $('<button class="edit-btn">✏</button>');

    // Смена состояния выполнено / не выполнено
    listItem.on('click', function () {
      task.completed = !task.completed;
      listItem.toggleClass('completed');
    });

    // Удаление задачи
    deleteBtn.on('click', function (e) {
      e.stopPropagation();
      tasks.splice(taskIndex, 1);
      listItem.remove();
    });

    // Редактирование задачи
    editBtn.on('click', function (e) {
      e.stopPropagation();
      const newText = prompt('Введите новое название задачи:', task.text);
      if (newText && newText.trim() !== '') {
        task.text = newText;
        taskText.text(newText);
      }
    });

    listItem.append(taskText, editBtn, deleteBtn);
    $('#todo-list').append(listItem);
    $('#new-task').val('');
  }
}

$('form').on('submit', function (e) {
  e.preventDefault();
  addTask();
});
