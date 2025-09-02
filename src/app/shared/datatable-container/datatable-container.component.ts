import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datatable-container',
  templateUrl: './datatable-container.component.html',
  styleUrls: ['./datatable-container.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class DatatableContainerComponent implements OnInit {
  @ViewChild(DataTableDirective , {static: false}) dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {
    language: {
      processing:     "Traitement en cours...",
      search:         "Rechercher&nbsp;:",
      lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
      info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
      infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      infoPostFix:    "",
      loadingRecords: "Chargement en cours...",
      zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
      emptyTable:     "Aucune donnée disponible dans le tableau",
      paginate: {
          first:      "Premier",
          previous:   "Pr&eacute;c&eacute;dent",
          next:       "Suivant",
          last:       "Dernier"
      },
      aria: {
          sortAscending:  ": activer pour trier la colonne par ordre croissant",
          sortDescending: ": activer pour trier la colonne par ordre décroissant"
      }
      
  
    },
    responsive:true
  };
  dtTrigger: Subject<any> = new Subject<any>();
  selected_data:any;
  isDtInitialized:boolean = false
  @Input() data:any[]=[];
  @Input() dataHeaders:any[]=[];
  @Input() dataLabels:any[]=[];
  @Input() actionTemplate:any;

  @Output() checkedEvent = new EventEmitter<any>();


  reInitData(){
    this.selected_data=null
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(true);
      });
    } else {
      this.isDtInitialized = true
      this.dtTrigger.next(true);
    }
   }

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
    this.reInitData()
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
