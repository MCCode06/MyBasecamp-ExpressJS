const Project = require("../models/Project.js");

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const owner_id = req.session.user.id;

    const project = await Project.createProject(name, description, owner_id);
    res.status(201).json(project);
    } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.getAllProjects();
        if (projects.length === 0) return res.status(404).json({ error: 'No projects found' });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getProject = async (req, res) => {
        try {
        const project = await Project.getProjectById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateProject = async (req, res) => {
        try {
        const updatedProject = await Project.updateProject(req.params.id, req.body.name, req.body.description);
        if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
        res.json(updatedProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.deleteProject(req.params.id);
    if (!deletedProject) {
        return res.status(404).json({ error: 'Project not found' });
    }
    res.json({message: 'Project deleted successfully'});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {createProject, getAllProjects, getProject, updateProject, deleteProject};