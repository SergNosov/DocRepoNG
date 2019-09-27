import { Component, OnInit } from '@angular/core';
import {Doctype} from "../../model/Doctype";
import {DataService} from "../../service/data.service";
import {DoctypeService} from "../../service/doctype.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctype-table',
  templateUrl: './doctype-table.component.html',
  styleUrls: ['./doctype-table.component.css']
})
export class DoctypeTableComponent implements OnInit {

  private doctypes: Doctype[];

  constructor(private doctypeService: DoctypeService,
              private router: Router) { }

  ngOnInit() {
    this.doctypeService.entitysBehaviorSubject.subscribe( entity => this.doctypes = entity);
  }

  deleteDoctype(doctype: Doctype) {
    if(confirm("Удалить тип документа: id("+doctype.id+"); "+doctype.title)) {
      this.doctypeService.delete(doctype);
    }
  }

    editDoctype(doctype: Doctype) {
        this.doctypeService.setEntityBehaviorSubject(doctype);
        this.router.navigate(['/doctype']);
    }

    newDoctype() {
        this.doctypeService.setEntityBehaviorSubject(null);
        this.router.navigate(['/doctype']);
    }
}
