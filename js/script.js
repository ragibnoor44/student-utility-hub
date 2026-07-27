    const footerP = document.querySelector('footer p');
    if (footerP) {
        footerP.textContent = `© ${new Date().getFullYear()} Ragibnoor`;
    }

    const loginForm = document.getElementById('loginForm');

    if(loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');

            emailError.textContent = '';
            passwordError.textContent = '';

            let isValid = true;

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailPattern.test(email)) {
                emailError.textContent = 'please enter a valid email address.';
                isValid = false;
            }

            if (password.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters.';
                isValid = false;
            }

            if (isValid) {
                alert('Login successful.');
                loginForm.reset();
            }
        });
    }

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (themeToggle) {
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        }

        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
        
            if(body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            }
        });
    }

    const noteForm = document.getElementById('noteForm');
    const notesContainer = document.getElementById('notesContainer');

    if(noteForm && notesContainer) {

        function getNotes() {
            const notes = localStorage.getItem('notes');
            return notes ? JSON.parse(notes) : [];
        }

        function saveNotes(notes) {
            localStorage.setItem('notes', JSON.stringify(notes));
        }

        function renderNotes() {
            const notes = getNotes();
            notesContainer.innerHTML = '';

            notes.forEach(function(note) {
                const col = document.createElement('div');
                col.className = 'col-md-4';

                col.innerHTML = `
                <div class="card p-3">
                <h5>${note.title}</h5>
                <p>${note.text}</p>
                <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${note.id}">Delete</button>
                </div>
                `;

                notesContainer.appendChild(col);
            });
        }

        noteForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const title = document.getElementById('noteTitle').value.trim();
            const text = document.getElementById('noteText').value.trim();

            if (title === '' || text === '') return;

            const notes = getNotes();
            const newNote = {
                id: Date.now(),
                title: title,
                text: text
            };

            notes.push(newNote);
            saveNotes(notes);
            renderNotes();
            noteForm.reset();
        });

        notesContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('delete-btn')) {
                const noteId = Number(e.target.getAttribute('data-id'));
                let notes = getNotes();
                notes = notes.filter(function (note) {
                    return note.id !== noteId;
                });
                saveNotes(notes);
                renderNotes();
            }
        });

        renderNotes();
    }