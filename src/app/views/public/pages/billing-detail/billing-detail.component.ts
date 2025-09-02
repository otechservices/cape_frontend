import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillingService } from 'src/app/core/services/billing.service';

@Component({
  selector: 'app-billing-detail',
  templateUrl: './billing-detail.component.html',
  styleUrls: ['./billing-detail.component.css']
})
export class BillingDetailComponent implements OnInit {

  data:any
  token:any
  constructor(
    private billingService:BillingService,
    private route:ActivatedRoute,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.token =this.route.snapshot.paramMap.get('token')
   if( this.token!= undefined) this.get()
  }


  get(){
    this.billingService.getByToken(this.token).subscribe((res:any)=>{
      this.data=res.data
    },
    (err:any)=>{

    })
  }


  sendContact(form:NgForm){
    this.billingService.storeResponse({
      content:form.value.content,
      billing_id:this.data.id
    }).subscribe((res:any)=>{
      this.data=res.data
      form.resetForm()
      this.get()
    },
    (err:any)=>{

    })
  }
}
