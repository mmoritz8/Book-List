// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor

function UI() {

}
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');

    // create tr element
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
    `;

    list.appendChild(row);
}
// Show Alert

UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div');
    // add classname to div

    div.className = `alert ${className}`;

    //add text
    div.appendChild(document.createTextNode(message));
    // get parent

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    // timeout after 3 seconds

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}
// Delete Book

UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}



// Clear Fields

UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Event Listers

//Event Listener for Add

document.getElementById('book-form').addEventListener('submit',
    function (e) {
        // get form values
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value

        // initiate book
        const book = new Book(title, author, isbn);
        // initiate UI
        const ui = new UI();

        if (title === '' || author === '' || isbn === '') {
            ui.showAlert('Please fill in all fields.', 'error')
        } else {
            //add book
            ui.addBookToList(book)

            // show success

            ui.showAlert('Book added!', 'success');
            // clear

            ui.clearFields();
        }
        e.preventDefault();

    });

// Event Listener for Delete

document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteBook(e.target);

    //show msg

    ui.showAlert('Book Removed!', 'success');
    e.preventDefault();
});