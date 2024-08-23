document.addEventListener('DOMContentLoaded', () => {
    const guestForm = document.getElementById('guestForm');
    const guestList = document.getElementById('guestList');
    const searchInput = document.getElementById('searchInput');
    const updateButton = document.getElementById('updateButton');

    let guests = JSON.parse(localStorage.getItem('guests')) || [];
    let editIndex = null;

    function renderGuests(filter = '') {
        guestList.innerHTML = '';
        guests
            .filter(guest => 
                guest.name.toLowerCase().includes(filter.toLowerCase()) || 
                guest.email.toLowerCase().includes(filter.toLowerCase())
            )
            .forEach((guest, index) => {
                const li = document.createElement('li');
                li.textContent = `${guest.name} - ${guest.email}`;
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.addEventListener('click', () => editGuest(index));
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => {
                    Swal.fire({
                        title: '¿Estás seguro?',
                        text: "No podrás revertir esto!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, eliminar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            removeGuest(index);
                            Swal.fire(
                                'Eliminado!',
                                'El invitado ha sido eliminado.',
                                'success'
                            )
                        }
                    })
                });
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                guestList.appendChild(li);
            });
    }

    function addGuest(name, email) {
        guests.push({ name, email });
        localStorage.setItem('guests', JSON.stringify(guests));
        renderGuests();
        Swal.fire('¡Agregado!', 'Invitado agregado exitosamente.', 'success');
    }

    function editGuest(index) {
        const guest = guests[index];
        document.getElementById('guestName').value = guest.name;
        document.getElementById('guestEmail').value = guest.email;
        editIndex = index;
        updateButton.style.display = 'inline-block';
        guestForm.querySelector('button[type="submit"]').style.display = 'none';
    }

    function updateGuest(name, email) {
        guests[editIndex] = { name, email };
        localStorage.setItem('guests', JSON.stringify(guests));
        renderGuests();
        guestForm.reset();
        updateButton.style.display = 'none';
        guestForm.querySelector('button[type="submit"]').style.display = 'inline-block';
        editIndex = null;
        Swal.fire('¡Actualizado!', 'El invitado ha sido actualizado.', 'success');
    }

    function removeGuest(index) {
        guests.splice(index, 1);
        localStorage.setItem('guests', JSON.stringify(guests));
        renderGuests();
    }

    guestForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const guestName = document.getElementById('guestName').value.trim();
        const guestEmail = document.getElementById('guestEmail').value.trim();

        if (!guestName || !guestEmail) {
            Swal.fire('Error', 'Por favor, completa ambos campos.', 'error');
            return;
        }

        const emailExists = guests.some((guest, index) => guest.email === guestEmail && index !== editIndex);
        if (emailExists) {
            Swal.fire('Error', 'Este correo electrónico ya está registrado.', 'error');
            return;
        }

        if (editIndex !== null) {
            updateGuest(guestName, guestEmail);
        } else {
            addGuest(guestName, guestEmail);
        }

        guestForm.reset();
    });

    updateButton.addEventListener('click', () => {
        const guestName = document.getElementById('guestName').value.trim();
        const guestEmail = document.getElementById('guestEmail').value.trim();

        if (!guestName || !guestEmail) {
            Swal.fire('Error', 'Por favor, completa ambos campos.', 'error');
            return;
        }

        const emailExists = guests.some((guest, index) => guest.email === guestEmail && index !== editIndex);
        if (emailExists) {
            Swal.fire('Error', 'Este correo electrónico ya está registrado.', 'error');
            return;
        }

        updateGuest(guestName, guestEmail);
    });

    searchInput.addEventListener('input', (event) => {
        renderGuests(event.target.value);
    });

    renderGuests();
});