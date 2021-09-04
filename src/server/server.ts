import express = require('express');
import ApiRoutes from './api-routes';

const path = require("path");
const app: express.Application = express();

const port = process.env.PORT || 3080;
const angularPath = path.resolve(__dirname, '../../angular-build');

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require('cors');
const corsOptions = {
    origin: '*',
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

console.log('angular path',angularPath, __dirname);

// handle Angular
app.use(express.static(angularPath));


// all the other routes
const apiRoutes = new ApiRoutes(app);


app.get('/*', function(req,res){
    console.log('index.hmtl', angularPath)
    res.header('Content-Type', 'text/html');
    res.status(200).sendFile(path.join(angularPath, 'index.html'));
    res.sendFile(path.join(angularPath, 'index.html'))
});

// return index.html on page reload (angular routing)
          // app.all('*', function (req, res) {
          //   res.header('Content-Type', 'text/html');
          //   res.status(200).sendFile(process.cwd() + '/unobtainium/dist/index.html');
          // });

// Start the app by listening on the default Heroku port
app.listen(port, function() {
    console.log(`App is listening on port ${port}!`);
});