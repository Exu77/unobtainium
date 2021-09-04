import { AuthenticationService } from './authentication.service';
import express = require('express');
import SongsService from './songs.service';

class ApiRoutes {    
    constructor(app: express.Application) {
        const songService: SongsService = new SongsService(); 
        const authService = new AuthenticationService();
        const routeSecureApi = '/apiSecure';
        const routeApi = '/api';

        app.use(routeSecureApi, authService.basicAuth);
        console.log('api routes')
        app.get(`${routeApi}/googleDrive/fileContent`, function (req, res) {
            songService.getFileContent(req.query.id as string)
              .then((response: any) => {
                response.data.pipe(res);
              })
              .catch(error => {
                res.status(error.statusCode).send(error.toString());
              });
          });
          
          app.get(`${routeSecureApi}/googleDrive/songFolders`, function (req, res) {
            console.log('song folder')
            songService.getSongFolders()
              .then(songFolders => res.json(songFolders))
              .catch(error => {
                res.status(error.statusCode).send(error.toString());
              });
          });
          
          app.get(`${routeSecureApi}/googleDrive/song`, function (req, res) {
            songService.getSongFiles(req.query.name as string, null)
              .then(song => res.json(song))
              .catch(error => {
                res.status(error.statusCode).send(error.toString());
              })
              ;
          });
          
          app.post(`${routeApi}/authenticate`, function (req, res, next) {
            console.log('blup athrenticate', req.body)
            authService.authenticate(req.body)
                  .then(user => {
                    console.log('auth', user)
                    if (user) {
                      res.json(user);
                    } else {
                      res.status(400).json({ message: 'Password is incorrect' });
                    }
                  }).catch(err => next(err));
          });
    }
}

export default ApiRoutes;