import { Component, OnInit } from '@angular/core';
import {Doctype} from "../../model/Doctype";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-doctype-table',
  templateUrl: './doctype-table.component.html',
  styleUrls: ['./doctype-table.component.css']
})
export class DoctypeTableComponent implements OnInit {

  private doctypes: Doctype[];

  constructor(private dataHandler: DataService) { }

  ngOnInit() {
    this.dataHandler.doctypeBehaviorSubject.subscribe( newDoctypes => this.doctypes = newDoctypes);
  }

}
