  const express = require('express'); 
  const bodyParser = require('body-parser');
  const cors = require('cors')
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  const fs = require('fs')
  

  
  app.get('/todos', function(req, res) {
   fs.readFile('todos.json', 'utf8', (data, err)=>{
    if (data){
      res.json(JSON.parse(data) );
    }else{
      res.status(404).send('UNOTHORISED')
    }
   })
  });

  
  app.post('/todos', (req, res) => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000), // unique random id
      title: req.body.title,
      description: req.body.description
    };
    fs.readFile("todos.json", "utf8", (err, data) => {
      if (err) throw err;
      const todos = JSON.parse(data);
      todos.push(newTodo);
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(201).json(newTodo);
      });
    });
  });


  app.get('/todos/view/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
  
    if (todo) {
      res.json(todo);
      res.status(200).send(todo);
    } else {
      res.status(404).send('Invalid id');
    }
  });
  app.put('/todos/makeChange', function (req, res){
    const extracted = parseInt(req.params.id)
    const isCorrect = todos.findindex(againId => againId.id === extracted) 
    if(isCorrect >= 0){
      todos[isCorrect.index].title = req.body.title;
      todos[isCorrect.index].completed = updatedTodo.completed;
res.status(200).send('Changes Have Been Saved')
    }else{
      res.status(404).send('I think You Should Check The You Have Provided')
    }
  })
  app.delete('/todos/delete/:id', function(req,req){
   const objectId = parseInt(req.params.id)
    const index = todos.findIndex(lookForId =>lookForId.id ===  objectId)
    if(index >= 0){
      todos.splice(index, 1);
      res.status(201).send('A Todo Has Been Deleted')
    }else{
      res.status(404).send('Todo Could Not Be Deleted')
    }
   });
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  