import { AbstractControl } from '@angular/forms';
import {map} from 'rxjs/operators';
import { LayersService } from '../layers.service';

export class SematicNameCheck {
  static createValidator(ls:  LayersService) {
    return (control: AbstractControl) => {
      return ls.getLayersByName(control.value).pipe(map((res:  any) => {

        if  (res.unique)  {
        return null;
        } else  {
          return { name: res.unique};
        }
      }));
    };
  }
}
