/*
Objects: 
Projects
ToDo
Board 


Requirements: 
- View all projects 
- View all todos    
- View all todos in each project 
- Edit a todo
- Delete a todo 



*/

class AppController {
  constructor() {
    this.todoCollection = {};
    let localData = this.loadFromLocal();

    if (localData != null) {
      this.todoCollection = localData;
    }

    this.domManager = new DomManager();
    this.todoFactory = new TodoFactory();
    this.latestId = this.getLatestId();
  }

  //#region StorageAPI
  loadFromLocal() {
    return JSON.parse(localStorage.getItem("todoCollection"));
  }

  saveToLocal() {
    localStorage.setItem("todoCollection", JSON.stringify(this.todoCollection));
  }
  //#endregion

  //#region helper functions
  getLatestId() {
    let maxId = -Infinity;

    if (Object.entries(this.todoCollection).length > 0) {
      for (const id in this.todoCollection) {
        maxId = id > maxId ? id : maxId;
      }
    } else {
      maxId = 1;
    }

    return maxId;
  }

  retrieveData() {}

  filterTodoByProject(projectName) {
    let todoInProject = {};
    for (const id in this.todoCollection) {
      const todo = this.todoCollection[id];
      if (todo.project === projectName) {
        todoInProject[id] = todo;
      }
    }

    this.domManager.generateTodoList(todoInProject);
  }
  //#endregion

  //#region CRUD FUNCTIONS
  createTodo() {
    this.latestId++;
    let todoFormData = this.retrieveData();

    todoFormData = {
      title: "dummytask",
    };
    todoFormData["id"] = this.latestId;

    let todoItem = this.todoFactory.createTodo(todoFormData);
    this.todoCollection[this.latestId] = todoItem;

    this.finalizeChanges("create", todoItem);
  }

  updateTodo(todoId) {
    let todoFormData = this.retrieveData(id);

    let todoItem = this.todoCollection[todoId].update(todoFormData);
    this.todoCollection[todoId] = todoItem;

    this.finalizeChanges("update", todoItem);
  }

  deleteTodo(todoId) {
    let todoItem = this.todoCollection[todoId];

    this.todoCollection = delete this.todoCollection[todoId];

    this.finalizeChanges("delete", todoItem);
  }

  finalizeChanges(changeType, todoItem) {
    this.saveToLocal();

    if (changeType === "create") {
      this.domManager.createTodo(todoItem);
    } else if (changeType === "update") {
      this.domManager.updateTodo(todoItem);
    } else if (changeType === "delete") {
      this.domManager.deleteTodo(todoItem);
    } else {
      throw "Invalid case!";
    }
  }
  //#endregion
}

class TodoFactory {
  constructor() {}

  createTodo(todoData) {
    return new Todo(todoData);
  }
}

class Todo {
  constructor({ id, title, priority, dueDate, isCompleted, project, notes }) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
    this.project = project;
    this.notes = notes;
    this.checklist; //Not implemented
  }

  update({ title, priority, dueDate, isCompleted, project, notes }) {
    this.title = title;
    this.priority = priority;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
    this.project = project;
    this.notes = notes;
  }
}

class DomManager {
  constructor() {}

  generateTodoList(todoCollection) {}

  createTodo() {
    alert("todo created!");
  }

  updateTodo() {
    alert("todo updated!");
  }

  deleteTodo() {
    alert("todo deleted!");
  }
}

class Project {
  // placeholder
}

let controller = new AppController();
