import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {coffee} from "../coffee/coffee.component";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('appDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);
  openDialog() {
    Animation;
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }

  @ViewChild('cardDialog', { static: true })
  carddialog!: ElementRef<HTMLDialogElement>;
  cdrcard = inject(ChangeDetectorRef);
  OpencardDialog() {
    Animation;
    this.carddialog.nativeElement.showModal();
    this.cdrcard.detectChanges();
  }

  closecardDialog() {
    this.carddialog.nativeElement.close();
    this.cdrcard.detectChanges();
  }

  @Input() itemsInCart: coffee[] = [];
  // how to make total don't use fuction

  payment() {
    let total = 0;
    for(let i = 0;i < this.itemsInCart.length;i++)
    {
      total += this.itemsInCart[i].price * this.itemsInCart[i].quantity

    }
    return total;
  }



  nextId: number = 6;
  @Output() newItemEvent = new EventEmitter<coffee>();
  form = new FormGroup({
    inStock: new FormControl(0),
    id: new FormControl(0),
    name: new FormControl(''),
    des: new FormControl(''),
    price: new FormControl(0),
    quantity: new FormControl(0),
    picture: new FormControl(''),
  });

  submit() {
    let newForm: coffee = {
      id: this.nextId++,
      inStock: this.form.value.inStock || 0,
      name: this.form.value.name  ||'',
      des: this.form.value.des  ||'',
      price: this.form.value.price  ||0,
      picture: this.form.value.picture ||'',
      quantity: this.form.value.quantity  || 0,
    };
    this.newItemEvent.emit(newForm);
  }
}

