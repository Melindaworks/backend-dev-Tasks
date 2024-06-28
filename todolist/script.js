document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.querySelector('.add-task button');
    const taskInput = document.querySelector('.add-task input');
    const taskContainer = document.querySelector('form');
  
    addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        const newTask = document.createElement('div');
        newTask.classList.add('task');
        
        const newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        
        const newLabel = document.createElement('label');
        newLabel.textContent = taskText;
        
        newTask.appendChild(newCheckbox);
        newTask.appendChild(newLabel);
        
        taskContainer.insertBefore(newTask, document.querySelector('.add-task'));
        
        taskInput.value = '';
      }
    });
  });
  