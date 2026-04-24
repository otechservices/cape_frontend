import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sampleSearch'
})
export class SampleSearchPipe implements PipeTransform {

  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText || searchText.trim() === '') return value;
    const term = searchText.toLowerCase().trim();
    return value.filter((item: any) => this.deepSearch(item, term));
  }

  private deepSearch(obj: any, term: string): boolean {
    if (obj === null || obj === undefined) return false;
    if (typeof obj === 'string') return obj.toLowerCase().includes(term);
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj).toLowerCase().includes(term);
    if (Array.isArray(obj)) return obj.some(item => this.deepSearch(item, term));
    if (typeof obj === 'object') return Object.values(obj).some(val => this.deepSearch(val, term));
    return false;
  }

}