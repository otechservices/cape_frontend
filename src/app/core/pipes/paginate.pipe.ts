import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {
  /**
   * Pagine un tableau
   * @param items - Tableau à paginer
   * @param currentPage - Page actuelle (commence à 1)
   * @param pageSize - Nombre d'éléments par page
   * @returns Tableau paginé
   */
  transform(items: any[], currentPage: number = 1, pageSize: number = 10): any[] {
    if (!items || items.length === 0) {
      return items;
    }

    // Validation des paramètres
    if (currentPage < 1) {
      currentPage = 1;
    }

    if (pageSize < 1) {
      pageSize = 10;
    }

    // Calcul des index de début et fin
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Retourne la portion du tableau
    return items.slice(startIndex, endIndex);
  }
}

