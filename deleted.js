const noteInput = document.querySelector("#input-box");
const deletedList = document.querySelector("#deleted-list");
let deletedNotes = [];

function deleted(event) {
    event.preventDefault();
    deletedList.style.display = "flex";
    archiveList.style.display = "none";
    noteInput.style.display = "none";
    noteList.style.display = "none";
    updateDeletedNotesUI();
}

function updateDeletedNotesUI() {
    let deletedNotesHTML = '';
    let deletedNotes = localStorage.getItem('deleted-notes');
    if (deletedNotes === null || JSON.parse(deletedNotes).length === 0) {
        deletedList.innerHTML = `<h1 style="color: red;">Recycle bin is empty!</h1>`;
    } else {
        deletedNotes = JSON.parse(deletedNotes);
        for (let i = 0; i < deletedNotes.length; i++) {
            if (deletedNotes[i] === null) {
                continue; // Skip null values
            }
            deletedNotesHTML += createDeletedNoteHTML(deletedNotes[i], i);
        }
        deletedList.innerHTML = deletedNotesHTML;
    }
}


function createDeletedNoteHTML(note, index) {
    return `<div class="note" style="background-color: ${note.color}">
    <div class="btn-list">
        <button class=" permanent-delete btn" onclick="removeDeletedNote(${index})"><i class="fa fa-ban" aria-hidden="true"></i></button>
        <button class="undo btn" id="${index}" onclick="restoreNote(${index})"><i class="fa fa-undo" aria-hidden="true"></i></button>
    </div>
    <div class="title">${note.title}</div>
    <textarea class="text" rows="8" readonly>${note.note}</textarea>
  </div>`;
}

function addDeletedNoteToLocalStorage(note) {
    let deletedNotes = localStorage.getItem('deleted-notes');
    if (deletedNotes === null) {
        deletedNotes = [];
    } else {
        deletedNotes = JSON.parse(deletedNotes);
    }

    deletedNotes.push(note);
    localStorage.setItem('deleted-notes', JSON.stringify(deletedNotes));
}

function addDeletedNoteAndRender(note) {
    addDeletedNoteToLocalStorage(note);
    deletedList.innerHTML += createDeletedNoteHTML(note, deletedNotes.length - 1);
    showNotes();
}



function removeDeletedNote(index) {
    removeDeletedNoteFromLocalStorage(index);
    updateDeletedNotesUI();
    showNotes(); // Refresh the displayed notes after removing the deleted note
}

function removeDeletedNoteFromLocalStorage(index) {
    let deletedNotes = localStorage.getItem('deleted-notes');
    if (deletedNotes === null) {
        return;
    } else {
        deletedNotes = JSON.parse(deletedNotes);
    }

    deletedNotes.splice(index, 1);
    localStorage.setItem('deleted-notes', JSON.stringify(deletedNotes));
}

function restoreNote(index) {
    let deletedNotes = localStorage.getItem('deleted-notes');
    if (deletedNotes == null) {
        return;
    } else {
        deletedNotes = JSON.parse(deletedNotes);
    }
    const restoredNote = deletedNotes.splice(index, 1)[0]; // Remove the note from the array and store it in a variable

    let notes = localStorage.getItem('local-notes');
    if (notes == null) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    notes.push(restoredNote);
    localStorage.setItem('local-notes', JSON.stringify(notes));
    localStorage.setItem('deleted-notes', JSON.stringify(deletedNotes));
    updateDeletedNotesUI();
    showNotes();
}
