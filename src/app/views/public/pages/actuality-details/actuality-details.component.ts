import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActualityService } from 'src/app/core/services/actuality.service';
import { ConfigService } from 'src/app/core/utils/config-service';



@Component({
  selector: 'app-actuality-details',
  templateUrl: './actuality-details.component.html',
  styleUrls: ['./actuality-details.component.css']
})
export class ActualityDetailsComponent implements OnInit {

  @ViewChild('img') img: ElementRef | undefined
  
  data:any

   siteUrl:any;
  article: any | null = null;
  relatedArticles: any[] = [];
  id: number | null = null;

  newsItems: any[] = [];

  constructor(
    private actualityService:ActualityService,
    private route:ActivatedRoute,
    private toastrService:ToastrService,
    private renderer: Renderer2

  ) { }

  ngOnInit(): void {
    // this.id =this.route.snapshot.paramMap.get('id')
    // if( this.id!= undefined) this.get()


      this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.get();
      this.getAll();
    });
  }

  get(){
    this.actualityService.get(this.id).subscribe((res:any)=>{
      this.article=res.data
      this.renderer.setStyle(this.img!.nativeElement, 'background-image',this.getLink(this.data.big_photo));
    },
    (err:any)=>{

    })
  }

    getAll(){
    this.actualityService.getAll2().subscribe((res:any)=>{
      this.relatedArticles=res.data?.filter((a:any)=> a.category=='CAPE' && a.id!=this.id)?.slice(0,3)
    },
    (err:any)=>{

    })
  }


  getLink(name:any){

    return ConfigService.toFile(`storage/actualities/${name}`)
  }

   loadArticle(): void {
    this.article = this.newsItems.find(item => item.id === this.id) || null;

    if (this.article) {
      this.relatedArticles = this.newsItems
        .filter(item => item.id !== this.article!.id && item.category === this.article!.category)
        .slice(0, 3);
    }
  }

  getCategoryColor(category: string): string {
    switch (category) {
      case 'CAPE': return 'tw-bg-green-100 tw-text-green-800';
      case 'GARDERIES': return 'tw-bg-blue-100 tw-text-blue-800';
      // case 'INSPECTION': return 'tw-bg-orange-100 tw-text-orange-800';
      // case 'FINANCEMENT': return 'tw-bg-purple-100 tw-text-purple-800';
      // case 'SENSIBILISATION': return 'tw-bg-red-100 tw-text-red-800';
      // case 'PARTENARIAT': return 'tw-bg-indigo-100 tw-text-indigo-800';
      default: return 'tw-bg-gray-100 tw-text-gray-800';
    }
  }


 
 
}
