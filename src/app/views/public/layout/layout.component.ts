import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  mybutton:any
  constructor() { }

  ngOnInit(): void {
    this.mybutton = document.getElementById("myBtn");
    window.onscroll = ()=>this.scrollFunction();

  }

   scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.mybutton.style.display = "block";
    } else {
      this.mybutton.style.display = "none";
    }
  }
  
  // When the user clicks on the button, scroll to the top of the document
   topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

}
