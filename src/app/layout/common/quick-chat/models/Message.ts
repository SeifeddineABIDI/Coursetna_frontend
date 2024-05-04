import { User } from './User';
import { Reaction } from './Reaction'; 
import { Discussion } from './Discussion'; 

export interface Message {
    id: number;
    message: string;
    dateSent: Date;
    dateModified: Date;
    user: User; 
    discussion: Discussion; 
    reactions: Reaction[]; 
    reply: Message | null;
    pinned: boolean;
    archived: boolean;

}