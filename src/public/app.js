document.addEventListener('DOMContentLoaded', () => {
  const booksContainer = document.querySelector('.books');

  // Event Delegation for Edit, Save, and Delete Buttons
  booksContainer.addEventListener('click', (event) => {
      const button = event.target;
      const bookItem = button.closest('.single_book');

      if (button.classList.contains('edit-button')) {
          handleEdit(bookItem, button);
      } else if (button.classList.contains('save-button')) {
          handleSave(bookItem, button);
      } else if (button.classList.contains('delete-button')) {
          handleDelete(bookItem);
      }
  });

  function handleEdit(bookItem, editButton) {
      const titleP = bookItem.querySelector('.book-title p');
      const titleInput = bookItem.querySelector('.book-title input');
      const authorP = bookItem.querySelector('.book-author p');
      const authorInput = bookItem.querySelector('.book-author input');
      const genreP = bookItem.querySelector('.book-genre p');
      const genreInput = bookItem.querySelector('.book-genre input');
      const saveButton = bookItem.querySelector('.save-button');

      // Show input fields, hide text
      titleP.style.display = 'none';
      titleInput.style.display = 'inline-block';
      authorP.style.display = 'none';
      authorInput.style.display = 'inline-block';
      genreP.style.display = 'none';
      genreInput.style.display = 'inline-block';

      editButton.style.display = 'none';
      saveButton.style.display = 'inline-block';
  }

  function handleSave(bookItem, saveButton) {
      const id = bookItem.getAttribute('data-book-id');
      const titleP = bookItem.querySelector('.book-title p');
      const titleInput = bookItem.querySelector('.book-title input');
      const authorP = bookItem.querySelector('.book-author p');
      const authorInput = bookItem.querySelector('.book-author input');
      const genreP = bookItem.querySelector('.book-genre p');
      const genreInput = bookItem.querySelector('.book-genre input');
      const editButton = bookItem.querySelector('.edit-button');

      const book_title = titleInput.value.trim();
      const book_author = authorInput.value.trim();
      const book_genre = genreInput.value.trim();

      // Validation: Check if fields are empty
      if (!book_title || !book_author || !book_genre) {
          alert("All fields are required!");
          return;
      }

      // Validation: Ensure author name only contains letters and spaces
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(book_author)) {
          alert("Author name can only contain letters and spaces.");
          return;
      }

      // Send data to backend
      fetch(`/api/books/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ book_title, book_author, book_genre })
      })
      .then(response => {
          if (!response.ok) throw new Error("Failed to update book.");
          return response.json();
      })
      .then(data => {
          // Update UI with new values
          titleP.textContent = book_title;
          authorP.textContent = book_author;
          genreP.textContent = book_genre;

          titleP.style.display = 'inline-block';
          titleInput.style.display = 'none';
          authorP.style.display = 'inline-block';
          authorInput.style.display = 'none';
          genreP.style.display = 'inline-block';
          genreInput.style.display = 'none';

          editButton.style.display = 'inline-block';
          saveButton.style.display = 'none';
      })
      .catch(error => alert(`Error updating book: ${error.message}`));
  }

  function handleDelete(bookItem) {
      const id = bookItem.getAttribute('data-book-id');

      if (!confirm("Are you sure you want to delete this book?")) return;

      fetch(`/api/books/${id}`, { method: 'DELETE' })
      .then(response => {
          if (!response.ok) throw new Error("Failed to delete book.");
          bookItem.remove();
      })
      .catch(error => alert(`Error deleting book: ${error.message}`));
  }
});
