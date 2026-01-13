import { Pipe, PipeTransform } from '@angular/core';

export interface DisplayNode {
  key: string;
  value?: any;
  children?: DisplayNode[];
}
@Pipe({
  name: 'deepObject',
  pure: true
})
export class DeepObjectPipe implements PipeTransform {

  transform(value: any): DisplayNode[] {
    if (!value || typeof value !== 'object') return [];
    return this.buildNodes(value);
  }

  private buildNodes(obj: any, seen = new WeakSet()): DisplayNode[] {
    if (seen.has(obj)) {
      return [{ key: '[Circular]', value: '↻' }];
    }
    seen.add(obj);

    return Object.entries(obj).map(([key, val]) => {
      if (val && typeof val === 'object') {
        return {
          key,
          children: this.buildNodes(val, seen)
        };
      }

      return {
        key,
        value: val
      };
    });
  }
}