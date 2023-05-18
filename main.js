const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addNote');
const addButton = document.getElementById('add-btn');
const noteList = document.getElementById('notes-list');
function addNotes() {
    let notes = localStorage.getItem('local-notes');
    if (notes == null) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    if (addTitle.value.length > 30) {
        alert("Title should not exceed 30 characters.");
        return;
    }

    if (addText.value == '') {
        alert('Add your note');
        return;
    }

    const noteObj = {
        title: addTitle.value,
        note: addText.value,
        color: getRandomColor(), // Generate a random color for the note
    };

    if (noteObj.title === '') {
        noteObj.title = "Untitled";
    }

    addTitle.value = '';
    addText.value = '';
    notes.push(noteObj);

    localStorage.setItem('local-notes', JSON.stringify(notes));
    showNotes();
}

function showNotes() {
    let notesHTML = '';
    let notes = localStorage.getItem('local-notes');
    if (notes == null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    if (notes.length === 0) {
        notesHTML = `<h1 style="color: green;">Notes you add will appear here! <i class="fa fa-pencil-square-o" aria-hidden="true"></i></h1>`;
        noteList.innerHTML = notesHTML;
    }
    else {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i] === null) {
                continue; // Skip null values
            }
            notesHTML += `<div class="note" style="background-color: ${notes[i].color}">
            <div class="btn-list">
                <button class="delete btn" id="${i}" onclick="deleteNote(${i})"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button class="archive btn" id="${i}" onclick="archiveNote(${i})"><i class="fa fa-archive" aria-hidden="true"></i></button>
            </div>
            <div class="title">${notes[i].title}</div>
            <textarea class="text" rows="8" readonly>${notes[i].note}</textarea>
        </div>`;
        }
    }
    noteList.innerHTML = notesHTML;
}



function deleteNote(index) {
    let notes = localStorage.getItem('local-notes');
    if (notes == null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    const deletedNote = notes.splice(index, 1)[0]; // Remove the note from the array and store it in a variable
    localStorage.setItem('local-notes', JSON.stringify(notes));
    addDeletedNoteAndRender(deletedNote); // Call a new function to add the deleted note to the "deleted notes" section
    showNotes();
}

function archiveNote(index) {
    let notes = localStorage.getItem('local-notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    const archivedNote = notes.splice(index, 1)[0];
    localStorage.setItem('local-notes', JSON.stringify(notes));
    addArchivedNoteAndRender(archivedNote);
    updateArchivedNotesUI(); // Add this line to update the archived notes UI
    showNotes();
}


addButton.addEventListener('click', addNotes);

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

showNotes();


