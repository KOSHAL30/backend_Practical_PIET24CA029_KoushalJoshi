// A3 : small script to test all the APIs of task 1 and task 2
// start A1.js and A2.js first (in two terminals), then run: node A3.js
const BOOKS_URL = "http://localhost:3000";
const PORTAL_URL = "http://localhost:5000";

async function call(method, url, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = "Bearer " + token;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => null);
  console.log(method + " " + url.replace(/http:\/\/localhost:\d+/, "") + " -> " + res.status);
  console.log(JSON.stringify(data));
  console.log("--------------------------------------");
  return data;
}

async function testTask1() {
  console.log("\n===== TASK 1 : LIBRARY API =====\n");
  const book = await call("POST", BOOKS_URL + "/books", {
    title: "Let Us C",
    author: "Yashavant Kanetkar",
    price: 350,
    category: "Programming",
  });
  // this one is not deleted, so it stays in compass
  await call("POST", BOOKS_URL + "/books", {
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    price: 250,
    category: "Biography",
  });
  await call("POST", BOOKS_URL + "/books", { title: "No author book", price: 0 }); // 400
  await call("GET", BOOKS_URL + "/books");
  await call("GET", BOOKS_URL + "/books/" + book._id);
  await call("PUT", BOOKS_URL + "/books/" + book._id, { price: 399, isAvailable: false });
  await call("DELETE", BOOKS_URL + "/books/" + book._id);
  await call("GET", BOOKS_URL + "/books/" + book._id); // 404 now
}

async function testTask2() {
  console.log("\n===== TASK 2 : STUDENT PORTAL =====\n");
  const n = Date.now(); // so emails are new every time i run it
  const student = { name: "Rahul", email: "rahul" + n + "@college.com", password: "rahul123", role: "student" };
  const admin = { name: "Admin", email: "admin" + n + "@college.com", password: "admin123", role: "admin" };

  await call("POST", PORTAL_URL + "/register", student);
  await call("POST", PORTAL_URL + "/register", admin);
  await call("POST", PORTAL_URL + "/register", student); // duplicate -> 400
  await call("POST", PORTAL_URL + "/register", { name: "X", email: "abc", password: "12" }); // invalid -> 400

  const s = await call("POST", PORTAL_URL + "/login", { email: student.email, password: student.password });
  const a = await call("POST", PORTAL_URL + "/login", { email: admin.email, password: admin.password });

  await call("GET", PORTAL_URL + "/profile"); // no token -> 401
  await call("GET", PORTAL_URL + "/profile", null, "wrongtoken"); // invalid -> 401
  await call("GET", PORTAL_URL + "/profile", null, s.token); // 200
  await call("GET", PORTAL_URL + "/students", null, s.token); // student -> 403
  await call("GET", PORTAL_URL + "/students", null, a.token); // admin -> 200
}

testTask1()
  .then(testTask2)
  .catch((err) => console.log("Test failed:", err.message));
