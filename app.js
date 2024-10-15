const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('new-task');
const todoList = document.getElementById('todo-list');

function addTodo(event) {
  event.preventDefault();

  let taskText = todoInput.value.trim();

  if (taskText === "") {
    alert("Por favor, insira uma tarefa.");
    return;
  }

  if (taskText.length > 50) {
    alert("O nome da tarefa deve ter no máximo 50 caracteres.");
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <div class="button-group">
      <button class="complete-btn">✔️</button>
      <button class="edit-btn">✏️</button>
      <button class="delete-btn">🗑️</button>
      <button class="add-subtask-btn">➕ Subtarefa</button>
    </div>
    <ul class="subtask-container"></ul> <!-- Contêiner de subtarefas -->
  `;

  const completeBtn = li.querySelector('.complete-btn');
  const editBtn = li.querySelector('.edit-btn');
  const deleteBtn = li.querySelector('.delete-btn');
  const addSubtaskBtn = li.querySelector('.add-subtask-btn');

  function disableTaskButtons(taskLi) {
    const buttons = taskLi.querySelectorAll('.edit-btn, .delete-btn, .add-subtask-btn, .complete-btn');
    buttons.forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = '0.5';
    });
  }

  function enableTaskButtons(taskLi) {
    const buttons = taskLi.querySelectorAll('.edit-btn, .delete-btn, .add-subtask-btn, .complete-btn');
    buttons.forEach(btn => {
      btn.disabled = false;
      btn.style.opacity = '1';
    });
  }

  function markSubtasksComplete(taskLi) {
    const subtasks = taskLi.querySelectorAll('.subtask');
    subtasks.forEach(subtask => {
      subtask.classList.add('completed');
      disableTaskButtons(subtask);
    });
  }

  completeBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
    
    if (li.classList.contains('completed')) {
      disableTaskButtons(li);
      markSubtasksComplete(li);
      completeBtn.disabled = false;
      completeBtn.style.opacity = '1';
    } else {
      enableTaskButtons(li);
      li.querySelectorAll('.subtask').forEach(subtask => {
        subtask.classList.remove('completed');
        enableTaskButtons(subtask);
      });
    }
  });

  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  editBtn.addEventListener('click', () => {
    const newTaskText = prompt("Edite a tarefa:", taskText);
    if (newTaskText && newTaskText.length <= 50) {
      li.querySelector('span').innerText = newTaskText.trim();
    } else if (newTaskText.length > 50) {
      alert("O nome da tarefa deve ter no máximo 50 caracteres.");
    }
  });

  addSubtaskBtn.addEventListener('click', () => {
    const subtaskText = prompt("Subtarefa:");
    if (subtaskText) {
      const subtaskLi = document.createElement('li');
      subtaskLi.className = 'subtask';
      subtaskLi.innerHTML = `
        <span>${subtaskText.trim()}</span>
        <div class="button-group">
          <button class="complete-btn">✔️</button>
          <button class="edit-btn">✏️</button>
          <button class="delete-btn">🗑️</button>
        </div>
      `;

      const subCompleteBtn = subtaskLi.querySelector('.complete-btn');
      const subEditBtn = subtaskLi.querySelector('.edit-btn');
      const subDeleteBtn = subtaskLi.querySelector('.delete-btn');

      subCompleteBtn.addEventListener('click', () => {
        subtaskLi.classList.toggle('completed');
        if (subtaskLi.classList.contains('completed')) {
          disableTaskButtons(subtaskLi);
        } else {
          enableTaskButtons(subtaskLi);
        }
      });

      subDeleteBtn.addEventListener('click', () => {
        subtaskLi.remove();
      });

      subEditBtn.addEventListener('click', () => {
        const newSubtaskText = prompt("Edite a subtarefa:", subtaskText);
        if (newSubtaskText) {
          subtaskLi.querySelector('span').innerText = newSubtaskText.trim();
        }
      });

      li.querySelector('.subtask-container').appendChild(subtaskLi);
    }
  });

  todoList.appendChild(li);
  todoInput.value = "";
}

todoForm.addEventListener('submit', addTodo);
