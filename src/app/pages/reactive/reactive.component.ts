import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }


  get nombreNovalido() {
    return this.forma.get('nombre').invalid  && this.forma.get('nombre').touched;
  }

  get apellidoNovalido() {
    return this.forma.get('apellido').invalid  && this.forma.get('apellido').touched;
  }

  get correoNovalido() {
    return this.forma.get('correo').invalid  && this.forma.get('correo').touched;
  }

  get distritoNovalido() {
    return this.forma.get('direccion.distrito').invalid  && this.forma.get('direccion.distrito').touched;
  }

  get cuidadNovalido() {
    return this.forma.get('direccion.cuidad').invalid  && this.forma.get('direccion.cuidad').touched;
  }
  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)] ],
      apellido: ['', Validators.required],
      correo: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') , Validators.required ]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        cuidad: ['', Validators.required],
      }),
    });
  }

  guardar() {
    console.log(this.forma);

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values(control.controls).forEach( controlF => controlF.markAllAsTouched() );
        } else {
          control.markAsTouched();
        }
      } );
    }
  }

}
