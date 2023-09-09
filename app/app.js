// Récupérer les éléments HTML
const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskDeadline = document.getElementById("task-deadline");
const taskPriority = document.getElementById("task-priority");
const taskDetails = document.getElementById("task-details");

// Tableau pour stocker les tâches
let tasks = [];

// Fonction pour ajouter une tâche
function addTask(title, description, deadline, priority) {
    const task = {
        title,
        description,
        deadline,
        priority,
        completed: false,
    };
    tasks.push(task);
    // Mettre à jour l'affichage de la liste des tâches
    displayTasks();
}

// Fonction pour afficher les tâches
// function displayTasks() {
//     // Afficher les tâches dans taskList
//     // ...
// }


// Gérer la soumission du formulaire pour ajouter une tâche
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = taskTitle.value;
    const description = taskDescription.value;
    const deadline = taskDeadline.value;
    const priority = taskPriority.value;
    addTask(title, description, deadline, priority);
    // Effacer le formulaire après l'ajout de la tâche
    taskForm.reset();
});

// Autres fonctionnalités à implémenter
// - Marquer une tâche comme terminée
// - Modifier les détails d'une tâche existante
// - Afficher les informations détaillées d'une tâche
// ...

// Appel initial pour afficher les tâches
// ...


// ...

// Fonction pour marquer une tâche comme terminée
function markTaskAsCompleted(taskIndex) {
    tasks[taskIndex].completed = true;
    // Rafraîchissez l'affichage des tâches
    displayTasks();
}

// Ajoutez un gestionnaire d'événement de clic à chaque tâche de la liste
function attachTaskClickEvent(taskElement, task, index) {
    taskElement.addEventListener("click", function () {
        // Marquez la tâche comme terminée
        markTaskAsCompleted(index);
    });
}

// ...

// Fonction pour afficher les tâches
function displayTasks() {
    // Effacez d'abord le contenu actuel de taskList
    taskList.innerHTML = "";

    // Parcourez toutes les tâches et affichez-les dans taskList
    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-item");
        taskElement.textContent = `${index + 1}. ${task.title}`;

        // Si la tâche est terminée, ajoutez une classe CSS pour la marquer
        if (task.completed) {
            taskElement.classList.add("completed-task");
        }

        // Attachez un gestionnaire d'événement de clic pour chaque tâche
        attachTaskClickEvent(taskElement, task, index);

        taskList.appendChild(taskElement);
    });
}
function displayTasks() {
    // Effacez d'abord le contenu actuel de taskList
    taskList.innerHTML = "";

    // Parcourez toutes les tâches et affichez-les dans taskList
    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-item");
        taskElement.textContent = `${index + 1}. ${task.title}`;
        
        // Attachez un gestionnaire d'événement de clic pour chaque tâche
        attachTaskClickEvent(taskElement, task);

        taskList.appendChild(taskElement);
    });
}

// Appel initial pour afficher les tâches

// ...


// Ajoutez un gestionnaire d'événement de clic à chaque tâche de la liste
function attachTaskClickEvent(taskElement, task, index) {
    taskElement.addEventListener("click", function () {
        // Marquez la tâche comme terminée
        markTaskAsCompleted(index);
    });
}

// ...

// Fonction pour afficher les tâches
function displayTasks() {
    // Effacez d'abord le contenu actuel de taskList
    taskList.innerHTML = "";

    // Parcourez toutes les tâches et affichez-les dans taskList
    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-item");
        taskElement.textContent = `${index + 1}. ${task.title}`;

        // Si la tâche est terminée, ajoutez une classe CSS pour la marquer
        if (task.completed) {
            taskElement.classList.add("completed-task");
        }

        // Attachez un gestionnaire d'événement de clic pour chaque tâche
        attachTaskClickEvent(taskElement, task, index);

        taskList.appendChild(taskElement);
    });
}

// Appel initial pour afficher les tâches
displayTasks();

// ...

