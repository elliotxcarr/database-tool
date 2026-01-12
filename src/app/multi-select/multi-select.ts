import { afterRenderEffect, ChangeDetectionStrategy, Component, computed, inject, viewChild, viewChildren, effect} from '@angular/core';
import {Listbox, Option} from '@angular/aria/listbox'
import { Combobox, ComboboxInput, ComboboxPopup, ComboboxPopupContainer } from '@angular/aria/combobox';
import { OverlayModule} from '@angular/cdk/overlay'
import { QueryStore } from '../store/query.store';
import { Field } from '../data/dbFields';
@Component({
  selector: 'app-multi-select',
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxPopup,
    ComboboxPopupContainer,
    Listbox,
    Option,
    OverlayModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './multi-select.html',
  styleUrl: './multi-select.css',
})
export class MultiSelect {

  readonly store = inject(QueryStore);

 /** The combobox listbox popup. */
  listbox = viewChild<Listbox<Field>>(Listbox);
  /** The options available in the listbox. */
  options = viewChildren<Option<Field>>(Option);
  /** A reference to the ng aria combobox. */
  combobox = viewChild<Combobox<string>>(Combobox);

  values = computed(() => this.listbox()?.values() || []);

  /** The string that is displayed in the combobox. */
  displayValue = computed(() => {
    //this.store.addProjectField(this.listbox()?.values())
    if (this.values().length === 0) {
      return 'Select a label';
    }
    if (this.values().length === 1) {
      return this.values()[0].label;
    }
    return `${this.values()[0].label} + ${this.values().length - 1} more`;
  });

  
  constructor() {
    // Scrolls to the active item when the active option changes.
    // The slight delay here is to ensure animations are done before scrolling.
    afterRenderEffect(() => {
      const option = this.options().find((opt:any) => opt.active());
      setTimeout(() => option?.element.scrollIntoView({block: 'nearest'}), 50);
    });
    // Resets the listbox scroll position when the combobox is closed.
    afterRenderEffect(() => {
      if (!this.combobox()?.expanded()) {
        setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
      }
    });

    effect(() => {
      this.store.addProjectField(
        this.values().length > 0 ? this.values() : this.store.currentFields().slice(0,4))
    })
  }
}
