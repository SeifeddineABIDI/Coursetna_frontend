export interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: TypeUser; // Assuming you have an enum defined for TypeUser
    photo: string;
    isArchived: boolean;
    isBanned: boolean;
}

export enum TypeUser {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT"
}

export class UserClass implements User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: TypeUser;
    photo: string;
    isArchived: boolean;
    isBanned: boolean;
    

    constructor(
        id: number,
        nom: string,
        prenom: string,
        email: string,
        password: string,
        role: TypeUser,
        photo: string
    ) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.role = role;
        this.photo = photo;
    }
}