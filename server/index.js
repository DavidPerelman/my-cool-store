const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/register', async (req, res) => {
    const data = { firstName, lastName, email, password } = req.body;
    console.log(data);
})

app.listen(3000, () => {
    console.log(`Server running`)
});