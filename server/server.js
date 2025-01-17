const express = require('express');
const cors = require('cors');
const myMiddleware = require('./middleware');
const Route = require('./route');
const path = require('path');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(myMiddleware);
app.use('/', Route);
app.use(express.static(path.resolve(__dirname, '..', 'build')));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log('server started in port: ', port));