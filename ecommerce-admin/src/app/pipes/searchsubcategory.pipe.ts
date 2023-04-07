import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchsubcategory'
})
export class SearchsubcategoryPipe implements PipeTransform {

  transform(value: any, term:any) {
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.name.includes(term)))
    }
  }

}
