import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadiresService {

  constructor() { }

  noDiaz( control: FormControl ): {[s: string]: boolean}  {
    if (control.value?.toLowerCase() === 'diaz' ) {
      return {
        noDiaz: true
      };
    }
    return null;
  }
}
