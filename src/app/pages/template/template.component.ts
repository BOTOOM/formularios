import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../servides/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'edwar',
    apellido: 'diaz',
    correo: 'eddiazruiz@acm.org'
  };

  constructor( private piasService: PaisService ) { }

  ngOnInit(): void {
    this.piasService.getPaises()
    .subscribe( paises => {
      console.log(paises);
    } );
  }


  guardar( forma: NgForm  ) {
    console.log(forma);

    if (forma.invalid) {
      Object.values(forma.controls).forEach( control => {
        control.markAsTouched();
      } );
      return;
    }

    console.log(forma.value);
    console.log(forma.valid);
  }
}
