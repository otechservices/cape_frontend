import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/utils/config-service';

@Component({
  selector: 'app-public-footer',
  templateUrl: './public-footer.component.html',
  styleUrls: ['./public-footer.component.css']
})
export class PublicFooterComponent implements OnInit {
url:any

  constructor() { }

  ngOnInit(): void {
    this.url=ConfigService.admin_url
  }

}
