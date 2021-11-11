import { GoogleApiHelper } from './googleApi/google-api-helper';
import { AuthenticationRoutes } from './authentication/authentication.routes';
import express = require('express');
import { SongsRoutes } from './songs/songs.routes';
import { JsonFileManagerRoutes } from './googleApi/json-file-manager.routes';

const path = require("path");
const app: express.Application = express();

const port = process.env.PORT || 3080;
// carefull depending on what we compile the number of folder to go back might change
const angularPath = path.resolve(__dirname, '../../angular-build');

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require('cors');
const corsOptions = {
    origin: '*',
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// handle Angular
app.use(express.static(angularPath));


// init the Routes
const googleApiHelper = new GoogleApiHelper();
AuthenticationRoutes.initRoutes(app);
SongsRoutes.initRoutes(app, googleApiHelper);
JsonFileManagerRoutes.initRoutes(app, googleApiHelper, 'todos.json', 'todos')
JsonFileManagerRoutes.initRoutes(app, googleApiHelper, 'song-level.json', 'song-level')
JsonFileManagerRoutes.initRoutes(app, googleApiHelper, 'song-link.json', 'song-link')

//TodosRoutes.initRoutes(app, googleApiHelper);



app.get('*', function(req,res){
    console.log('notfound?', req.url)
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