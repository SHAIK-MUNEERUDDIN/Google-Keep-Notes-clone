const searchInput = document.querySelector('.search input');

searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase();
    const notes = document.querySelectorAll('.note');

    notes.forEach(function (note) {
        const title = note.querySelector('.title').innerText.toLowerCase();
        const text = note.querySelector('.text').value.toLowerCase();

        if (title.includes(searchValue) || text.includes(searchValue)) {
            note.style.display = 'block';
        } else {
            note.style.display = 'none';
        }
    });
});