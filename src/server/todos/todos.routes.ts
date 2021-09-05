import { GoogleApiHelper } from './../googleApi/google-api-helper';
import { TodosService } from './todos.service';
import { AuthenticationConstants } from './../../common/constants/authentication.constants';
import express = require('express');

export class TodosRoutes {

    public static initRoutes(app: express.Application, googleApiHelper: GoogleApiHelper) {
        const todosService = new TodosService(googleApiHelper);

        app.get(`/${AuthenticationConstants.URL_API_SECURE}/todos/getAll`, function (req, res) {
            todosService.getAll()
            .then((response: any) => {
                return res.json(response);
            //response.data.pipe(res);
            })
            .catch(error => {
            res.status(error.statusCode).send(error.toString());
            });
        });

        app.post(`/${AuthenticationConstants.URL_API_SECURE}/todos`, function (req, res, next) {
            todosService.saveTodo(req.body)
                  .then(todoList => {
                    return res.json(todoList);
                  }).catch(err => next(err));
        });

        app.delete(`/${AuthenticationConstants.URL_API_SECURE}/todos/:id`, function (req, res, next) {
            todosService.deleteTodo(req.params.id)
                  .then(todoList => {
                    return res.json(todoList);
                  }).catch(err => next(err));
        });
    }
}