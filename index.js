
var express = require('express'),
	app = express();
const path = require('path');
const port = process.env.PORT || 5000;
var bodyParser = require("body-parser")

const { MongoClient, ServerApiVersion } = require('mongodb');
const { appendFile } = require('fs');
const uri = "mongodb+srv://user:cmps4155@cluster0.mhuie.mongodb.net/cmps_415_crawford_example?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send("Here is a response")
});

//supposed to get all EMRs from our collection
app.get('/emr', async(req, res) => {
	try {
		client.connect();
		console.log('Connected to DB');
		const collection = client.db("cmps_415_crawford_example").collection("emrs");

		var query = { };
		console.log(query);
		const result = await collection.find(req.body).toArray();
		console.log(result);
		res.send(result)
		client.close();
	}
	catch(err){
		res.send(err);
	}
	console.log('Done with Endpoint: All EMR resources');
});

//supposed to get single EMR from our collection
app.get('/emr/:id', async(req, res) => {
	try {
		client.connect();
		console.log('Connected to DB');
		const collection = client.db("cmps_415_crawford_example").collection("emrs");

		var query = { };
		console.log(query);
		const result = await collection.findOne({"_id": id}).toArray();
		console.log(result);
		res.send(result)
		client.close();
	}
	catch(err){
		res.send(err);
	}
	console.log('Done with Endpoint');
});

//endpoint creates a new EMR resource
app.post('/emr', async(req, res) => {
	try {
		client.connect();
		const collection = client.db("cmps_415_crawford_example").collection("emrs");

		var query = { };
		console.log(query);
		const result = await collection.insertOne(req.body);
		console.log(result);
		res.send(result)
		client.close();
	}
	catch(err){
		res.send(err);
	}
	console.log('Done with Endpoint: 1 EMR inserted');
});

//endpoint deletes EMR resource
app.delete('/rest/emr/:id', async(req, res) => {
	try {
		client.connect();
		const collection = client.db("cmps_415_crawford_example").collection("emrs");

		var query = { };
		console.log(query);
		const result = await collection.deleteOne(req.body);
		console.log(result);
		res.send(result)
		client.close();
	}
	catch(err){
		res.send(err);
	}
	console.log('Done with Endpoint: 1 EMR deleted');
});

//endpoint updates existing EMR resource
app.post('/rest/emr/:id', async(req, res) => {
	try {
		client.connect();
		const collection = client.db("cmps_415_crawford_example").collection("emrs");

		nonce = nonceValue
		var updateValue = { $set: {nonce: nonce} }
		var query = { };
		console.log(query);
		const result = collection.updateOne(query, updateValue, req.body);
		console.log(result);
		res.send(result)
		client.close();
	}
	catch(err){
		res.send(err);
	}
	console.log('Done with Endpoint: 1 EMR updated');
});

app.listen(port);