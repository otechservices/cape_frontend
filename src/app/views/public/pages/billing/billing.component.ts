import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BillingService } from 'src/app/core/services/billing.service';
import { TypeBillingService } from 'src/app/core/services/type-billing.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  data:any
  constructor(
    private typeBillingService:TypeBillingService,
    private billingService:BillingService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getAll()
  }


  getAll(){
    this.typeBillingService.getAll2().subscribe((res:any)=>{
      this.data=res.data
    },
    (err:any)=>{

    })
  }



  sendContact(form:NgForm){
    this.billingService.store(form.value).subscribe((res:any)=>{
      this.data=res.data
      form.resetForm()
    },
    (err:any)=>{

    })
  }
}
