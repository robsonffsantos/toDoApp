const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('new-task');
const todoList = document.getElementById('todo-list');

function addTodo(event) {
  event.preventDefault();

  const taskText = todoInput.value.trim();

  if (taskText === "") {
    alert("Por favor, insira uma tarefa.");
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="complete-btn">✔️</button>
      <button class="delete-btn">🗑️</button>
    </div>
  `;

  li.querySelector('.complete-btn').addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
  });

  todoList.appendChild(li);

  todoInput.value = "";
}

todoForm.addEventListener('submit', addTodo);
