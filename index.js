window.addEventListener("load", () => {
  allTodo = JSON.parse(localStorage.getItem("allTodo")) || [];
  const newTodoForm = document.querySelector("#new-todo-form");

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    allTodo.push(todo);

    localStorage.setItem("allTodo", JSON.stringify(allTodo));

    // Reset the form
    e.target.reset();

    DisplayAllTodo();
  });

  DisplayAllTodo();
});

function DisplayAllTodo() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  allTodo.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");
    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("allTodo", JSON.stringify(allTodo));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      DisplayAllTodo();
    });

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("allTodo", JSON.stringify(allTodo));
        DisplayAllTodo();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      allTodo = allTodo.filter((t) => t != todo);
      localStorage.setItem("allTodo", JSON.stringify(allTodo));
      DisplayAllTodo();
    });
  });
}
