let columnIdCounter = 4


document
    .querySelectorAll('.column')
    .forEach(columnProcess)

document
    .querySelector('[data-action-addColumn]')
    .addEventListener('click', function (e) {
        const columnElement = document.createElement('div')
        columnElement.classList.add('column')
        columnElement.setAttribute('draggable', 'true')
        columnElement.setAttribute('data-column-id', columnIdCounter)

        columnElement.innerHTML =
            `<p class="column-header" contenteditable="true">В плане</p>
            <div data-notes></div>
            <p class="column-footer">
                <span data-action-addNote class="action">+ Добавить карточку</span>
            </p>`

        columnIdCounter++

        document.querySelector('.columns').append(columnElement)

        columnProcess(columnElement)
    })

document
    .querySelectorAll('.note')
    .forEach(Note.process)

function columnProcess (columnElement) {
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')

    spanAction_addNote.addEventListener('click', function (e) {
        const noteElement = document.createElement('div')
        noteElement.classList.add('note')
        noteElement.setAttribute('draggable', 'true')
        noteElement.setAttribute('data-note-id', Note.IdCounter)

        Note.IdCounter++

        columnElement.querySelector('[data-notes]').append(noteElement)
        Note.process(noteElement)

        noteElement.setAttribute('contenteditable', true)
        noteElement.focus()
    })
    const headerElement = columnElement.querySelector('.column-header')

    headerElement.addEventListener('dblclick', function (e) {
        headerElement.setAttribute('contenteditable', true)
        headerElement.focus()
    })

    headerElement.addEventListener('blur', function (e) {
        headerElement.removeAttribute('contenteditable', true)
    })

    columnElement.addEventListener('dragover', function (e) {
        e.preventDefault()
    })

    columnElement.addEventListener('drop', function (e) {
        if (Note.dragged) {
            return columnElement.querySelector('[data-notes]').append(Note.dragged)
        }
    })
}