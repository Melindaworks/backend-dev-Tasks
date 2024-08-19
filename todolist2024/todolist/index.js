const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data store
let lists = {
    Home: { tasks: [{ task: "Welcome to your to-do list", completed: false }] },
    Work: { tasks: [] },
    Personal: { tasks: [] }
};

// Routes
app.get("/", (req, res) => {
    res.render("home");
});

app.post("/", (req, res) => {
    const listName = req.body.btn;
    res.redirect("/" + listName);
});

app.get("/:listName", (req, res) => {
    const listName = req.params.listName;
    const list = lists[listName];

    if (!list) {
        lists[listName] = { tasks: [{ task: "Welcome to your to-do list", completed: false }] };
        res.redirect("/" + listName);
    } else {
        res.render("list", { listName: listName, list: list.tasks });
    }
});

app.post("/addTask", (req, res) => {
    const task = { task: req.body.task, completed: false };
    const listName = req.body.listName;

    if (lists[listName]) {
        lists[listName].tasks.push(task);
    }

    res.redirect("/" + listName);
});

app.post("/deleteTask", (req, res) => {
    const taskId = req.body.taskId;  // This approach needs a unique identifier for tasks
    const listName = req.body.listName;

    if (lists[listName]) {
        lists[listName].tasks = lists[listName].tasks.filter((task, index) => index != taskId);
    }

    res.redirect("/" + listName);
});

app.post("/back", (req, res) => {
    res.redirect("/");
});

// Start Server
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
