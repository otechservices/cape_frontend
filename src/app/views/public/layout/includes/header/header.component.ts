import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public visible:any = false;
  constructor() { }

  ngOnInit(): void {
  }
  manageNavbar()
  {
    this.visible = !this.visible
  }

}
