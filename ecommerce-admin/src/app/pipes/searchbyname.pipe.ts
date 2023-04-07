import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchbyname'
})
export class SearchbynamePipe implements PipeTransform {

  transform(value: any, term: any) {
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.refproduct.includes(term)))
    }
  }

}
