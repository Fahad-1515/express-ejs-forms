// API functions for submissions
async function loadSubmissions() {
  try {
    const response = await fetch("/api/submissions");
    const submissions = await response.json();
    displaySubmissions(submissions);
  } catch (error) {
    console.error("Error loading submissions:", error);
    document.getElementById("submissionsList").innerHTML =
      '<p class="error">Error loading submissions</p>';
  }
}

function displaySubmissions(submissions) {
  const list = document.getElementById("submissionsList");

  if (!submissions || submissions.length === 0) {
    list.innerHTML = "<p>No submissions yet.</p>";
    return;
  }

  list.innerHTML = submissions
    .map(
      (submission) => `
        <div class="submission-card">
            <strong>${escapeHtml(submission.name)}</strong> — 
            <em>${escapeHtml(submission.email)}</em>
            <p>${escapeHtml(submission.message)}</p>
            <small>Submitted on ${new Date(
              submission.createdAt
            ).toLocaleDateString()}</small>
            <button onclick="deleteSubmission('${submission._id}')" 
                    class="btn btn-danger" 
                    style="margin-top: 0.5rem; padding: 0.25rem 0.5rem; background: #dc3545;">
                Delete
            </button>
        </div>
    `
    )
    .join("");
}

async function deleteSubmission(id) {
  if (!confirm("Are you sure you want to delete this submission?")) {
    return;
  }

  try {
    const response = await fetch(`/api/submissions/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadSubmissions(); // Reload the list
    } else {
      alert("Error deleting submission");
    }
  } catch (error) {
    console.error("Error deleting submission:", error);
    alert("Error deleting submission");
  }
}

// Utility function to prevent XSS
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Load submissions when page loads
document.addEventListener("DOMContentLoaded", loadSubmissions);
