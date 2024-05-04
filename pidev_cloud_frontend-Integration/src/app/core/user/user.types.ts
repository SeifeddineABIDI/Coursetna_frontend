import { Role } from "./role";

export interface User
{
    id: number;
    name: string;
    nom?: string;
    prenom?: string;
    email?: string;
    role: Role
    photo?: string;
    avatar?: string;
    status?: string;
    access_token?: string;
    refresh_token?: string;
}
export class User {
    static currentUser: User | null = null;
}