import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/core/services/file.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';

@Component({
  selector: 'app-verify-document',
  templateUrl: './verify-document.component.html',
  styleUrls: ['./verify-document.component.css']
})
export class VerifyDocumentComponent implements OnInit {
  data:any
  url:SafeResourceUrl | undefined
  showPreview=false
  loading:any
  
  constructor(
    private fileService:FileService,
    private activatedRoute:ActivatedRoute,
    private _sanitizationService: DomSanitizer,
  ) { }

  ngOnInit(): void {

    let token=this.activatedRoute.snapshot.paramMap.get('token');

    this.loading=true
      this.fileService.get(token).subscribe((res:any)=>{
        this.data=res.data;
        this.showFile(this.data.filename)
        this.loading=false

      },(err:any)=>{
        this.loading=false
  
          AppSweetAlert.simpleAlert("error","Vérification de document",err.error.message)
      })

  }


  showFile(filename:any){

    let url=ConfigService.toFile("docs/"+this.data.requete.code+"/"+filename);
    this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    this.showPreview=true
 }
 back(){
  this.showPreview=false
}
}
