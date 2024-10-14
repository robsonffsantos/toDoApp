const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('new-task');
const todoList = document.getElementById('todo-list');
let draggingElement = null;

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
  li.draggable = true;
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

  li.querySelector('.complete-btn').addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
  });

  li.querySelector('.edit-btn').addEventListener('click', () => {
    const newTaskText = prompt("Edite a tarefa:", taskText);
    if (newTaskText && newTaskText.length <= 50) {
      li.querySelector('span').innerText = newTaskText.trim();
    } else if (newTaskText.length > 50) {
      alert("O nome da tarefa deve ter no máximo 50 caracteres.");
    }
  });

  li.querySelector('.add-subtask-btn').addEventListener('click', () => {
    const subtaskText = prompt("Subtarefa:");
    if (subtaskText) {
      const subtaskLi = document.createElement('li');
      subtaskLi.className = 'subtask';
      subtaskLi.innerHTML = `
        <span>${subtaskText.trim()}</span>
        <div class="button-group">
          <button class="complete-subtask-btn">✔️</button>
          <button class="edit-subtask-btn">✏️</button>
          <button class="delete-subtask-btn">🗑️</button>
        </div>
      `;
      
      subtaskLi.querySelector('.complete-subtask-btn').addEventListener('click', () => {
        subtaskLi.classList.toggle('completed');
      });
      
      subtaskLi.querySelector('.edit-subtask-btn').addEventListener('click', () => {
        const newSubtaskText = prompt("Edite a subtarefa:", subtaskText);
        if (newSubtaskText) {
          subtaskLi.querySelector('span').innerText = newSubtaskText.trim();
        }
      });

      subtaskLi.querySelector('.delete-subtask-btn').addEventListener('click', () => {
        subtaskLi.remove();
      });

      li.querySelector('.subtask-container').appendChild(subtaskLi);
    }
  });

  li.addEventListener('dragstart', (e) => {
    draggingElement = li;
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => li.classList.add('dragging'), 0);
  });

  li.addEventListener('dragend', () => {
    draggingElement = null;
    li.classList.remove('dragging');
  });

  li.addEventListener('dragover', (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(todoList, event.clientY);
    if (afterElement == null) {
      todoList.appendChild(li);
    } else {
      todoList.insertBefore(li, afterElement);
    }
  });

  todoList.appendChild(li);
  todoInput.value = "";
}

function getDragAfterElement(list, y) {
  const listElements = [...list.querySelectorAll('li:not(.dragging)')];
  return listElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

todoForm.addEventListener('submit', addTodo);
