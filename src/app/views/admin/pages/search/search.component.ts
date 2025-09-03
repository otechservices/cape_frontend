import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DepartmentService } from 'src/app/core/services/department.service';
import { SearchService } from 'src/app/core/services/search.service';
import { TypeService } from 'src/app/core/services/type.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  type:any
  data:any[]=[]
  filteredData:any[]=[]
  departments:any[]=[]
  municipalities:any[]=[]
  districts:any[]=[]

 


  isDtInitialized:boolean = false
  service_id:any;
  service:any;

  constructor(
    private typeService:TypeService,
    private searchService:SearchService,
    private departmentService:DepartmentService,
    private route:ActivatedRoute,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.type= this.route.snapshot.paramMap.get('type');
      this.service =this.route.snapshot.paramMap.get('service')

      this.setServiceId()

    })
  this.getDepartmentWithRelations()

  }
  setServiceId(){
    this.typeService.getAll2().subscribe((res:any)=>{
      res.data.forEach((element:any) => {

        if(element.name.toLowerCase().includes(this.service.toLowerCase()))this.service_id=element.id
      });
      console.log(this.service_id)
      if (this.service_id!=undefined) {
        switch (this.type) {
          case 'cape-inscrits':
            this.getForCape()
            break;
          case 'cape-autorises':
            this.getForCapeAuthorized()
            break;
       
          default:
            break;
        }
  
      }else{
        this.toastrService.info('Impossible de charger les données, service non reconnue','Requêtes')
      }
      
    })

  }


  getDepartmentWithRelations(){
    this.departmentService.getDepartmentWithRelation().subscribe((res:any)=>{
      this.departments=res.data

    },
    (err:any)=>{

    })
  }
  filter(event:any){
   this.filteredData=this.data.filter((el:any)=>el.district.id == event.target.value)
  }
  
  loadMunicipalities(event:any){
    this.filteredData=this.data.filter((el:any)=>el.district?.municipality?.department?.id == event.target.value)
    this.municipalities=  this.departments.find((el:any)=>el.id == event.target.value).municipalities
  }
  loadDistricts(event:any){
    this.filteredData=this.data.filter((el:any)=>el.district?.municipality?.id == event.target.value)

  this.districts=  this.municipalities.find((el:any)=>el.id == event.target.value).districts
  }


  
  getForCape(){
    this.searchService.getAll(this.type,undefined, this.service_id).subscribe((res:any)=>{
      this.data=res
      this.filteredData=this.data
      

    },
    (err:any)=>{

    })
  }
  getForCapeAuthorized(){
    this.searchService.getAll(this.type,undefined, this.service_id).subscribe((res:any)=>{
      this.data=res
      this.filteredData=this.data

        

    },
    (err:any)=>{

    })
  }
  reset(form:NgForm){
    form.resetForm()
  }
}
