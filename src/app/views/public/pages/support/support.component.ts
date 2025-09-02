import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BillingService } from 'src/app/core/services/billing.service';
import { InfoService } from 'src/app/core/services/info.service';
import { TypeBillingService } from 'src/app/core/services/type-billing.service';
import { TypeInfoService } from 'src/app/core/services/type-info.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
