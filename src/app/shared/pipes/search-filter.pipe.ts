import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    let filtered_list=[]
    if((typeof value)=='object')
    {
      for(let value1 of value)
      {
        // "".toLowerCase()
        let name = (value1[args['searchFeild']]!=undefined && value1[args['searchFeild']]!='')? value1[args['searchFeild']].toLowerCase():value1[args['searchFeild']];
        let filter =(args['searchValue']!=undefined && args['searchValue']!='')? args['searchValue'].toLowerCase():args['searchValue'];
      if(name && name.search(filter)!=-1)
      {
        filtered_list.push(value1); 
      }
    }
    }
    return filtered_list;
  }

}
