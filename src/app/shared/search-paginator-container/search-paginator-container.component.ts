import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-paginator-container',
  templateUrl: './search-paginator-container.component.html',
  styleUrls: ['./search-paginator-container.component.css']
})
export class SearchPaginatorContainerComponent implements OnInit {
  p: number = 1;
  searchText:String=""
  selected_data=null
  @Input() actionTemplate:any;
  @Input() dataHeaders:any[]=[];
  @Input() dataLabels:any[]=[];
  @Input() data:any[]=[];
  @Input() paginator={
    pageSize:0,
    p:0,
    total:0
  };
  @Output() pageChangedEvent = new EventEmitter<string>();
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

  pageChanged(event:any){
    this.pageChangedEvent.emit(event);
  }
  
  checked(el:any){
    this.selected_data=el
    this.checkedEvent.emit(el);

  }

  
  open(content:any) {
    this.modalService.open(content);
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

    console.log(event)

  }
}
