// ---- Current user and projects 
var currentUser = null;
var currentProjectId = null;

// ---- Show / hide pages  
function showPage(pageName) {
  // Hide all pages
  var pages = document.querySelectorAll('div[id^="page-"]');
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = 'none';
  }

  // Show the selected page
  document.getElementById('page-' + pageName).style.display = 'block';

  // Load projects when switching to the projects page
  if (pageName === 'projects') {
    loadProjects();
  }
}

// ---- Show / hide navbar  
function showNavbar(user) {
  document.getElementById('navbar').style.display = 'flex';
  document.getElementById('nav-username').textContent = user.name || user.email;
}

function hideNavbar() {
  document.getElementById('navbar').style.display = 'none';
}

// ---- Show / hide error messages  
function showError(elementId, message) {
  var errorEl = document.getElementById(elementId);
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

function hideError(elementId) {
  document.getElementById(elementId).style.display = 'none';
}

// ---- register  
async function register() {
  // Hide old error
  hideError('reg-error');

  //-
  var name = document.getElementById('reg-name').value;
  var email = document.getElementById('reg-email').value;
  var password = document.getElementById('reg-password').value;

  
  if (name === '' || email === '' || password === '') {
    showError('reg-error', 'Please fill in all fields!');
    return;
  }

  var response = await fetch('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, email: email, password: password })
  });

  var data = await response.json();

  if (response.ok) {
    loginWithEmailPassword(email, password);
  } else {
    showError('reg-error', data.error || 'Something went wrong!');
  }
}

// ---- Login  
async function login() {
  hideError('login-error');

  var email = document.getElementById('login-email').value;
  var password = document.getElementById('login-password').value;

  if (email === '' || password === '') {
    showError('login-error', 'Please enter your email and password!');
    return;
  }

  loginWithEmailPassword(email, password);
}

async function loginWithEmailPassword(email, password) {
  var response = await fetch('/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password })
  });

  var data = await response.json();

  if (response.ok) {
    // Login successful
    currentUser = data.user || data;
    showNavbar(currentUser);
    showPage('projects');
  } else {
    showError('login-error', data.error || 'Wrong email or password!');
  }
}

// ---- Sign out  
async function signOut() {
  await fetch('/session', { method: 'DELETE' });

  currentUser = null;
  hideNavbar();
  showPage('landing');
}

// ----- load projects  
async function loadProjects() {
  var listDiv = document.getElementById('projects-list');
  listDiv.innerHTML = '<p>Loading...</p>';

  var response = await fetch('/projects');
  var data = await response.json();

  var projects = Array.isArray(data) ? data : data.projects || [];

  if (projects.length === 0) {
    listDiv.innerHTML = '<p>No projects yet. Create your first one!</p>';
    return;
  }

  // Create a card for each project
  listDiv.innerHTML = '';
  for (var i = 0; i < projects.length; i++) {
    var proj = projects[i];

    var card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = '<h3>' + proj.name + '</h3><p>' + (proj.description || 'No description') + '</p>';





    card.onclick = (function(p) {
      return function() {
        openProject(p);
      };
    })(proj);

    listDiv.appendChild(card);
  }
}

// --- create new project  
async function createProject() {
  hideError('proj-error');

  var name = document.getElementById('proj-name').value;
  var description = document.getElementById('proj-desc').value;

  if (name === '') {
    showError('proj-error', 'Please enter a project name!');
    return;
  }

  var response = await fetch('/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, description: description })
  });

  var data = await response.json();

  if (response.ok) {
    // Clear the form and go back to projects
    document.getElementById('proj-name').value = '';
    document.getElementById('proj-desc').value = '';
    showPage('projects');
  } else {
    showError('proj-error', data.error || 'Could not create project!');
  }
}

// ---- open project detail  
function openProject(proj) {
  currentProjectId = proj.id;

  document.getElementById('detail-name').textContent = proj.name;
  document.getElementById('detail-desc').textContent = proj.description || 'No description';

  // Fill in the edit form fields
  document.getElementById('edit-name').value = proj.name;
  document.getElementById('edit-desc').value = proj.description || '';

  // Hide edit form
  hideEditForm();

  showPage('project-detail');
}

// ---- delete prjct  
async function deleteProject() {
  var confirmed = confirm('Are you sure you want to delete this project?');
  if (!confirmed) return;

  var response = await fetch('/projects/' + currentProjectId, {
    method: 'DELETE'
  });

  if (response.ok) {
    showPage('projects');
  } else {
    alert('Could not delete project!');
  }
}

// ------ edit form  
function showEditForm() {
  document.getElementById('edit-form').style.display = 'block';
}

function hideEditForm() {
  document.getElementById('edit-form').style.display = 'none';
}

// ---- update project  
async function updateProject() {
  var name = document.getElementById('edit-name').value;
  var description = document.getElementById('edit-desc').value;

  if (name === '') {
    alert('Name cannot be empty!');
    return;
  }

  var response = await fetch('/projects/' + currentProjectId, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, description: description })
  });

  if (response.ok) {
    // Update the info shown on the page
    document.getElementById('detail-name').textContent = name;
    document.getElementById('detail-desc').textContent = description || 'No description';
    hideEditForm();
  } else {
    alert('Could not update project!');
  }
}