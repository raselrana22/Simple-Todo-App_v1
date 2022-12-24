/* 
We make this code to MVC
M: Model, whitch contain all the code about save and manage the data
V: View, Whitch is contaill all the code of manage and view. Render visual using this model
C: Controller, The controller section connect the model and view section also
    Responds to event from the view
*/

/*This is the Model section */

let todos;

// Retre the todo list data 
const savedTodos = JSON.parse(localStorage.getItem("todos"));

// If the local storage have the todo array then use it
// otherswise the use the default array
if (Array.isArray(savedTodos)) {
    todos = savedTodos;
} else {
    todos = [
        // todo default list array
        { title: 'Shoping', dueDate: '2022-12-20', id: 'id1' },
        { title: 'Ruuning', dueDate: '2022-12-19', id: 'id2' },
        { title: 'Meeting', dueDate: '2022-12-21', id: 'id3' }];
}

render();  // Render first time

function createTodo(title, dueDate) {
    // Create todo 
    const id = ''+ new Date().getTime();   // Conver the id number to string by adding + ''
    todos.push(
    {title: title, dueDate: dueDate, id: id}
    );
    saveTodos();  // Save local store to the updated list
}


function removeTodo(idToDelete) {
    // Remove todo
    todos = todos.filter(function (todo) {
        // If the id of todo is match with the isTodoDelete then retuirn false
        // For everything else return true 
        if (todo.id === idToDelete) {
            return false;
        }
        else {
            return true;
        }
    });
    saveTodos();  // Save local store to the updated list
}


function saveTodos() {
     // save the string data to the local storage, Local storage can't access without string
     localStorage.setItem("todos", JSON.stringify(todos));
}

/*  End of the Model section */



/* Start of the control section */ 
function addTodo() {
    // Add new list to the todo list
    const textbox = document.getElementById('todo-title');
    const title = textbox.value;
    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;
    
    createTodo(title, dueDate); // Create todo 
    render();  // Render the all list 
}


function deleteTodo(event) {
    // Delete the list from todo 
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    removeTodo(idToDelete); // Remove todo 
    render();  // Render again after the delete todo 
}
/* Endof the control section */



/* End of the View section */

function render() {
    // Render function which do display the page

    // reset our todo list or page
    document.getElementById('todo-list').innerHTML = '';

    // take list from arry and create the display element
    todos.forEach(
        function (todo) {
            // Element create
            const element = document.createElement('div');
            element.innerText = todo.title + ' ' + todo.dueDate;
            
            // Create a detele button
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'delete';
            deleteButton.style = 'margin-left: 12px;'
            deleteButton.onclick = deleteTodo;
            deleteButton.id = todo.id;

            // Display the elemenet 
            element.appendChild(deleteButton);
            const todolist = document.getElementById('todo-list'); 
            todolist.appendChild(element);
        }
    )
}
/* End of the View section */
