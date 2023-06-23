import { AbstractControl } from '@angular/forms';
import { PlayerSelectionService } from './player-selection.service';
import {map} from 'rxjs/operators';
export class NameCheck {
  static createValidator(pss:  PlayerSelectionService) {
    return (control: AbstractControl) => {
      return pss.nameCheck(control.value).pipe(map((res:  any) => {
        if(res.unique)  {
        return null;
        } else  {
          return { name: res.unique};
        }
      }));
    };
  }
}
