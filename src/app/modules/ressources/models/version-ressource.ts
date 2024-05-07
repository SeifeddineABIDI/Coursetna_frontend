export class VersionRessource {

    id: number | undefined;
    versionName: string | undefined;
    cheminFichier: string | undefined;
   ressourceId: number| undefined;

  
    constructor(data?: any) {
      if (data) {
        this.id = data.id;
        this.versionName = data.versionName;
        this.cheminFichier = data.cheminFichier;
        this.ressourceId = data.ressourceId;
       
       
  
      }
  }
  
  
    
}
