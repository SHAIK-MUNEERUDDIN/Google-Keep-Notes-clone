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
    for (let i = 0; i < notes.length; i++) {
        notesHTML += `<div class="note" style="background-color: ${notes[i].color}">
        <div class="btn-list">
        <button class="delete btn" id="${i}" onclick="deleteNote(${i})"><i class="fa fa-trash" aria-hidden="true"></i></button>
        <button class="archive btn" id="${i}" onclick="ArchiveNote(${i})"><i class="fa fa-archive" aria-hidden="true"></i></button>
        </div>
        <div class="title">${notes[i].title}</div>
        <textarea class="text" rows="7" readonly>${notes[i].note}</textarea>
    </div>`;
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
    showNotes();
    addDeletedNoteAndRender(deletedNote); // Call a new function to add the deleted note to the "deleted notes" section
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


