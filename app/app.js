document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const deadlineInput = document.getElementById('deadline');
    const priorityInput = document.getElementById('priority');

    addTaskButton.addEventListener('click', function() {
        const title = titleInput.value;
        const description = descriptionInput.value;
        const deadline = deadlineInput.value;
        const priority = priorityInput.value;

        if (title && description && deadline) {
            const task = document.createElement('li');
            task.innerHTML = `
            <div  style="width: 100%">
                <span  style=" font-size:3vh; padding:3vh; " >${title}</span>
                <span style=" font-size:3vh; padding:3vh; ">${description}</span>
                <span style=" font-size:3vh; padding:3vh; ">${deadline}</span>
                <span style=" font-size:3vh; padding:3vh; margin-right:50vh; ">${priority}</span>

                    <button  class="complete-task">Terminé</button>
                    <button class="edit-task">Modifier</button>
                    <button class="delete-task">Supprimer</button>
              
            </div>
            `;

            taskList.appendChild(task);

            titleInput.value = '';
            descriptionInput.value = '';
            deadlineInput.value = '';
            priorityInput.value = 'Faible';
        }
        saveTask(newTask);

    });

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('complete-task')) {
            const task = e.target.parentElement;
            task.classList.toggle('completed');
            saveTasks();

        }

        if (e.target.classList.contains('delete-task')) {
            const task = e.target.parentElement;
            taskList.removeChild(task);
            saveTasks();
            displayTasks();


        }

        if (e.target.classList.contains('edit-task')) {
            const task = e.target.parentElement;
            const titleSpan = task.querySelector('span:nth-child(1)');
            const descriptionSpan = task.querySelector('span:nth-child(2)');
            const deadlineSpan = task.querySelector('span:nth-child(3)');
            const prioritySpan = task.querySelector('span:nth-child(4)');

            const newTitle = prompt('Nouveau titre', titleSpan.textContent);
            const newDescription = prompt('Nouvelle description', descriptionSpan.textContent);
            const newDeadline = prompt('Nouvelle date limite', deadlineSpan.textContent);
            const newPriority = prompt('Nouvelle priorité', prioritySpan.textContent);

            titleSpan.textContent = newTitle;
            descriptionSpan.textContent = newDescription;
            deadlineSpan.textContent = newDeadline;
            prioritySpan.textContent = newPriority;
        }
        saveTask(newTask);

    });
});
 
// trier par orde
document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const deadlineInput = document.getElementById('deadline');
    const priorityInput = document.getElementById('priority');
    const sortTasksButton = document.getElementById('sort-tasks'); 

    const tasks = []; // Tableau pour stocker les tâches

    addTaskButton.addEventListener('click', function() {
        // ... (ajout de tâches, code inchangé)

        // Ajoutez la nouvelle tâche à notre tableau de tâches
        tasks.push({
            titleInput,
            descriptionInput,
            deadlineInput,
            priorityInput
        });
    });

    sortTasksButton.addEventListener('click', function() {
        // Triez le tableau de tâches en fonction de la date limite (deadline)
        tasks.sort((a, b) => {
            const dateA = new Date(a.deadline);
            const dateB = new Date(b.deadline);
            return dateA - dateB;
        });

        // Supprimez toutes les tâches de la liste HTML
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        // Ajoutez les tâches triées à la liste HTML
        tasks.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.innerHTML = `
            
                <span>${title}</span>
                <span>${description}</span>
                <span>${deadline}</span>
                <span>${priority}</span>
             
                    <button class="complete-task">Terminé</button>
                    <button class="edit-task">Modifier</button>
                    <button class="delete-task">Supprimer</button>
                
            `;
            taskList.appendChild(taskElement);
        });
    });
    
    // Charger les tâches depuis le fichier JSON
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        return JSON.parse(storedTasks) || [];
    }

    // Sauvegarder une tâche dans le fichier JSON
    function saveTask(task) {
        const tasks = loadTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Mettre à jour une tâche dans le fichier JSON
    function updateTask(task) {
        const tasks = loadTasks();
        const index = tasks.findIndex(t => t.title === task.title);
        if (index !== -1) {
            tasks[index] = task;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
    
    // Sauvegarder les tâches dans le fichier JSON
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


});
