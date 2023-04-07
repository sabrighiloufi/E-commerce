import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
user = JSON.parse(localStorage.getItem("user")!) 
cartitems:any
myDate = new Date();
id:any
  constructor(private cartservice:CartService) { }

  ngOnInit(): void {
    this.id = Math.floor(Math.random() * (9999 - 999 + 1) + 999)
    console.log(this.user)
    this.loaditems()
  }

  loaditems(){
    this.cartservice.loadCart()
    this.cartitems = this.cartservice.getItems()
    console.log(this.cartitems)
  }
  
  TotalPrice(){
    let total =0
    for(let p of this.cartitems){
      total = total + (p.price * p.quantity)
    }
    return total
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`facture-${this.id}.pdf`);
    });
  }

}
