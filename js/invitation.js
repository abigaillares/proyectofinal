document.addEventListener('DOMContentLoaded', () => {
    fetch('/js/templates.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(templates => {
            const templateContainer = document.getElementById('templateContainer');
            templates.forEach(template => {
                const button = document.createElement('button');
                button.textContent = template.title;
              
                button.onclick = () => selectTemplate(template);
                templateContainer.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error loading templates:', error);
            document.getElementById('templateContainer').textContent = 'Failed to load templates.';
        });
});

function selectTemplate(template) {
    const displayArea = document.getElementById('templateDisplay');
    displayArea.innerHTML = '';  

    const invitationContainer = document.createElement('div');
    invitationContainer.className = 'invitation-container';
    invitationContainer.style.backgroundColor = '#ffffff';  

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = '#ffffff';
    colorInput.oninput = () => {
        invitationContainer.style.backgroundColor = colorInput.value;
    };
    displayArea.appendChild(colorInput);

    template.elements.forEach(element => {
        const elementContainer = document.createElement('div');
        elementContainer.className = 'template-element';

        if (element.type === 'text') {
            const textArea = document.createElement('textarea');
            textArea.textContent = element.content || '';  
            textArea.oninput = () => {
                element.content = textArea.value; 
            };
            elementContainer.appendChild(textArea);
        } else if (element.type === 'input') {
            const label = document.createElement('label');
            label.textContent = element.label;
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = element.placeholder;
            input.value = element.content ? element.content.replace(/{\w+}/g, '') : '';  
            input.oninput = () => {
                element.content = input.value;
            };
            elementContainer.appendChild(label);
            elementContainer.appendChild(input);
        }

        invitationContainer.appendChild(elementContainer);
    });

    displayArea.appendChild(invitationContainer);
}