import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datatable-container',
  templateUrl: './datatable-container.component.html',
  styleUrls: ['./datatable-container.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class DatatableContainerComponent implements OnInit {




  selected_data:any;
  isDtInitialized:boolean = false
  @Input() data:any[]=[];
  @Input() dataHeaders:any[]=[];
  @Input() dataLabels:any[]=[];
  @Input() actionTemplate:any;

  @Output() checkedEvent = new EventEmitter<any>();




   constructor(
    private router:Router,
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private toastrService:ToastrService
    ) { 
      config.backdrop = 'static';
      config.keyboard = false;
    }

   
   ngOnInit(): void {
   

  }
  
  ngAfterViewInit(): void {
    
    $(document).ready(function(){
       $('.form-select').removeClass('form-select-sm')
       $('.form-select').removeClass('form-select')

    })
   
  }

  open(content:any) {
    this.modalService.open(content);
  }



  checked(el:any){
    this.selected_data=el
    this.checkedEvent.emit(el);

  }

  verifyIfElementChecked(){
    if (this.selected_data==null) {
      this.toastrService.warning("Aucun élément selectionné");
      return false;
    }
    return true;
  }

  add(event:any){
    if (this.actionTemplate?.add.type == 1) {
        this.router.navigate([this.actionTemplate?.add.path])
    } else {
      this.open(this.actionTemplate?.add.path)
    }
  }
  edit(event:any){
    if(!this.verifyIfElementChecked()) return ;
    if (this.actionTemplate?.edit == 1) {
      this.router.navigate([this.actionTemplate?.edit.path])
    } else {
      this.open(this.actionTemplate?.ecit.path)
    }
  }
  show(event:any){
    if(!this.verifyIfElementChecked()) return ;
    if (this.actionTemplate?.show == 1) {
      this.router.navigate([this.actionTemplate?.show.path])
    } else {
      this.open(this.actionTemplate?.show.path)
    }
  }
  
  delete(event:any){
    if(!this.verifyIfElementChecked()) return ;

  }
  

}
