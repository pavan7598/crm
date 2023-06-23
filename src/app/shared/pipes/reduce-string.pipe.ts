import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceString'
})
export class ReduceStringPipe implements PipeTransform {

  transform(value: String, args?: any): any {
    // debugger;
      if  (String(args).split('-rdot').length > 1)  {
        return value.slice(0, parseInt(  String(args).split('-')[0]  + '',  0)) ;
      }
    if  (value.length < parseInt(  args  + '',  0))    {
      return value;
    }
    return value.slice(0, parseInt(  args  + '',  0)) + '...';
  }

}
