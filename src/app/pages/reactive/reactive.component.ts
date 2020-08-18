import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadiresService } from '../../services/validadires.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validadores: ValidadiresService
  ) {
    this.crearFormulario();
    this.cargarData();
    this.crearListeners();
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

  get usuarioNovalido() {
    return this.forma.get('usuario').invalid  && this.forma.get('usuario').touched;
  }

  get distritoNovalido() {
    return this.forma.get('direccion.distrito').invalid  && this.forma.get('direccion.distrito').touched;
  }

  get cuidadNovalido() {
    return this.forma.get('direccion.cuidad').invalid  && this.forma.get('direccion.cuidad').touched;
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray ;
  }
  get pass1Novalido() {
    return this.forma.get('pass1').invalid  && this.forma.get('pass1').touched;
  }
  get pass2Novalido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    // return this.forma.get('pass1').invalid  && this.forma.get('pass1').touched;
    return (pass1 === pass2) ? false : true;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)] ],
      apellido: ['', [Validators.required, this.validadores.noDiaz]],
      pass1: ['', [Validators.required]],
      pass2: ['', [Validators.required]],
      correo: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') , Validators.required ]],
      usuario: ['', , this.validadores.existeUsuario],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        cuidad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([
      ])
    }, {
      validators: [this.validadores.passwordsIguales('pass1', 'pass2')]
    });
  }

  crearListeners() {
    // this.forma.valueChanges.subscribe( valor => {
    //   console.log(valor);
    // });

    // this.forma.statusChanges.subscribe( status => {
    //   console.log(status);
    // });

    this.forma.get('nombre').valueChanges.subscribe( console.log);
  }

  cargarData() {
    // this.forma.setValue({
    this.forma.reset({
      nombre: 'Antony',
      apellido: 'Stack',
      correo: 'iron@man.com',
      pass1: '456',
      pass2: '456',
      direccion: {
        distrito: 'torre A',
        cuidad: 'new york'
      }
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push( this.fb.control('', Validators.required) );
  }
  BorrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
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
    // cuidado con los select
    this.forma.reset();
  }

}
