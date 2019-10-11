import {generateTasks} from "./helpers.js";
import {tasks} from "./data.js";
/*
This file will include DOM manipulation using jquery
 */

const handleDeleteRobot = (e) => {
    e.preventDefault();
    let current = e.target.parentNode.parentNode;
    current.remove();

};
//creating a wait time
const sleep = (s) => {
    return new Promise(resolve => setTimeout(resolve,s));
};

const taskTimeHandler = async (e) => {
    e.preventDefault();
    let task = e.target.parentNode;
    //first, we'll grab the eta for each of the tasks using the data attribute
    let eta  = e.target.getAttribute('data-eta');
    let current = e.target;
    //makes the spinner show up i.e. shows that the task is in progress.
    $(current).replaceWith('<i id="spinner" class="fas fa-spinner fa-spin"></i>');
   await sleep(eta)
       //after this is comleted then this will run
       .then(() => {
           $('#spinner').remove();
           $(task).append('<span class="icon has-text-success"> <i class="fas fa-check-square"></i> </span>')
       })
};

const handleSubmitForm = (e) => {
    const nameInput = $('#name-input').val();
    const typeInput = $('#select-type').val();
    //checks if the nameinput is valid/exists
    if (nameInput) {
        let html =
            `<div class = "column is-4">
                <div id ="robot-card" class= "card" style="height: 100%;">
                    <div class="card-content is-centered">
                        <h1 id ="robot-title" class="title is-size-4 ">${nameInput} the ${typeInput}</h1>
                        
                        <div id="task-container">
                            ${generateTasks()}
                        </div>
                    </div>
                    <footer class="card-footer">
                    <button id="delete-btn" class="button is-danger is-small" type="button"> Delete robot </button>
                    </footer>
                </div>
            </div>`;
        $('.columns').append(html);

    } else {
        //will give the user an alert that the name cannot be done!
        alert('please give it a name :(')
    }
    e.preventDefault();
};

//handler for the clear button that clears all the robots in the DOM
$('#clear').on('click', (e) => {
    if (window.confirm("Are you sure you want to get rid of them?")) {
        $('.columns').empty()
    } else {
        return;
    }
    e.preventDefault();
});

//handler for submit button to create a robot card with the given fields
$(':submit').on('click', handleSubmitForm);

// some event delegation handler that will delete the robot card.
$('.columns').on('click', '#delete-btn', handleDeleteRobot);

//hander for icon clicks using event delegation
$('.columns').on('click', 'a', taskTimeHandler);






