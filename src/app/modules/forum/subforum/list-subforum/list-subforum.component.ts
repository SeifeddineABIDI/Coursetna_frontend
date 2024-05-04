import { Component, OnInit } from '@angular/core';
import { Subforum } from '../subforum.model';
import { SubforumService } from '../subforum.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-subforum',
  templateUrl: './list-subforum.component.html',
  styleUrls: ['./list-subforum.component.scss']
})
export class ListSubforumComponent implements OnInit {
  subforums : Array<Subforum>;
  constructor(private subforumService: SubforumService) { }

  ngOnInit() {
    this.subforumService.getAllSubforums().subscribe(data => {
      this.subforums = data;
    }, error => {
      throwError(error);
    })
  }

}
