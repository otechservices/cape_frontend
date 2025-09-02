import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InfoService } from 'src/app/core/services/info.service';
import { TypeInfoService } from 'src/app/core/services/type-info.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  data:any
  loading=false
  constructor(
    private typeInfoService:TypeInfoService,
    private infoService:InfoService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getAll()
  }


  getAll(){
    this.typeInfoService.getAll2().subscribe((res:any)=>{
      this.data=res.data
    },
    (err:any)=>{

    })
  }



  sendContact(form:NgForm){
    delete form.value.has_consent
    this.loading=true

    this.infoService.store(form.value).subscribe((res:any)=>{
      this.data=res.data
      form.resetForm()
      this.loading=false
    },
    (err:any)=>{
      this.loading=false

    })
  }

}
