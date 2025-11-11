import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @Input() maxVisiblePages: number = 5; // Nombre de pages visibles dans la pagination

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  totalPages: number = 0;
  visiblePages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotalPages();
    this.calculateVisiblePages();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    
    // Si la page courante dépasse le total, revenir à la dernière page
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
      this.pageChange.emit(this.currentPage);
    }
  }

  calculateVisiblePages(): void {
    const pages: number[] = [];
    
    if (this.totalPages <= this.maxVisiblePages) {
      // Afficher toutes les pages si le total est inférieur au max
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calcul intelligent des pages visibles
      let startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
      let endPage = startPage + this.maxVisiblePages - 1;
      
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - this.maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    this.visiblePages = pages;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
    this.calculateVisiblePages();
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }

  goToLastPage(): void {
    this.goToPage(this.totalPages);
  }

  goToPreviousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  goToNextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.currentPage = 1; // Retour à la première page
    this.pageSizeChange.emit(this.pageSize);
    this.pageChange.emit(this.currentPage);
    this.calculateTotalPages();
    this.calculateVisiblePages();
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  getEndIndex(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.totalItems ? this.totalItems : end;
  }
}

