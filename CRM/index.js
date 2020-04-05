import express from 'express';
import routes from './routes/crmRoutes';
import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import bodyParser from 'body-parser';

const secretKey = '5e8a09a1a615d50dca0fd964-5e8a1fbf0a556a0ebce810e9';

const app = express();

const PORT = 4000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://dhiren:dhiren13@ds251894.mlab.com:51894/mydemodb' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//body parser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 
                secretKey ,
                (err, decodedUser) => {
                    if (err) req.user = undefined;
                    req.user = decodedUser;
                    next();
                });
    } else {
        req.user = undefined;
        next();
    }
})

routes(app);

app.get('/',(req,res) => res.send(`Node and Express Server Running on PORT ${PORT}...`));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
