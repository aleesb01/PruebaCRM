import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Ent_m_service} from 'app/shared/services/data/ent_m.services';
import { Ent_m, Ent_m_res } from 'app/model/ent_m';


@Component({
  selector: 'app-archwizard',
  templateUrl: './archwizard.component.html',
  styleUrls: ['./archwizard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchwizardComponent implements OnInit, AfterViewInit {

  cliente: Ent_m;
  personalForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  typeContactForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  addressForm = new FormGroup({
     street: new FormControl(''),
     city: new FormControl(''),
     state: new FormControl('')
  })

  /**
   * Constructor
   *
   * @param {HttpClient} http
   */
    constructor(private ref: ChangeDetectorRef, private http: HttpClient, private ent_m_service: Ent_m_service,) {
      this.cliente = new Ent_m();
    }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ref.detectChanges();
    }, 100);

  }

  onGuardar () {
      this.cliente.name = this.personalForm.value.name;
      //this.cliente. =
  }

}
