import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sampleSearch'
})
export class SampleSearchPipe implements PipeTransform {

  transform(value: any, searchText:String): any {
    return (searchText != '') ? value.filter((item:any) => {   
      return item.name.includes(searchText) || item.address.includes(searchText);
    }) : value;
  }

}