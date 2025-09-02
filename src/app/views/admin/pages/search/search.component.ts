import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
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
  @ViewChild(DataTableDirective , {static: false})
  dtElement!: DataTableDirective;
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
      
  
    }
  };
  dtTrigger: Subject<any> = new Subject<any>();
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

  reInitData(){
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      
        dtInstance.destroy();
        this.dtTrigger.next(false);
      });
    } else {
      this.isDtInitialized = true
      this.dtTrigger.next(false);
    }
   }
  
  getForCape(){
    this.searchService.getAll(this.type,undefined, this.service_id).subscribe((res:any)=>{
      this.data=res
      this.filteredData=this.data
    this.reInitData()  

    },
    (err:any)=>{

    })
  }
  getForCapeAuthorized(){
    this.searchService.getAll(this.type,undefined, this.service_id).subscribe((res:any)=>{
      this.data=res
      this.filteredData=this.data

      this.reInitData()  

    },
    (err:any)=>{

    })
  }
  reset(form:NgForm){
    form.resetForm()
  }
}
