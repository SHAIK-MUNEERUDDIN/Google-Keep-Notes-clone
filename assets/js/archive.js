const archiveList = document.querySelector("#archived-list");
function archive(event) {
    event.preventDefault();
    archiveList.style.display = "flex";
    deletedList.style.display = "none";
    noteInput.style.display = "none";
    noteList.style.display = "none";
    active(event.target);
    updateArchivedNotesUI();
}

function active(a) {
    items = document.querySelectorAll('.single.active');
    if (items.length) {
        items[0].className = 'single';
    }
    a.className = 'single active';

}

function addArchivedNoteToLocalStorage(note) {
    let archivedNotes = localStorage.getItem('archive-notes');
    if (archivedNotes === null) {
        archivedNotes = [];
    } else {
        archivedNotes = JSON.parse(archivedNotes);
    }

    archivedNotes.push(note);
    localStorage.setItem('archive-notes', JSON.stringify(archivedNotes));
}

function addArchivedNoteAndRender(note) {
    addArchivedNoteToLocalStorage(note);
    updateArchivedNotesUI();
}

function createArchivedNoteHTML(note, index) {
    return `<div class="note" style="background-color: ${note.color}">
    <div class="btn-list">
      <button class="delete btn" onclick="removeArchivedNote(${index})"><i class="fa fa-trash" aria-hidden="true"></i></button>
      <button class="undo btn" id="${index}" onclick="restoreNoteFromArchive(${index})"><i class="fa fa-undo" aria-hidden="true"></i></button>
    </div>
    <div class="title">${note.title}</div>
    <textarea class="text" rows="8" readonly>${note.note}</textarea>
  </div>`;
}

function updateArchivedNotesUI() {
    let archivedNotesHTML = '';
    let archivedNotes = localStorage.getItem('archive-notes');
    if (archivedNotes === null || JSON.parse(archivedNotes).length === 0) {
        archivedNotesHTML = `<h1 style="color: yellow;">Archive folder is empty!</h1>`;
    } else {
        archivedNotes = JSON.parse(archivedNotes);
        for (let i = 0; i < archivedNotes.length; i++) {
            if (archivedNotes[i] === null) {
                continue; // Skip null values
            }
            archivedNotesHTML += createArchivedNoteHTML(archivedNotes[i], i);
        }
    }
    archiveList.innerHTML = archivedNotesHTML;
}

function removeArchivedNote(index) {
    removeArchivedNoteFromLocalStorage(index);
    updateArchivedNotesUI();
    showNotes(); // Refresh the displayed notes after removing the archived note
}

function removeArchivedNoteFromLocalStorage(index) {
    let archivedNotes = localStorage.getItem('archive-notes');
    if (archivedNotes === null) {
        return;
    } else {
        archivedNotes = JSON.parse(archivedNotes);
    }

    const deletedNote = archivedNotes.splice(index, 1)[0]; // Remove the note from the array and store it in a variable
    localStorage.setItem('archive-notes', JSON.stringify(archivedNotes));

    addDeletedNoteAndRender(deletedNote); // Call a new function to add the deleted note to the "deleted notes" section
}

function restoreNoteFromArchive(index) {
    let archivedNotes = localStorage.getItem('archive-notes');
    if (archivedNotes == null) {
        return;
    } else {
        archivedNotes = JSON.parse(archivedNotes);
    }
    const restoredNote = archivedNotes.splice(index, 1)[0]; // Remove the note from the array and store it in a variable

    let notes = localStorage.getItem('local-notes');
    if (notes == null) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    notes.push(restoredNote);
    localStorage.setItem('local-notes', JSON.stringify(notes));
    localStorage.setItem('archive-notes', JSON.stringify(archivedNotes));
    updateArchivedNotesUI();
    showNotes();
}