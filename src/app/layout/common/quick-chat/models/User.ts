export interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: TypeUser; // Assuming you have an enum defined for TypeUser
    photo: string;
}

export enum TypeUser {
    Admin = "Admin",
    Student = "Student"
}

export class UserClass implements User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: TypeUser;
    photo: string;

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