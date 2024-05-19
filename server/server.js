const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const Database = require("./Database");
const db = new Database();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



app.post("/notes", (req,res)=>{
    const body = req.body;
    console.log(body);
    db.addNote(body)
    .then((data)=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
    
});

app.get("/notes",(req,res)=>{
    db.getNotes()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
});

app.get("/notes/:id",(req,res)=>{
    const {id} = req.params;
    db.getNoteById(id)
    .then(data =>{
        if (!data){
            res.status(404).send("There is no note with this id: ",id);
        }else{
            res.send(data);
        }
    })
    .catch(err=>{
        res.status(500).send(err);
    })
});

app.put("/notes",(req,res)=>{
    db.updateNote(req.body)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.send(err);
    })
});

app.delete("/notes/:id",(req,res)=>{
    const {id} = req.params;
    db.deleteNote(id)
    .then(data=>{
        if(!data){
            res.status(404).send("there is no note with this id ", id);
        }
        else{
            res.send(`${data.title} was deleted`);
        }
    })
    .catch(err=>{
        res.status(500).send(err);
    })
})

const port =3000;

app.listen(port,()=>{
    console.log("server has started");
    db.connect();
});

