const express = require("express");
const session = require("express-session");
require("dotenv").config();

const userRoutes = require('./routes/userRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const projectRoutes = require('./routes/projectRoutes')

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);


app.use('/users', userRoutes)
app.use('/session', sessionRoutes)
app.use('/projects', projectRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});


