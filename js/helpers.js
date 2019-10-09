import {tasks} from "./data.js";


export const generateTasks = () => {
    //make sure all the tasks are unique.
    let distinctTasks;
    for (let i = 0; i < tasks.length; i++) {
        //shuffled will swap the order each time and give me something new
        const shuffledTasks = tasks.sort(() => .5- Math.random());
        let randomFive = shuffledTasks.slice(0, 5);
        distinctTasks = [...new Set(randomFive)];
    }
   let str = '<ul>';
    distinctTasks.forEach((task,index) => {
        str+= `<li> ${task.description} <span id="task-${index}" data-finished=false data-eta=${task.eta}  class="dot"></span> </li>`
    });
    str += '</ul>';

    return str;
};


