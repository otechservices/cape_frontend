import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  /**
   * Filtre un tableau d'objets selon un terme de recherche
   * @param items - Tableau à filtrer
   * @param searchTerm - Terme de recherche
   * @param excludeFields - Champs à exclure de la recherche (optionnel)
   * @returns Tableau filtré
   */
  transform(items: any[], searchTerm: string, excludeFields: string[] = []): any[] {
    if (!items || items.length === 0) {
      return items;
    }

    if (!searchTerm || searchTerm.trim() === '') {
      return items;
    }

    const term = searchTerm.toLowerCase().trim();

    return items.filter(item => {
      // Parcourt toutes les propriétés de l'objet
      return Object.keys(item).some(key => {
        // Ignore les champs exclus
        if (excludeFields.includes(key)) {
          return false;
        }

        const value = item[key];

        // Ignore les valeurs null/undefined
        if (value === null || value === undefined) {
          return false;
        }

        // Convertit en string et compare
        const stringValue = String(value).toLowerCase();
        return stringValue.includes(term);
      });
    });
  }
}

