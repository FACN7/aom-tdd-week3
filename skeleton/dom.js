// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function () {
  // This is the dom node where we will keep our todo
  var container = document.getElementById("todo-container");
  var addTodoForm = document.getElementById("add-todo");

  var state = []; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function (todo) {
    /* retrive the current date*/
    var currentdate = new Date();
    var datetime = +currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear();

    /* end*/

    var todoNode = document.createElement("li");
    todoNode.className = "list-group-item d-flex justify-content-between";
    var spanId = document.createElement("span");
    spanId.innerHTML = datetime;
    spanId.className = "todoColumn";

    todoNode.appendChild(spanId);
    console.log(spanId);

    // you will need to use addEventListener

    // add span holding description

    var spanDescription = document.createElement("span");
    var iconTag = document.createElement("i");
    iconTag.className = "fa fa-edit todoColumn";
    spanDescription.innerHTML = todo.description;
    spanDescription.className = "toColumnDescription";

    todoNode.appendChild(spanDescription);

    // this adds the delete button
    var deleteButtonNode = document.createElement("i");
    deleteButtonNode.innerHTML = '<i class="fa fa-remove"></i>';
    deleteButtonNode.className = "text-danger todoColumn";
    deleteButtonNode.addEventListener("click", function (event) {
      if (confirm("Are you sure?")) {
        var newState = todoFunctions.deleteTodo(state, todo.id);
        update(newState);
      }
    });
    //todoNode.appendChild(deleteButtonNode);

    // add markTodo button
    var markButtonNode = document.createElement("input");
    markButtonNode.type = "checkbox";
    todoNode.appendChild(iconTag);
    todoNode.appendChild(markButtonNode);
    todoNode.appendChild(deleteButtonNode);

    iconTag.addEventListener("click", function () {
      if (iconTag.className !== "far fa-edit x") {
        spanDescription.contentEditable = false;
        iconTag.className = "far fa-edit x";
      } else {
        iconTag.className = "far fa-edit iconColor";
        spanDescription.contentEditable = true;
      }
    });
    if (todo.done) {
      markButtonNode.checked = true;
      spanDescription.className = "removeDescription";
    } else {
      markButtonNode.checked = false;
    }

    markButtonNode.addEventListener("click", function (event) {

      if (markButtonNode.checked)
        spanDescription.className = "removeDescription";
      else spanDescription.className = "toColumnDescription";
      state = todoFunctions.markTodo(state, todo.id);
    });


    // add classes for css
    if (markButtonNode.checked) {
      spanDescription.className = "removeDescription";
    }

    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?

      var description = event.target[0].value; // event.target ....
      event.target[0].value = "";

      // hint: todoFunctions.addTodo
      var newState = todoFunctions.addTodo(state, {
        description
      });
      if (description.length > 0) {
        newState = todoFunctions.sortTodos(newState);
        update(newState);
      }
    });
  }

  // you should not need to change this function
  var update = function (newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function (state) {
    var todoListNode = document.createElement("ul");
    todoListNode.className = "list-group";

    state.forEach(function (todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();