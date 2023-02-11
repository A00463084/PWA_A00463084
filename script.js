
async function registerServiceWorker() {
    // Register service worker
    if ('serviceWorker' in navigator) { // checking if the browser supports service workers
        window.addEventListener('load', function () { // when app loads, fire callback
            navigator.serviceWorker.register('/sw.js').then(function () { // register sw
                console.log('ServiceWorker registration successful');  // registration was successful
            }, function (err) {
                console.log('ServiceWorker registration failed', err); // registration failed
            });
        });
    }
}

async function main() {
    const form = document.querySelector('form');
    const task_name = document.querySelector("[name='rname']");
    const task_date = document.querySelector("[name='dd']");
    const task_assigned = document.querySelector("[name='asname']");
    const todoList = document.getElementById('todo');

    
    // const existingStudents = JSON.parse(localStorage.getItem('students')) || [];

    //const existingreminders = await getAllRemindersFromDB()

    const todoData = [];

    DisplayRecords()


    /*

    if (existingreminders) {
        existingreminders.forEach(todo => {
            addReminder(todo.rname,todo.dd,todo.asname);
        });
    }
    */

    async function DisplayRecords()
    {

        const existingreminders = await getAllRemindersFromDB()

        todoList.innerHTML= "";

        if (existingreminders) {
            existingreminders.forEach(todo => {
                
                const div = document.createElement('div')
                div.classList.add('todo')
                const h1 = document.createElement('h1')
                h1.innerHTML = "Id : "+ todo.id;
                const h2 = document.createElement('h2')
                h2.innerHTML = "Task Name : "+ todo.rname;
                const h3 = document.createElement('h3')
                h3.innerHTML = "Due Date : "+ todo.dd;
                const p = document.createElement('p')
                p.innerHTML = "Assigned : "+ todo.asname;

                div.appendChild(h1)
                div.appendChild(h2)
                div.appendChild(h3)
                div.appendChild(p)
                todoList.appendChild(div)
            });
        }

    }
    
    function addReminder(rname,dd,asname) {

        todoData.push({rname,dd,asname});

        localStorage.setItem('todo', JSON.stringify(todoData));
        addReminderToDB(rname,dd,asname)

        DisplayRecords()

        /*

        if (existingreminders) {
            existingreminders.forEach(todo => {
                //addReminder(todo.rname,todo.dd,todo.asname);
                const div = document.createElement('div')
                div.classList.add('todo')
                const h1 = document.createElement('h1')
                h1.innerHTML = todo.id;
                const h2 = document.createElement('h2')
                h2.innerHTML = todo.rname;
                const h3 = document.createElement('h3')
                h3.innerHTML = todo.dd;
                const p = document.createElement('p')
                p.innerHTML = todo.asname;

                div.appendChild(h1)
                div.appendChild(h2)
                div.appendChild(h3)
                div.appendChild(p)
                todoList.appendChild(div)
            });
        }

        */

        /*
        const div = document.createElement('div')
        div.classList.add('todo')
        const h1 = document.createElement('h1')
        h1.innerHTML = rname;
        const h2 = document.createElement('h2')
        h2.innerHTML = dd;
        const p = document.createElement('p')
        p.innerHTML = asname;

        //todoData.push({rname,dd,asname});

        div.appendChild(h1)
        div.appendChild(h2)
        div.appendChild(p)
        todoList.appendChild(div)

        */

        //localStorage.setItem('todo', JSON.stringify(todoData));
        //addReminderToDB(rname,dd,asname)
        task_name.value = ''
        task_date.value = ''
        task_assigned.value = ''

    }

    

    // Events
    form.onsubmit = (event) => {
        event.preventDefault();
        addReminder(task_name.value,task_date.value,task_assigned.value);
    }
}

registerServiceWorker()
main()