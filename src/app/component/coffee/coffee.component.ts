import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

export interface coffee{
  picture:string;
  inStock:number;
  id:number;
  name:string;
  price:number;
  quantity:number;
  des:string;
}
@Component({
  selector: 'app-coffee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './coffee.component.html',
  styleUrl: './coffee.component.scss'
})
export class CoffeeComponent {
  @Input() listitem: coffee[] = []
  deleteItem(id: number) {
    this.listitem = this.listitem.filter((coffee) => coffee.id !== id);
  }

  @ViewChild('formup', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);
  openDialog(item: coffee) {
    selectedItem: item;
    this.formupdate.patchValue(item);
    Animation;
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }

  formupdate = new FormGroup({
    id: new FormControl(0),
    inStock: new FormControl(0),
    name: new FormControl(''),
    des: new FormControl(''),
    price: new FormControl(0),
    quantity: new FormControl(0),
    picture: new FormControl(''),
  });
  updateItem() {
    let newForm: coffee = {
      inStock: this.formupdate.value.inStock  ||0,
      id: this.formupdate.value.id  ||0,
      name: this.formupdate.value.name || '',
      des: this.formupdate.value.des  ||'',
      price: this.formupdate.value.price || 0,
      picture: this.formupdate.value.picture || '',
      quantity: this.formupdate.value.quantity || 0,
    };
    const index = this.listitem.findIndex((item) => item.id === newForm.id);
    if (index != -1) {
      this.listitem[index] = newForm;
    }
    this.closeDialog();
  }
  @Output() addToCartEvent = new EventEmitter<coffee>();
  addCart(item: coffee) {
    item.inStock--;

    this.addToCartEvent.emit(item);
    console.log(item);
  }
}


