document.getElementById("comment-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  let name = document.getElementById("name").value.trim();
  let comment = document.getElementById("comment").value.trim();
  
  if (name === "" || comment === "") {
    alert("Please enter your name and comment.");
    return;
  }

  let commentList = document.getElementById("comments-list");

  // Create new comment element
  let commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");

  // Unique ID for each comment (based on timestamp)
  let commentId = Date.now();

  commentDiv.innerHTML = `
    <strong>${name}:</strong> ${comment}
    <button class="delete-btn" data-id="${commentId}">Delete</button>
  `;
  
  commentList.appendChild(commentDiv);

  // Save to Local Storage
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push({ id: commentId, name, comment });
  localStorage.setItem("comments", JSON.stringify(comments));

  // Clear input fields
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
});

// Load saved comments on page load
window.addEventListener("load", function() {
  let commentList = document.getElementById("comments-list");
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  
  comments.forEach(({ id, name, comment }) => {
    let commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.innerHTML = `
      <strong>${name}:</strong> ${comment}
      <button class="delete-btn" data-id="${id}">Delete</button>
    `;
    commentList.appendChild(commentDiv);
  });
});

// Event listener for delete buttons
document.getElementById("comments-list").addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-btn")) {
    let commentId = event.target.getAttribute("data-id");

    // Remove from Local Storage
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments = comments.filter(comment => comment.id != commentId);
    localStorage.setItem("comments", JSON.stringify(comments));

    // Remove from UI
    event.target.parentElement.remove();
  }
});

