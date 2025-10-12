import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActualityService } from 'src/app/core/services/actuality.service';
import { ConfigService } from 'src/app/core/utils/config-service';



interface Category {
  id: string;
  name: string;
  count: number;
}


@Component({
  selector: 'app-actuality',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './actuality.component.html',
  styleUrl: './actuality.component.css'
})
export class ActualityComponent {
selectedCategory = 'all';
  siteUrl = 'https://example.com';

  newsItems: any[] = [];
firstBg:any
  categories: Category[]=[];

  getCategoryColor(category: string): string {
    switch (category) {
      case 'CAPE': return 'tw-bg-green-100 tw-text-green-800';
      case 'GARDERIE': return 'tw-bg-blue-100 tw-text-blue-800';
      default: return 'tw-bg-gray-100 tw-text-gray-800';
    }
  }



    get filteredNews(): any[] {
    return this.selectedCategory === 'all'
      ? this.newsItems
      : this.newsItems.filter(item => item.category === this.selectedCategory);
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }


    constructor(
      private actualityService:ActualityService,
      private route:ActivatedRoute,
      private toastrService:ToastrService,
      private renderer: Renderer2
  
    ) { }
  
    ngOnInit(): void {
      // this.id =this.route.snapshot.paramMap.get('id')
      // if( this.id!= undefined) this.get()
  
          this.getAll();

    }
  
      getAll(){
      this.actualityService.getAll2().subscribe((res:any)=>{
        this.newsItems=res.data
        if (this.newsItems.length!=0) {
          this.firstBg=this.newsItems[0].big_photo
        this.categories=  [
          { id: 'all', name: 'Toutes les actualités', count: this.newsItems.length },
          { id: 'CAPE', name: 'CAPE', count: this.newsItems.filter(item => item.category === 'CAPE').length },
          { id: 'GARDERIE', name: 'GARDERIE', count: this.newsItems.filter(item => item.category === 'GARDERIE').length }
        ]
        }
      },
      (err:any)=>{
  
      })
    }
  
      getLink(name:any){
    
        return ConfigService.toFile(`storage/actualities/${name}`)
      }
    
}
