
document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Charger les données initiales depuis le fichier JSON
    const initialTasks = loadTasks();

    // Afficher les tâches existantes
    initialTasks.forEach(task => addTaskToList(task));

    // Gérer la soumission du formulaire
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const deadline = document.getElementById('deadline').value;
        const priority = document.getElementById('priority').value;

        const newTask = {
            title,
            description,
            deadline,
            priority,
            completed: false
        };
        window.location.replace("list.html");

        // Ajouter la nouvelle tâche à la liste
        addTaskToList(newTask);

        // Réinitialiser le formulaire
        taskForm.reset();

        // Sauvegarder la tâche dans le fichier JSON
        saveTask(newTask);
    });

    // Ajouter une tâche à la liste
    function addTaskToList(task) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${task.title} - ${task.description} - ${task.deadline} - ${task.priority}</span>

            <button class="complete-btn">Terminé</button>
            

        `;
        if (task.completed) {
            listItem.classList.add('completed');
        }
        taskList.appendChild(listItem);

        // Gérer le clic sur le bouton "Terminé"
        const completeBtn = listItem.querySelector('.complete-btn');
        completeBtn.addEventListener('click', function () {
            task.completed = !task.completed;
            listItem.classList.toggle('completed');

            // Mettre à jour la tâche dans le fichier JSON
            updateTask(task);
        });
    }

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
});
document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const taskIndexInput = document.getElementById('task-index');

    // Charger les données initiales depuis le fichier JSON
    let tasks = loadTasks();

    // Afficher les tâches existantes
    displayTasks();

    // Gérer la soumission du formulaire
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const deadline = document.getElementById('deadline').value;
        const priority = document.getElementById('priority').value;

        if (taskIndexInput.value === "") {
            // Ajouter une nouvelle tâche à la liste
            const newTask = {
                title,
                description,
                deadline,
                priority
            };
            tasks.push(newTask);
        } else {
            // Modifier une tâche existante
            const index = parseInt(taskIndexInput.value);
            tasks[index].title = title;
            tasks[index].description = description;
            tasks[index].deadline = deadline;
            tasks[index].priority = priority;
            taskIndexInput.value = ""; // Réinitialiser l'index
        }

        // Réinitialiser le formulaire
        taskForm.reset();

        // Mettre à jour la tâche dans le fichier JSON
        saveTasks();

        // Rafraîchir l'affichage des tâches
        displayTasks();
    });

    // Fonction pour afficher les tâches dans la liste
    function displayTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Date limite : ${task.deadline}</p>
                <p>Priorité : ${task.priority}</p>
                <div style=" margin-left:vh;">
                    <button  class="edit-btn delete-btn" data-index="${index}">Modifier</button>
                    <button class="complete-btn">Terminé</button>
                    <button class=" del delete-btn" data-index="${index}">Supprimer</button>
                </div>
                `;
            taskList.appendChild(listItem);

            //Gérer le clic sur le bouton "Modifier"
            listItem.querySelector('.edit-btn').addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                const taskToEdit = tasks[index];
                document.getElementById('title').value = taskToEdit.title;
                document.getElementById('description').value = taskToEdit.description;
                document.getElementById('deadline').value = taskToEdit.deadline;
                document.getElementById('priority').value = taskToEdit.priority;
                taskIndexInput.value = index;
            });
            listItem.querySelector('.edit-btn').addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                const taskToEdit = tasks[index];
                document.getElementById('popup-title').value = taskToEdit.title;
                document.getElementById('popup-description').value = taskToEdit.description;
                document.getElementById('popup-deadline').value = taskToEdit.deadline;
                document.getElementById('popup-priority').value = taskToEdit.priority;
                document.getElementById('popup-completed').checked = taskToEdit.completed;
                taskIndexInput.value = index;
                openPopup();
            });
            listItem.querySelector('.delete-btn').addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                tasks.splice(index, 1);
                saveTasks();
                displayTasks();
            });
        });
    }

    // Charger les tâches depuis le fichier JSON
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        return JSON.parse(storedTasks) || [];
    }

    // Sauvegarder les tâches dans le fichier JSON
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
