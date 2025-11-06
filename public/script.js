// === Step Navigation ===
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const nextBtn = document.getElementById("nextBtn");
const toStep1 = document.getElementById("toStep1");
const toStep2 = document.getElementById("toStep2");

nextBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!name || !email) return alert("Please fill in all fields!");

  document.getElementById("hiddenName").value = name;
  document.getElementById("hiddenEmail").value = email;

  step1.style.display = "none";
  step2.style.display = "block";
});

toStep1.addEventListener("click", () => {
  step2.style.display = "none";
  step1.style.display = "block";
});

toStep2.addEventListener("click", () => {
  step1.style.display = "none";
  step2.style.display = "block";
});

// === Password Validation ===
const passwordInput = document.getElementById("password");
const strengthMsg = document.getElementById("strengthMsg");
const confirmInput = document.getElementById("confirmPassword");
const confirmMsg = document.getElementById("confirmMsg");

passwordInput.addEventListener("input", () => {
  const val = passwordInput.value;
  const hasUpper = /[A-Z]/.test(val);
  const hasLower = /[a-z]/.test(val);
  const hasNum = /\d/.test(val);
  const hasSpecial = /[^A-Za-z0-9]/.test(val);
  const length = val.length >= 8;

  const strength = hasUpper + hasLower + hasNum + hasSpecial + (length ? 1 : 0);
  const messages = [
    "Too weak 😢",
    "Weak 😐",
    "Medium 🙂",
    "Strong 💪",
    "Very Strong 🚀",
  ];
  strengthMsg.textContent = "Password strength: " + messages[strength - 1];
  strengthMsg.style.color =
    strength < 3 ? "red" : strength === 3 ? "orange" : "green";
});

confirmInput.addEventListener("input", () => {
  confirmMsg.textContent =
    confirmInput.value === passwordInput.value
      ? "✅ Passwords match"
      : "❌ Passwords do not match";
  confirmMsg.style.color =
    confirmInput.value === passwordInput.value ? "green" : "red";
});

// === API Integration ===
async function loadSubmissions() {
  try {
    const res = await fetch("/api/submissions");
    const data = await res.json();
    const list = document.getElementById("submissionsList");
    if (!list) return; // no section on some pages
    if (data.length === 0) {
      list.innerHTML = "<p>No submissions yet.</p>";
      return;
    }
    list.innerHTML = data
      .map(
        (item) => `
        <div class="submission-card">
          <strong>${item.name}</strong> — <em>${item.email}</em><br/>
          <p>${item.message}</p>
          <small>${new Date(item.createdAt).toLocaleString()}</small>
          <button onclick="deleteSubmission(${
            item.id
          })" class="btn small-btn danger">🗑 Delete</button>
        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error("Error loading submissions:", err);
  }
}

async function deleteSubmission(id) {
  if (!confirm("Delete this submission?")) return;
  await fetch("/api/submissions/" + id, { method: "DELETE" });
  loadSubmissions();
}

// Load submissions automatically on page load
document.addEventListener("DOMContentLoaded", loadSubmissions);
