const express = require('express');
const app = express();
const port = 5000;


const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    console.log(name);
    console.log(job);
    if (name != undefined){
        console.log(name);
        let result = findUserByName(name);
        result = {users_list: result};
        console.log("Name Filter:");
        console.log(result);

        if(job != undefined){
            console.log("Job Filter: ");
            console.log(job);
            let jobResult = findUserByJob(job);
            result = {user: jobResult};
            res.send(result);
        }
        else{
            res.send(result);
        }
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
    return users['users_list'].filter( (user) => user['job'] === job); 
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});
// app.get('/users/:job', (req, res) => {
//     const name = req.query.name;
//     const job =req.params['job'];
//     console.log(name);
//     console.log(job);
//     if (name != undefined){
//         console.log(name);
//         let result = findUserByName(name);
//         result = {users_list: result};
//         console.log(result);

//         if(job != undefined){
//             console.log(job);
//             let jobResult = findUserByJob(job);
//             result = {result: job};
//             res.send(result);
//         }
//         else{
//             res.send(result);
//         }
//     }
//     else{
//         res.send(users);
//     }
// });

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).end();
});

function addUser(user){
    users['users_list'].push(user);
}


app.delete('/users', (req, res) => {
    const deleteID = req.body.id;
    //console.log(deleteID);
    deleteUser(deleteID);
    res.status(200).end();
});


function findUserIndex(userID){
    return users['users_list'].findIndex( (user) => user['id'] === userID);
}

function deleteUser(userID){
    index = findUserIndex(userID);
    if (index == -1){
        console.log("User does not Exist");
    }
    else{
        users['users_list'].splice(index,1);
    }
}
