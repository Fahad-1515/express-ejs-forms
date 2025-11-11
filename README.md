# express-ejs-forms

# 🧠 Tech Stack:

Node.js | Express.js | EJS | MongoDB | Mongoose | Bootstrap | CSS | JavaScript | bcrypt | JWT | dotenv

# 🌐 Features:

* Dynamic form rendering and validation

* Responsive multi-section layout

* Secure login and registration system

* API-based data fetching and client-side routing
  
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
🧩 Level 1: Beginner
Task 1 – HTML Structure and Basic Server Interaction

Objective: Learn server-side rendering and form submissions.
Steps:

Create an HTML structure with forms for user input.

Set up a Node.js server using Express.

Create endpoints to handle form submissions.

## Use server-side rendering ( EJS) to dynamically generate HTML.

Simple EJS (No Layout Engine)
1️⃣ Install dependencies  
npm init -y
npm install express ejs
npm install --save-dev nodemon
2️⃣ package.json -
3️⃣ app.js
4️⃣ views/index.ejs
5️⃣ views/result.ejs
6️⃣ public/styles.css
7️⃣ Run the app  
 node app.js OR
nodemon app.js
Then open http://localhost:3000

---

⚙️ Level 2: Intermediate
Task 3 – Advanced CSS Styling and Responsive Design
Objective: Improve UI with advanced CSS and responsive layout.
Steps:

Create a complex, multi-section layout.

Use CSS properties like transitions and animations.

## Use a framework ( Bootstrap) for responsive design.

1️⃣ app.js – Add server-side validation + temporary storage
2️⃣ views/index.ejs – Inline styles + client-side validation
3️⃣ views/result.ejs – Show submitted data and stored records
<img width="700" height="583" alt="Screenshot 2025-11-06 144526" src="https://github.com/user-attachments/assets/5f2105db-b28f-43f1-9008-e9ac26d31a3b" />

---

⚙️ Level 2: Intermediate
Task 3 – Advanced CSS Styling and Responsive Design

Objective: Improve UI with advanced CSS and responsive layout.
Steps:

Create a complex, multi-section layout.

Use CSS properties like transitions and animations.

## Use a framework ( Bootstrap) for responsive design.

npm install bootstrap
3️⃣ views/index.ejs — Responsive form layout with Bootstrap & animations
4️⃣ views/result.ejs — Stylish results page
5️⃣ public/styles.css — Animations, transitions, and responsiveness
<img width="1920" height="791" alt="Screenshot 2025-11-06 145141" src="https://github.com/user-attachments/assets/5c0c1e12-3513-4fc0-bd3c-0838c17d2042" />

---

Task 4 – Complex Form Validation and Dynamic DOM Manipulation

Objective: Extend validation and manipulate the DOM dynamically.
Steps:

Add complex validation (e.g., password strength).

Update the DOM dynamically based on user input.

## Implement client-side routing for a smoother experience.

🧱 1️⃣ Add New Form Fields (views/index.ejs)
🧠 2️⃣ Server-Side Validation (app.js)

---

⚙️ 2. Updated app.js with API Routes
🖥️ 3. Updated index.ejs
Here’s the full content for your script.js file (includes validation, routing, and API fetching):
<img width="727" height="723" alt="Screenshot 2025-11-06 165754" src="https://github.com/user-attachments/assets/5fd449f1-ce0a-4263-b831-a7cedde2fff4" />

---

Task 6 – Database Integration and User Authentication

Objective: Secure data storage and authentication.
Steps:

Integrate a database (e.g., MongoDB or MySQL).

Implement user authentication on the server.

Secure your API endpoints with authorization checks.
npm install mongoose bcrypt jsonwebtoken cookie-parser
🗄️ Step 2: Connect MongoDB
👤 Step 3: Authentication Routes (Register + Login)
<img width="1151" height="876" alt="Screenshot 2025-11-07 212431" src="https://github.com/user-attachments/assets/5e29f7ee-12c2-4009-9e3e-cd76e1793893" />

---

  Install database & auth libs
npm install mongoose bcrypt jsonwebtoken cookie-parser dotenv
