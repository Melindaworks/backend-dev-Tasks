const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

let tasks = []; // In-memory storage for tasks

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static('public')); // Serve static files
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.set('views', path.join(__dirname, 'views')); // Set views directory

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.post('/tasks', (req, res) => {
  if (req.body.name) {
    tasks.push(req.body.name); // Add new task to the in-memory array
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
