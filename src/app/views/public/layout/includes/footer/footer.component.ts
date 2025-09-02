import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/utils/config-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
url:any

  constructor() { }

  ngOnInit(): void {
    this.url=ConfigService.admin_url
  }

}
