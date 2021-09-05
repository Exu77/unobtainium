import { SongFolder } from "./song.type";

export interface Todo {
    id: string;
    description: string;
    song?: SongFolder;
    responsible?: string;
}