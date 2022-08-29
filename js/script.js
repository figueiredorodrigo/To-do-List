const todos = document.querySelectorAll('.todo');
const all_status = document.querySelectorAll('.status');
let draggableTodo = null;
let num = 1;


todos.forEach((todo) => {
    todo.addEventListener('dragstart', dragStart);
    todo.addEventListener('dragend', dragEnd);
    
});

function dragStart() {
    draggableTodo = this;
    setTimeout(() => {
        this.style.display = "none";
    }, 0);
}

function dragEnd() {
    draggableTodo = null;
    setTimeout(() => {
        this.style.display = "block";
    }, 0);
}

all_status.forEach((status) => {
    status.addEventListener('dragover', dragOver);
    status.addEventListener('dragenter', dragEnter);
    status.addEventListener('dragleave', dragLeave);
    status.addEventListener('drop', dragDrop);
});

function dragOver(e) {
    e.preventDefault();
}

function dragEnter() {
    this.style.border = "1px dashed #ccc";
    
}

function dragLeave() {
    this.style.border = "none"
    
}

function dragDrop() {
    this.style.border = "none"
    this.appendChild(draggableTodo);
    
}

/* modal */
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};

/* Create todo */

const todo_submit = document.getElementById('todo_submit');
const todo_input = document.getElementById('todo_input');

todo_submit.addEventListener('click', validation);

function validation() {
    if(todo_input.value.length > 0) {
        const input = document.getElementById('todo_input').value
        createTodo(input);
    } else {
        todo_input.classList.add('error');
        todo_input.placeholder = 'Write a list here';
        setTimeout(() => {
            todo_input.placeholder = '';
            todo_input.classList.remove('error');
          }, "1500");
    };
};

function createTodo() {
    const todo_div = document.createElement('div');
    const input_val = document.getElementById('todo_input').value;
    const txt = document.createTextNode(input_val);
    todo_div.appendChild(txt);
    todo_div.classList.add("todo");
    todo_div.setAttribute('draggable', 'true');
    todo_div.setAttribute('data-indice', num);

    const span = document.createElement('span');
    const span_txt = document.createTextNode("\u00D7");
    span.classList.add("close");
    span.setAttribute('data-span', num)
    span.appendChild(span_txt);

    todo_div.appendChild(span);

    no_status.appendChild(todo_div);
    num++;

    span.addEventListener('click', () => {
        handleDeleteClick(todo_div, span)
    });

    todo_div.addEventListener('dragstart', dragStart);
    todo_div.addEventListener('dragend', dragEnd);
    
    document.getElementById('todo_input').value = '';
    
    todo_form.classList.remove('active');
    overlay.classList.remove('active');
    
    updateLocalStorage();
}
const handleDeleteClick = (todo_div, span) => {
    if(todo_div.dataset.indice == span.dataset.span) {
        todo_div.remove()
        updateLocalStorage();
    }
};

const updateLocalStorage = () => {
    const container = document.querySelector('.todo-container');
    const tasks = container.childNodes[1];

    const localStorageTasks = [tasks].map((task) => {
        const content = task.lastChild;
        return { description: content.innerText.slice(0, -1) }
    
    });
// .innerText.slice(0, -1);
  
    console.log({ localStorageTasks})
};