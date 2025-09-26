import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CapeService } from 'src/app/core/services/cape.service';
import { MessageService } from 'src/app/core/services/message.service';
import { RequeteService } from 'src/app/core/services/requete.service';
import { TypeService } from 'src/app/core/services/type.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-list-cape',
  templateUrl: './list-cape.component.html',
  styleUrls: ['./list-cape.component.css']
})
export class ListCapeComponent implements OnInit {

  Math = Math; // 👈 rend accessible `Math` dans le template

  buttonsPermission :any|undefined;
  structures:any[] =[]
  data:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false
  state:any
  role:any
  user:any
  title:any
  type:string  | null  ="cape"
  service_id:any



    searchTerm = '';
  itemsPerPage = 10;
  currentPage = 1;
totalElements=0
    filteredData: any[] = [];
  totalPages = 1;
  startIndex = 0;
  currentItems: any[] = [];

  constructor(
    private reqService:RequeteService,
    private typeService:TypeService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
      private activatedRoute:ActivatedRoute,
      private route:ActivatedRoute,
    private modalService: NgbModal) {
     config.backdrop = 'static';
     config.keyboard = false;
     }


  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };

    this.activatedRoute.paramMap.subscribe(params => {
      this.type=this.activatedRoute.snapshot.paramMap.get('type')
      this.init()

    })
  }

  init(){
    this.setServiceId()
  }

  setServiceId(){
    this.typeService.getAll2().subscribe((res:any)=>{
      res.data.forEach((element:any) => {
        if(element.name.toLowerCase().includes(this.type?.toLowerCase()))this.service_id=element.id
      });
      console.log(this.service_id)
      this.getAll()
    })

  }
 
  getAll(){
    this.reqService.getListForPublic(this.service_id).subscribe((res:any)=>{
      this.data=res
      this.applyFilters()
      
    },
    (err:any)=>{

    })
  }


  generatePageNumbers(): number[] {
  const pages: number[] = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
}




  
  dismiss(){
    this.modalService.dismissAll()
  }

  add(content:any){
    this.modalService.open(content,{size:'lg'});
  }



  applyFilters() {
    // filtrage
    this.filteredData = this.data.filter(garderie =>
      garderie.name.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      // ||
      // garderie.responsable.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      // garderie.localisation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalElements=this.filteredData.length
    // pagination
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.currentItems = this.filteredData.slice(this.startIndex, this.startIndex + this.itemsPerPage);
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.applyFilters();
  }

  handleItemsPerPageChange(items: number) {
    this.itemsPerPage = items;
    this.currentPage = 1;
    this.applyFilters();
  }



}
