import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { RequeteService } from 'src/app/core/services/requete.service';
import { TypeService } from 'src/app/core/services/type.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-requetes',
  templateUrl: './requetes.component.html',
  styleUrls: ['./requetes.component.css']
})
export class RequetesComponent implements OnInit {


 


  buttonsPermission :any|undefined;
  structures:any[] =[]
  data:any[] =[]
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  get filteredData(): any[] {
    if (!this.searchTerm || this.searchTerm.trim() === '') return this.data;
    const term = this.searchTerm.toLowerCase().trim();
    return this.data.filter(item => this.deepSearch(item, term));
  }

  private deepSearch(obj: any, term: string): boolean {
    if (obj === null || obj === undefined) return false;
    if (typeof obj === 'string') return obj.toLowerCase().includes(term);
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj).toLowerCase().includes(term);
    if (Array.isArray(obj)) return obj.some(item => this.deepSearch(item, term));
    if (typeof obj === 'object') return Object.values(obj).some(val => this.deepSearch(val, term));
    return false;
  }
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false
  service_id:any;
  type:any;
  role:any
  user:any


  constructor(
    private typeService:TypeService,
    private activatedRoute:ActivatedRoute,
    private requeteService:RequeteService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
    private modalService: NgbModal) {
     config.backdrop = 'static';
     config.keyboard = false;
     }


  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.activatedRoute.paramMap.subscribe(params => {
      this.type=params.get('type')
      this.init()
    })
    
    this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
  }

  init(){
    
    this.setServiceId()
  }

  setServiceId(){
    this.typeService.getAll2().subscribe((res:any)=>{
      res.data.forEach((element:any) => {
        console.log(this.type)
        console.log(element)
        if(element.name.toLowerCase().includes(this.type.toLowerCase()))this.service_id=element.id
      });
      console.log(this.service_id)
      this.getAll()
    })

  }
 
 
  getAll(){
    this.requeteService.getAll(this.service_id).subscribe((res:any)=>{
      this.data=res.data
      this.modalService.dismissAll()
      
    },
    (err:any)=>{

    })
  }



  
  dismiss(){
    this.modalService.dismissAll()
  }

  add(content:any){
    this.modalService.open(content,{size:'lg'});
  }

  getJson(value:any){
    if (value==undefined) {
      return []
    } else {
      return JSON.parse(value)

    }
    
  }
}
