import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CapeService } from 'src/app/core/services/cape.service';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-follow-cape-show',
  templateUrl: './follow-cape-show.component.html',
  styleUrls: ['./follow-cape-show.component.css']
})
export class FollowCapeShowComponent implements OnInit {
  url:SafeResourceUrl | undefined

  showPreview=false
data:any
id:any

user:any
role:any
  constructor(
    private capeService:CapeService,
    private route:ActivatedRoute,
    private _sanitizationService: DomSanitizer,
    private lsService:LocalStorageService

  ) { }

  ngOnInit(): void {
    
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name
    this.id=this.route.snapshot.paramMap.get('id');
    this.getData()
  }


  getData(){
    this.capeService.get(this.id).subscribe((res:any)=>{
      this.data=res.data
    },
    (err:any)=>{

    })
  }

  getJson(value:any){
    if (value==undefined) {
      return []
    } else {
      return JSON.parse(value)

    }
    
  }

  showFile(filename:any){

    let url=ConfigService.toFile("docs/"+this.data.requete.code+"/"+filename);
    this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    this.showPreview=true
  // window.location=url 
 }


 back(){
  this.showPreview=false
}
}
