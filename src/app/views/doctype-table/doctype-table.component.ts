import { Component, OnInit } from '@angular/core';
import {Doctype} from "../../model/Doctype";
import {DataHandlerService} from "../../service/data-handler.service";

@Component({
  selector: 'app-doctype-table',
  templateUrl: './doctype-table.component.html',
  styleUrls: ['./doctype-table.component.css']
})
export class DoctypeTableComponent implements OnInit {

  private doctypes: Doctype[];

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit() {
    this.dataHandler.doctypeBehaviorSubject.subscribe( newDoctypes => this.doctypes = newDoctypes);
  }

}
