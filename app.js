const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));
app.use(express.static(path.join(__dirname, 'public')));

const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost:11002', neo4j.auth.basic('neo4j', 'teste'));
const session = driver.session();

app.get('/', (req, res) => {
	session
		.run('MATCH(n:Movie) RETURN n ')
		.then()
		.catch();
	res.send("Oi bb's");
});

app.listen(3000);
console.log('Iniciou na porta 3000');

module.exports = app;
