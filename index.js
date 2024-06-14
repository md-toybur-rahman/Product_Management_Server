const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@bookshelfcluster.p3s31ub.mongodb.net/?retryWrites=true&w=majority&appName=bookshelfCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

	const productCollection = client.db('Product_Management').collection('product');



	app.get('/products', async(req, res) => {
		const product = await productCollection.find().toArray();
		res.send(product);
	})

	app.get('/product/:id', async(req,res) => {
		const id = req.params.id;
		const query = {_id: new ObjectId(id)};
		const result = await productCollection.find(query).toArray();
		res.send(result);
	})









    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get('/', (req, res) => {
	res.send('Connecting successfuly')
})

app.listen(port, () => {
	console.log(`it's running on port ${port}`);
})


