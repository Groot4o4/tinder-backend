import express from 'express';
import mongoose from 'mongoose';
import card from './dbCards.js';
import Cors from 'cors';



const app = express();
const port = process.env.PORT || 8001;

const connection_url = `mongodb+srv://admin:admin123@cluster0.9zrin.mongodb.net/tinderdb?retryWrites=true&w=majority`


app.use(express.json())
app.use(Cors());



mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

app.once('open', () => console.log('i am connectionCheckOutStarted'))

app.get('/', (req, res) => res.status(200).send("Hello world!"));

app.post("/tinder/cards", (req, res) => {
    const dbcard = req.body;

    card.create(dbcard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});



app.get("/tinder/cards", (req, res) => {


    card.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})


app.listen(port, () => console.log(`listening to localhost :  ${port}`));