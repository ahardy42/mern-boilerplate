var express = require('express');
var router = express.Router();
const { UserController } = require('../controllers');

const logError = (req, error) => console.error(`${req.method} ${req.baseUrl} error:`, error);

/* GET all users listing. */
router.get('/', async (req, res) => {
  try {
    const users = await UserController.show();
    if (users) return res.json(users);
    return res.status(400).json({status: 'error', message: 'DB find error'});
  } catch (error) {
    logError(req, error);
    return res.status(500).json(error);
  }
});

/* GET a single user */
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserController.show(userId);
    if (user) return res.json(user);
    return res.status(400).json({status: 'error', message: 'DB find user error'})
  } catch (error) {
    logError(req, error);
    res.status(500).json(error);
  }
});

/* CREATE a user */
router.post('/new', async (req, res) => {
  const user = req.body;
  try {
    const newUser = await UserController.create(user);
    if (newUser) return res.json(newUser);
    return res.status(400).json({status: 'error', message: 'DB create user error'});
  } catch (error) {
    logError(req, error);
    res.status(500).json(error);
  }
});

/* UPDATE a single user */
router.put('/edit/:userId', async (req, res) => {
  const { userId } = req.params;
  const update = req.body;
  console.log(userId, update)
  try {
    const updatedUser = await UserController.update(userId, update);
    if (updatedUser) return res.json(updatedUser);
    return res.status(400).json({status: 'error', message: 'DB update user error'});
  } catch (error) {
    logError(req, error);
    res.status(500).json(error);
  }
});

/* DELETE a single user */
router.delete('/delete/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await UserController.delete(userId);
    if (deletedUser) return res.json(deletedUser);
    return res.status(400).json({status: 'error', message: 'DB delete user error'})
  } catch (error) {
    logError(req, error);
    res.status(500).json(error);
  }
});

module.exports = router;
