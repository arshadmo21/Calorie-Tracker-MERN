const router = require('express').Router();
let Calorie = require('../models/calorie.model');

router.route('/').get((req, res) => {
  Calorie.find()
    .then(calories => res.json(calories))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const amount = Number(req.body.amount);
  const date = Date.parse(req.body.date);

  const newCalorie = new Calorie({
    username,
    description,
    amount,
    date,
  });

  newCalorie.save()
  .then(() => res.json('Calorie added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Calorie.findById(req.params.id)
    .then(calorie => res.json(calorie))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Calorie.findByIdAndDelete(req.params.id)
    .then(() => res.json('Calorie deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Calorie.findById(req.params.id)
    .then(calorie => {
      calorie.username = req.body.username;
      calorie.description = req.body.description;
      calorie.amount = Number(req.body.amount);
      calorie.date = Date.parse(req.body.date);

      calorie.save()
        .then(() => res.json('Calorie updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;