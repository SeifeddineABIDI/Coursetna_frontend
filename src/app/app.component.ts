import { Component } from '@angular/core';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
    filterListCriteriaByValue(list:any[],criteria:string,value:number)
    {
        return list.filter((item) => item[criteria] == value);
    }
}
