import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { CpsService } from 'src/app/core/services/cps.service';
import { DepartmentService } from 'src/app/core/services/department.service';
import { SearchService } from 'src/app/core/services/search.service';
import { StatisticService } from 'src/app/core/services/statistic.service';
import { TypeService } from 'src/app/core/services/type.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  filteredData:any[]=[]
  departments:any[]=[]
  municipalities:any[]=[]
  districts:any[]=[]
  labels:any[]=[]
  labels2:any[]=[]
  chartData: ChartDataset[] = [];
  values: any[] = [];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {
      // ⤵️ Fill the wrapper
      responsive: true,
      maintainAspectRatio: true,
      // ⤵️ Remove the main legend
      plugins: {
        legend: {
          display: true
        }
      }
  };
  type:any
  data:any
  cps:any=[];
  departId:any;
  departId2:any;
  readonlyDepart:any;
  user:any
  role:any
  orderedData:any
  service_id:any;
  service:any;

  constructor(
    private typeService:TypeService,
    private statisticService:StatisticService,
    private cpsService:CpsService,
    private route:ActivatedRoute,
    private departmentService:DepartmentService,
    private lsService:LocalStorageService,
    private toastrService:ToastrService,
    ) { }

  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name
    this.route.paramMap.subscribe(params => {
      this.type= this.route.snapshot.paramMap.get('type');
      this.service =this.route.snapshot.paramMap.get('service')

      this.data=[]
      this.chartData=[]
      this.chartLabels=[]

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
          case 'controls':
            this.getForControl()
            break;
          case 'cps':
            this.getForCps()
            this.getCps()
            break;
        
          default:
            break;
        }
  
      }else{
        this.toastrService.info('Impossible de charger les données, service non reconnue','Requêtes')
      }
      
    })

  }

  getCps(){
    this.cpsService.getAll().subscribe((res:any)=>{
      this.cps= res.data
    },
    (err:any)=>{

    })
  }

  getForCape(){
    this.statisticService.getAll(this.type, undefined, this.service_id).subscribe((res:any)=>{
      this.data=res.data
      this.labels=res.labels
      this.orderedData=res
      this.initChart()

    },
    (err:any)=>{

    })
  }
  initChart(){
    this.chartData=[]
    this.chartData.push({
      label:  this.data.label,
      data:  this.data.data,
      pointHitRadius: 15, // expands the hover 'detection' area
      pointHoverRadius: 8,
    })
 
    this.chartLabels=this.labels
  }
  getForCapeAuthorized(){
    this.statisticService.getAll(this.type, undefined, this.service_id).subscribe((res:any)=>{
      this.data=res.data
      this.labels=res.labels
      this.orderedData=res
      this.initChart()

    },
    (err:any)=>{

    })
  }
  getForControl(){
    this.statisticService.getAll(this.type, undefined, this.service_id).subscribe((res:any)=>{
      this.data=res.data
    

    },
    (err:any)=>{

    })
  }
  getForCps(agg?:any,){

    let toSubs= agg==undefined? this.statisticService.getAll(this.type, undefined, this.service_id): this.statisticService.getAll(this.type,agg);
    toSubs.subscribe((res:any)=>{
      this.chartData=[]
      this.chartLabels=[]
      this.data=res.data
      this.data.forEach((element:any) => {
        this.chartData.push({
          label:element.label,
          data:element.data,
          pointHitRadius: 15, // expands the hover 'detection' area
          pointHoverRadius: 8,
        })
      });
      this.chartLabels=res.labels

    },
    (err:any)=>{

    })
  }


  loadData(event:any){
    this.getForCps(event.target.value)
  }

  getDepartmentWithRelations(){
    this.departmentService.getDepartmentWithRelation().subscribe((res:any)=>{
      this.departments=res.data
      if(this.role=="ddasm"){
        let check= this.departments.find((el:any)=> el.id == this.user.department_id);
        this.departId=check.id
        this.departId2=check.id
        this.readonlyDepart=true
        this.municipalities=check.municipalities
      }
    },
    (err:any)=>{

    })
  }
  filter(event:any){
    let data=this.orderedData.ordered.filter((el:any)=>el.district_id ==  event.target.value);
    this.setFilteredData(data)
    console.log(data)
   // this.filteredData=this.data.filter((el:any)=>el.district.id == event.target.value)
   }
   
   loadMunicipalities(event:any){
    // this.filteredData=this.data.filter((el:any)=>el.district?.municipality?.department?.id == event.target.value)
    let data=this.orderedData.ordered.filter((el:any)=>el.department_id ==  event.target.value);
    this.setFilteredData(data)
     this.municipalities=  this.departments.find((el:any)=>el.id == event.target.value).municipalities
   }
   loadDistricts(event:any){
  //   this.filteredData=this.data.filter((el:any)=>el.district?.municipality?.id == event.target.value)
  console.log(this.orderedData)   
  let data=this.orderedData.ordered.filter((el:any)=>el.municipality_id ==  event.target.value);
      this.setFilteredData(data)
   this.districts=  this.municipalities.find((el:any)=>el.id == event.target.value).districts
   
  
   }

   setFilteredData(data:any){
 
     this.values=[];
    this.labels2=[];
    this.chartData=[];

    data.forEach((e:any) => {
      this.values.push(e.value)
      this.labels2.push(e.label)

    });
    this.chartData.push({
      label:  this.data.label,
      data:  this.values,
      pointHitRadius: 15, // expands the hover 'detection' area
      pointHoverRadius: 8,
    })
  
    this.chartLabels=this.labels2
   }
   reset(form:NgForm){

    form.resetForm()
    this.initChart()

    if(this.role=="ddasm"){
      this.ngOnInit()
    }
    
  }
}
