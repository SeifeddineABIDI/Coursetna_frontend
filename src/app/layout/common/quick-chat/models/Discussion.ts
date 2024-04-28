import { User } from './User';


export interface Discussion {
    id: number;
    title: string;
    dateStart: Date;
    typeDiscussion: TypeDiscussion;
    users: User[];
    community: Discussion[];
    photo: string;
    archived: boolean;
}

export enum TypeDiscussion {
    Duo = "Duo",
    Group = "Group",
    Community = "Community",
    CommunitySlave = "CommunitySlave"
}
  