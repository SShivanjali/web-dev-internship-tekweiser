const baseUrl = "http://localhost:8000";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // === index.html ===
  if (path.includes("index.html") || path === "/" || path === "/index.html") {
    const bookForm = document.getElementById("bookForm");
    const bookList = document.getElementById("bookList");
    const toggleBookFormBtn = document.getElementById("toggleBookForm");

    if (toggleBookFormBtn && bookForm) {
      toggleBookFormBtn.addEventListener("click", () => {
        bookForm.classList.toggle("hidden");
      });
    }

    if (bookForm && bookList) {
      // Load all books
      fetch(`${baseUrl}/books/`)
        .then(res => res.json())
        .then(books => {
          books.forEach(book => {
            const card = document.createElement("div");
            card.className = "bg-white p-4 rounded shadow hover:shadow-md";
            card.innerHTML = `
              <h3 class="text-xl font-semibold">${book.title}</h3>
              <p class="text-sm text-gray-600 mb-2">by ${book.author}</p>
              <a href="book.html?bookId=${book.id}" class="text-blue-500 hover:underline">View Reviews</a>
            `;
            bookList.appendChild(card);
          });
        });

      // Add a new book
      bookForm.addEventListener("submit", e => {
        e.preventDefault();
        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();

        fetch(`${baseUrl}/books/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, author }),
        })
          .then(res => res.json())
          .then(() => location.reload());
      });
    }
  }

  // === book.html ===
  if (path.includes("book.html")) {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("bookId");

    const reviewForm = document.getElementById("reviewForm");
    const reviewList = document.getElementById("reviewList");
    const bookTitle = document.getElementById("bookTitle");
    const toggleReviewFormBtn = document.getElementById("toggleReviewForm");

    if (toggleReviewFormBtn && reviewForm) {
      toggleReviewFormBtn.addEventListener("click", () => {
        reviewForm.classList.toggle("hidden");
      });
    }

    if (reviewForm && reviewList && bookTitle && bookId) {
      // Get reviews and book title
      fetch(`${baseUrl}/books/${bookId}/reviews/`)
        .then(res => res.json())
        .then(reviews => {
          reviews.forEach(review => {
            const reviewCard = document.createElement("div");
            reviewCard.className = "bg-white p-4 rounded shadow";
            reviewCard.innerHTML = `
              <p class="text-lg">${review.comment}</p>
              <p class="text-sm text-gray-600 text-right">– ${review.reviewer_name}</p>
            `;
            reviewList.appendChild(reviewCard);
          });
        });

      fetch(`${baseUrl}/books/`)
        .then(res => res.json())
        .then(books => {
          const book = books.find(b => b.id == bookId);
          bookTitle.textContent = book ? `${book.title} by ${book.author}` : "Book not found";
        });

      // Submit review
      reviewForm.addEventListener("submit", e => {
        e.preventDefault();
        const reviewer_name = document.getElementById("reviewer_name").value.trim();
        const comment = document.getElementById("comment").value.trim();

        fetch(`${baseUrl}/books/${bookId}/reviews/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reviewer_name, comment }),
        })
          .then(() => location.reload());
      });
    }
  }
});
