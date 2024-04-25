import { User } from './User';
import { Message } from './Message';

export interface Reaction {
    id: number;
    reaction: string;
    dateReact: Date;
    user: User;
    message: Message;
    archived: boolean;
}