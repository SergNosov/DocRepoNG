import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Doctype} from "../../model/Doctype";
import {ActivatedRoute, Router} from "@angular/router";
import {DoctypesServiceImpl} from "../../service_rest/impl/DoctypesServiceImpl";

@Component({
  selector: 'app-doctype-rest-form',
  templateUrl: './doctype-rest-form.component.html',
  styleUrls: ['./doctype-rest-form.component.css']
})
export class DoctypeRestFormComponent implements OnInit {

  private tempDoctype: Doctype = new Doctype(0, '');
  private tempDoctypeFormData: FormGroup;

  constructor(private fb: FormBuilder,
              private doctypesService: DoctypesServiceImpl,
              private router: Router,
              private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tempDoctypeFormData = this.fb.group({
      title: ['', Validators.required]
    });

    const id = this.activateRoute.snapshot.params['id'];

    if (id != 0) {
      this.doctypesService.getById(id).subscribe(
          data => {
            this.tempDoctype = new Doctype(data.id, data.title);
            this.tempDoctypeFormData.setValue({
              title: this.tempDoctype.title
            });
          }, error => {
            console.log(error.valueOf());
            alert("не найден тип документа: id = " + id + "\n" + error.message);
            this.router.navigate(['/doctypesRest']);
            //todo сообщение об ошибках сделать в отдельном компоненте
          });
    }
  }

  onSubmit() {
    if (!this.tempDoctypeFormData.invalid) {
      const newDoctype: Doctype = new Doctype(this.tempDoctype.id,
          this.tempDoctypeFormData.get('title').value);
      if (this.tempDoctype.id != 0) {
        if (!this.doctypesService.isEquals(this.tempDoctype, newDoctype)) {
          if (confirm("Сохранить изменения в типе документа c id=" + this.tempDoctype.id)) {
            this.saveOrUpdate(newDoctype);
          }
        }
      } else {
        if (confirm("Сохранить тип документа: " + newDoctype.title + "?")) {
          this.saveOrUpdate(newDoctype);
        }
      }
      this.router.navigate(['/doctypesRest']);
    } else {
      alert("не заполненны обязательные поля(*)");
    }
  }

  private saveOrUpdate(newDoctype: Doctype): void {
    this.doctypesService.saveOrUpdate(newDoctype).subscribe(
        data => {
        },
        error => {
          alert("Ошибка при сохранении doctype.id:" + newDoctype.id + "\n" + error.error.message);
          console.log(error.valueOf());
          //todo сообщение об ошибках сделать в отдельном компоненте
        }
    );
  }

}
