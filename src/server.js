const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan');

// parse application/json
app.use(bodyParser.json());
app.use(cors());  // Allow all CORS requests
app.use(morgan('combined'));  // Log HTTP requests

let sensors = [
  { id: 1, type: 'temperature' },
  { id: 2, type: 'moisture' }
];

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

app.post('/sensors', (req, res) => {
  console.log(req.body);
  sensors.push(req.body);
  res.send(req.body);
});

app.get('/sensors', (req, res) => {
  res.send(sensors);
});

app.get('/sensors/:id', (req, res) => {
  const sensor = sensors.find(sensor => sensor.id === parseInt(req.params.id))
  if (!sensor) res.status(404).send({ error: 'The sensor with the given ID was not found.'});
  res.send(sensor);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})