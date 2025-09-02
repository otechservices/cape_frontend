import { Component, OnInit } from '@angular/core';
import { DashService } from 'src/app/core/services/dash.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:any
  role:any
  data:any
  constructor(
    private lsService:LocalStorageService,
    private dashService:DashService
  ) { }

  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name
    this.getAll()
  }

  getAll(){
    this.dashService.getAll().subscribe((res:any)=>{
      this.data=res.data
    },
    (err:any)=>{

    })
  }

}
