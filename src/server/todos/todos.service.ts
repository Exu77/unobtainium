import { GoogleFileType } from './../googleApi/googleFileType.model';
import { Todo } from './../../common/types/todo.type';
import { GoogleApiHelper } from './../googleApi/google-api-helper';
import { resourceLimits } from 'worker_threads';
const { ErrorHandler } = require('./../error.handler')
const { 
    v4: uuidv4,
  } = require('uuid');
export class TodosService {
    private googleApiHelper: GoogleApiHelper;
    private googleDrive: any;
    private todoFileId: string | undefined;

    private readonly todoFileName = 'todos.json';

    constructor(googleApiHelper: GoogleApiHelper) {
        this.googleApiHelper = googleApiHelper;
        this.googleDrive = this.googleApiHelper.googleDrive
    }

    public async getAll(): Promise<Todo[]> {
        let result: Todo[] = [];
        const todoFileId = await this.getTodoFileId();
        console.log('todoFileId', todoFileId);
        if(todoFileId) {
            const tempResult = await this.googleApiHelper.getTextFileAsString(todoFileId);
            console.log('tempresult', tempResult);
            console.log('parsed', JSON.parse(tempResult))
            result = JSON.parse(tempResult) as Todo[];
            console.log('got todo json', result);
        }
        return result;
    }

    public async saveTodo(inputTodo: Todo): Promise<Todo[]> {
        if (!inputTodo) {
            throw new Error('Todo is empty');
        }
        const todoList = await this.getAll();
        if (!inputTodo.id) {
            inputTodo.id = uuidv4();
        }

        const todoIdx = this.getTodoListIndex(todoList, inputTodo.id);
        console.log('update Todo', inputTodo, todoIdx);
        if (todoIdx === -1) {
            todoList.push(inputTodo);
        } else {
            todoList.splice(todoIdx, 1, inputTodo);
        }

        await this.uploadTodoFile(todoList);

        return todoList;
    }

    public async deleteTodo(todoId: string): Promise<Todo[]> {
        const todoList = await this.getAll();
        const todoIdx = this.getTodoListIndex(todoList, todoId);
        if (todoIdx === -1) {
            throw new Error('No Todo with id found');
        } else {
            todoList.splice(todoIdx, 1);
        }

        await this.uploadTodoFile(todoList);

        return todoList;
    }

    private async getTodoFileId(): Promise<string> {
        if (this.todoFileId) return this.todoFileId;

        let queryString =  `'${this.googleApiHelper.rootFolder}' in parents and name = '${this.todoFileName}'`;
        let result: string = '';
        try {
            const tempResult = await this.googleDrive.files.list({
                q: queryString, 
                fields: 'files/name, files/id',
                orderBy: 'name'
              } );
  
            if(tempResult?.data?.files) {
                result = tempResult.data.files[0].id as string;
            }
          } catch (error) {
            throw new ErrorHandler(500, error);
          }
          if (!result) {
            throw new Error('todoFile not found ' + this.todoFileName);
        }

        return result;
    }

        
    private getTodoListIndex(todoList: Todo[], todoId: string): number {
        return todoList.findIndex(aTodo => {
            return aTodo.id === todoId;
        });
    }

    private async uploadTodoFile(todoList: Todo[]) {
        const todoFileId = await this.getTodoFileId();

        await this.googleApiHelper.updateJsonFile(todoFileId, todoList);
    }
}