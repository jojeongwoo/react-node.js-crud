const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Food } = require('../server/models/Food');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const dbAddress = "mongodb+srv://whwjddn7364:wjddn1143214@cluster0.hhz5t.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(dbAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => console.log("MongoDB Connect.."))
.catch((err) => console.log(err));

app.post('/insert', async (req, res) => {
  const FoodName = req.body.Food;
  const Days = req.body.Days;

  const food = new Food({ foodName: FoodName, daysSinceIAte: Days });

  try {
    await food.save();
    res.send('success');
  } catch(err) {
    console.log(err);
  }
});

app.get('/read', async (req, res) => {
  Food.find({}, (err, result) => {
    if(err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.put('/update', async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    await Food.findById(id, (err, updateFood) => {
      updateFood.foodName = newFoodName;
      updateFood.save();
      res.send('update');
    });
  } catch(err) {
    console.log(err);
  }
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await Food.findByIdAndDelete(id).exec();
  res.send('delete');
})

app.listen(port, () => { 
  console.log(`Server running on port ${port}...`); 
});