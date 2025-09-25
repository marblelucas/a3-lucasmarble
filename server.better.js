const express = require( 'express' ),
      cookie = require( 'cookie-session' ),
      hbs     = require( 'express-handlebars' ).engine,
      app = express()

app.use( express.static( 'public' ))
app.use( express.json())
app.use( express.urlencoded({ extended:true }) )

app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './public' )

let user = ''

const appdata = []
//jFUe9ZGMX5HVGwfS user password


require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USERNM}:${process.env.PASS}@${process.env.HOST}/?retryWrites=true&w=majority&appName=Hurricanes`;

app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection = null

async function run() {
  try {

    await client.connect(
    err => {
		console.log("err :", err);
		client.close();
	}
    );

    collection = client.db("Storms").collection("Atlantic");

    await client.db("Storms").command({ ping: 1 });
  } finally {

  }
}

app.use( (req,res,next) => {
    if( collection !== null ) {
        next()
    } else {
        res.status( 503 ).send()
    }
})

app.post( '/login', async (req, res) => {

    if(await collection.countDocuments({ Type: "User", User: req.body.User}) !== 0){
        if(await collection.countDocuments({ Type: "User", User: req.body.User, Pass: req.body.Pass}) !== 0){
            req.session.login = true
            user = req.body.User
            res.redirect( 'main.html' )
        }
        else{
            req.session.login = false
            res.render( 'index' , { msg:'Invalid Login Details', layout:false })
        }
    }
    else{
        req.body.Type = "User"
        await collection.insertOne( req.body )
        res.redirect( 'main.html' )
    }
}
)

app.post( '/logoff', async (req, res) => {
        req.session.login = false
        user = ''
        res.render( 'index' , { msg:'You have logged off', layout:false })
    }
)

app.get( '/', (req,res) => {
  res.render( 'index', { msg:'', layout:false })
})

app.get( '/main.html', ( req, res) => {
    res.render( 'main' ,{ msg:'Welcome to the Hurricane Database. Please enter the storm details to begin. You must put in at least the name and year.', layout:false })
})

app.post( '/submit', async (req, res) => {
    if (req.session.login){
        req.body.Type = "Storm",
        req.body.User = user
        if (await collection.countDocuments({ Name: req.body.Name, Year: req.body.Year, User: req.body.User}) !== 0){
            await collection.updateOne(
                { Name: req.body.Name, Year: req.body.Year },
                { $set: {Windspeed: req.body.Windspeed, Airpressure: req.body.Airpressure}})
            const result = await collection.find({ Type: "Storm", User: req.body.User}).toArray()
            res.json( result )
        }
        else {
            await collection.insertOne( req.body )
            const result = await collection.find({ Type: "Storm", User: req.body.User}).toArray()
            res.json( result )
        }
    }
    else{
        res.render( 'index' , { msg:'You have logged off', layout:false })
    }
})

app.post( '/delete', async (req, res) => {
    if (req.session.login){
        req.body.Type = "Storm",
        req.body.User = user
        if (await collection.countDocuments({ Name: req.body.Name, Year: req.body.Year, User: req.body.User}) !== 0){
            await collection.deleteOne(
                { Name: req.body.Name, Year: req.body.Year })
            const result = await collection.find({ Type: "Storm", User: req.body.User}).toArray()
            res.json( result )
        }
        else {
            const result = await collection.find({ Type: "Storm", User: req.body.User}).toArray()
            res.json( result )
        }
    }
    else{
        res.render( 'index' , { msg:'You have logged off', layout:false })
    }
})

run().catch(console.dir);

app.listen( process.env.PORT || 3000)	