import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DisplayNode } from '../deep-value-pipe';

@Component({
  selector: 'app-deep-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deep-table.html'
})
export class DeepTableComponent {
  @Input({ required: true }) nodes!: DisplayNode[];

  expanded = new Set<DisplayNode>();

  toggle(node: DisplayNode) {
    if (!node.children) return;
    
    if (this.expanded.has(node)) {
      this.expanded.delete(node);
    } else {
      this.expanded.add(node);
    }
  }

  isExpanded(node: DisplayNode): boolean {
    return this.expanded.has(node);
  }
}
