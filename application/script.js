// basic interactions for portfolio
document.getElementById("year").textContent = new Date().getFullYear();

// case studies content
const cases = {
  p1: `<h3>Library Management System</h3>
       <p><strong>Role:</strong> Full-stack Developer (CodeIgniter, MySQL)</p>
       <p><strong>Summary:</strong> Admin portal for school libraries — CRUD, PDF/Excel export, search & filters. Source code private due to client confidentiality.</p>
       <h4>Features</h4>
       <ul><li>Admin dashboard & role-based access</li><li>Export to PDF/Excel</li><li>Advanced search & filtering</li></ul>`,

  p2: `<h3>Custom E-commerce (WordPress)</h3>
       <p><strong>Role:</strong> Theme & plugin customization</p>
       <p><strong>Summary:</strong> Built a fast, secure checkout flow, custom product filters, and integrations with payment gateways. Source private.</p>
       <h4>Features</h4><ul><li>Custom plugin for filters</li><li>Payment integration</li><li>Performance tuning & caching</li></ul>`,

  p3: `<h3>Attendance & HR Portal</h3>
       <p><strong>Role:</strong> Backend & API Developer (Laravel)</p>
       <p><strong>Summary:</strong> APIs and admin dashboard for attendance reconciliation and payroll exports. Optimized database queries and reporting.</p>
       <h4>Features</h4><ul><li>REST APIs</li><li>Payroll CSV export</li><li>Attendance reconciliation</li></ul>`,
};

function openCase(id) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");
  content.innerHTML = cases[id] || "<p>Case study not available.</p>";
  modal.classList.add("show");
}
function closeModal() {
  document.getElementById("modal").classList.remove("show");
}

// contact form - open mailto with prefilled content (simple and no backend)
function sendMail(e) {
  e.preventDefault();
  const name = document.getElementById("name").value || "No name";
  const email = document.getElementById("email").value || "";
  const message = document.getElementById("message").value || "";
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );
  window.location.href = `mailto:ahmadchohan31@gmail.com?subject=${subject}&body=${body}`;
}

// download CV (this assumes you will place Ahmad_Jawad_PHP.pdf in repo root or assets)
function downloadCV() {
  // If you upload CV into repo (assets/Ahmad_Jawad_PHP.pdf), change path accordingly
  window.open("../assets/resume/Ahmad_Jawad_PHP.pdf", "_blank");
}
