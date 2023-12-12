const express = require('express');
const router = express.Router();
const memberController = require('./memberController');

router.get('/members/get/:pageNumber', (req, res) => {
  const pageNumber = parseInt(req.params.pageNumber);

  if (isNaN(pageNumber) || pageNumber <= 0) {
    return res.status(400).json({ error: 'Invalid page number' });
  }

  memberController.getMemberPage(pageNumber, (err, users) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching member page' });
    }
    res.json(users);
  });
});


// Route to get all library media
router.get('/members/getall', (req, res) => {
    // Use the getAllGames function and provide a callback
    memberController.getAllMembers((err, users) => {
      if (err) {
        return res.status(500).json({ error: 'Error members' });
      }
      res.json(users);
    });
  });

// Route to get all library media count
router.get('/members/getcount', (req, res) => {
    // Use the getAllGames function and provide a callback
    memberController.getAllMembersCount((err, count) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching user count' });
      }
      res.json(count);
    });
  });


module.exports = router;
