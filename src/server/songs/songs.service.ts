import { GoogleFileType } from './../googleApi/googleFileType.model';
import { GoogleApiHelper } from '../googleApi/google-api-helper';
import { Song } from '../../common/types/song.type';
import { SongFile, SongFolder } from '../../common/types/song.type';
import CacheService from '../cache.service';
const { ErrorHandler } = require('./../error.handler')

const {google} = require('googleapis');

class SongsService {
    private readonly scopes = ['https://www.googleapis.com/auth/drive'];

    private readonly cacheKeySong = 'getSong?'
    private readonly cacheKeySongFolders = 'getSongFolders'
    private readonly cacheKeyFileContent = 'getFileContent?'

    private readonly ttlSeconds = 1;
    private googleApiHelper: GoogleApiHelper;
    private googleDrive: any;
    private cacheService: CacheService;

    constructor() {
        this.googleApiHelper = new GoogleApiHelper();
        this.googleDrive = this.googleApiHelper.googleDrive
        this.cacheService = new CacheService(this.ttlSeconds);
    }

    public async getSongFolders(): Promise<SongFolder[]> {
        let result: SongFolder[] = [];
        const cacheKey = this.cacheKeySongFolders;

        let queryString =  `'${this.googleApiHelper.rootFolder}' in parents and mimeType = '${GoogleFileType.FOLDER}'`;
        const cachedResult = this.cacheService.get(cacheKey) as SongFolder[];
        
        if (cachedResult) return Promise.resolve(cachedResult);
        
        try {
          const tempResult = await this.googleDrive.files.list({
              q: queryString, 
              fields: 'files/name, files/id',
              orderBy: 'name'
            } );

          if(tempResult?.data?.files) {
            result = tempResult.data.files;
            this.cacheService.set(cacheKey, result)
          }
        } catch (error) {
          throw new ErrorHandler(500, error);
        }


        return result;
    }

    public async getSongFiles(name: string | null, id: string | null): Promise<Song> {
      const aFolder = await this.getFolder(name, id);

      const cacheKey = `${this.cacheKeySong}${aFolder.id}`;
      const tempResult = this.cacheService.get<Song>(cacheKey);

      if (tempResult) return Promise.resolve(tempResult);

      const songObj: Song = {
        title: aFolder.name,
        folderId: aFolder.id,
        chordSheets: [],
        tabs: [],
        videoLinks: [],
        recordings: [],
      }
  
      const songFiles = await this.getFileList(songObj.folderId, null);
      for (const aFile of songFiles) {
        if (aFile.mimeType === GoogleFileType.PDF || aFile.mimeType === GoogleFileType.WORD || aFile.mimeType === GoogleFileType.GOOGLE_DOC) {
          songObj.chordSheets?.push(aFile);
        } else if (aFile.mimeType === GoogleFileType.GUITAR_PRO || aFile.mimeType === GoogleFileType.ZIP) {
          songObj.tabs?.push(aFile);
        } else if (aFile.mimeType === GoogleFileType.AUDIO_MP3 || aFile.mimeType === GoogleFileType.AUDIO_M4A || aFile.mimeType === GoogleFileType.AUDIO_MPEG) {
          songObj.recordings?.push(aFile);
        } else {
          console.warn('no idea what to do with this file', aFile.name, aFile.mimeType)
        }
      }

      this.cacheService.set(cacheKey, songObj);

      return songObj;
    }

    public async getFileContent(id: string): Promise<any> {
      // Tried to cache it but it didn't work
      const result = await this.googleDrive.files.get({
        fileId: id,
        alt: 'media',
      }, { responseType: 'stream' })

      return result;
    }

    private async getFolder(name: string | null, id: string | null): Promise<SongFolder> {
      let tempResult = null;
      if (!name && !id) {
        throw new ErrorHandler(404, 'please call with a song id or song name');
      }

      const songFolders = await this.getSongFolders();
      let folderIdx: number = -1;
      if (id) {
        folderIdx = songFolders.findIndex(aFolder => id === aFolder.id);
      }

      if (folderIdx === -1 && name) {
        folderIdx = songFolders.findIndex(aFolder => name === aFolder.name);
      }

      if (folderIdx === -1) {
        throw new ErrorHandler(404, `now song found with id ${id} name ${name}`)
      }

      return songFolders[folderIdx];
    }

    private async getFileList(parent: string | null = null, mimeType: string | null = null): Promise<SongFile[]> {
        let result: SongFile[] = [];
        let queryString = "";
        if (parent) {
          queryString += `'${parent}' in parents`;
        }
      
        if (mimeType) {
          if (queryString.length > 0) {
            queryString += " and ";
          }
          queryString += `mimeType = '${mimeType}'`;
        }
        try {
          const tempResult = await this.googleDrive.files.list({
            q: queryString, 
            fields: 'files/webContentLink, files/modifiedTime, files/name, files/id, files/iconLink, files/webViewLink, files/mimeType',
            orderBy: 'name'
          } );
          result = tempResult.data.files;
        } catch (error) {
          throw new ErrorHandler(error.status, error);
        };
        return result;
      }
}

export default SongsService;