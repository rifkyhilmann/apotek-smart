const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = 3000;
const router = require('./router')

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', router);

app.get('/', (req, res) => {
    res.send("Hello, ");
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})