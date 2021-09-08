import { ObjectWithid } from '../../common/types/object-with-id.type';
import { GoogleFileType } from './googleFileType.model';
import { Todo } from '../../common/types/todo.type';
import { GoogleApiHelper } from './google-api-helper';
import { resourceLimits } from 'worker_threads';
const { ErrorHandler } = require('./../error.handler')
const { 
    v4: uuidv4,
  } = require('uuid');
export class JsonFileManager {
    private googleApiHelper: GoogleApiHelper;
    private googleDrive: any;
    private jsonFileId: string | undefined;

    private readonly jsonFileName: string;

    constructor(
        googleApiHelper: GoogleApiHelper,
        fileName: string,
    ) {
        this.googleApiHelper = googleApiHelper;
        this.googleDrive = this.googleApiHelper.googleDrive;
        this.jsonFileName = fileName;
    }

    public async getAll(): Promise<ObjectWithid[]> {
        let result: ObjectWithid[] = [];
        const jsonFileId = await this.getFileId();
        if(jsonFileId) {
            const tempResult = await this.googleApiHelper.getTextFileAsString(jsonFileId);
            result = JSON.parse(tempResult) as ObjectWithid[];
        }
        return result;
    }

    public async save(inputObj: Todo): Promise<ObjectWithid[]> {
        if (!inputObj) {
            throw new Error('Object is empty');
        }
        const objectList = await this.getAll();
        if (!inputObj.id) {
            inputObj.id = uuidv4();
        }

        const listIdx = this.getObjectListIndex(objectList, inputObj.id);
        if (listIdx === -1) {
            objectList.push(inputObj);
        } else {
            objectList.splice(listIdx, 1, inputObj);
        }

        await this.uploadFile(objectList);

        return objectList;
    }

    public async delete(theId: string): Promise<ObjectWithid[]> {
        const objList = await this.getAll();
        const listIdx = this.getObjectListIndex(objList, theId);
        if (listIdx === -1) {
            throw new Error('No Todo with id found');
        } else {
            objList.splice(listIdx, 1);
        }

        await this.uploadFile(objList);

        return objList;
    }

    private async getFileId(): Promise<string> {
        if (this.jsonFileId) return this.jsonFileId;

        let queryString =  `'${this.googleApiHelper.rootFolder}' in parents and name = '${this.jsonFileName}'`;
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
            throw new Error('todoFile not found ' + this.jsonFileName);
        }

        return result;
    }

        
    private getObjectListIndex(objList: ObjectWithid[], theId: string | undefined): number {
        return objList.findIndex(aObj => {
            return aObj.id === theId;
        });
    }

    private async uploadFile(objList: ObjectWithid[]) {
        const todoFileId = await this.getFileId();

        await this.googleApiHelper.updateJsonFile(todoFileId, objList);
    }
}