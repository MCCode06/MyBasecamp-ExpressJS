const express = require("express");
const session = require("express-session");
const path = require("path");
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
require("dotenv").config();

const User = require('./models/User.js');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const projectRoutes = require('./routes/projectRoutes');
const auth = require('./middleware/auth.js')
const admin = require('./middleware/admin.js')


const app = express();

// TEMPLATE ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// VALIDATION
const registerValidation = [
  body('name').trim().escape().isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
  body('email').trim().normalizeEmail().isEmail().withMessage('Valid email required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches('[0-9]').withMessage('Password must contain a number')
    .matches('[a-z]').withMessage('Password must contain a letter')
]

// PAGE ROUTES
app.get('/', (req, res) => res.render('index'));

app.get('/register', (req, res) => res.render('register', { errors: [], message: '' }));

app.post('/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('register', { errors: errors.array(), message: '' });
  }
  const { name, email, password } = req.body;
  const existing = await User.findUserByEmail(email);
  if (existing) {
    return res.render('register', { errors: [{ msg: 'Email already in use' }], message: '' });
  }
  const hashed = await bcrypt.hash(password, 10);
  await User.createUser(name, email, hashed);
  res.render('register', { errors: [], message: 'Account created! You can now login.' });
});

app.get('/login', (req, res) => res.render('login', { errors: [], message: '' }));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findUserByEmail(email);
  if (!user) {
    return res.render('login', { errors: [{ msg: 'Invalid credentials' }], message: '' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.render('login', { errors: [{ msg: 'Invalid credentials' }], message: '' });
  }
  req.session.user = user;
  res.redirect('/projects');
});

app.get('/admin', auth, admin, (req, res) => {
  res.render('admin', { user: req.session.user });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/projects', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('projects', { user: req.session.user });
});

// API ROUTES
app.use('/api/users', userRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});