import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { StepsModule } from 'primeng/steps';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { KeyFilterModule } from 'primeng/keyfilter';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChipsModule } from 'primeng/chips';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuModule } from 'primeng/menu';
import { RatingModule } from 'primeng/rating';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TimelineModule } from 'primeng/timeline';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FileUploadModule } from 'primeng/fileupload';
import {GalleriaModule} from 'primeng/galleria';
import {CarouselModule} from 'primeng/carousel';
import {ImageModule} from 'primeng/image';

let modules = [
  ButtonModule,
  SplitButtonModule,
  TabViewModule,
  InputTextModule,
  DropdownModule,
  MultiSelectModule,
  InputMaskModule,
  CalendarModule,
  ToastModule,
  MessagesModule,
  MessageModule,
  ToolbarModule,
  AutoCompleteModule,
  TableModule,
  AccordionModule,
  CardModule,
  PanelModule,
  InputTextareaModule,
  InputSwitchModule,
  CheckboxModule,
  PaginatorModule,
  StepsModule,
  DialogModule,
  ListboxModule,
  KeyFilterModule,
  OverlayPanelModule,
  SelectButtonModule,
  ProgressBarModule,
  RadioButtonModule,
  MenuModule,
  TabMenuModule,
  ChipsModule,
  RatingModule,
  VirtualScrollerModule,
  BreadcrumbModule,
  ConfirmDialogModule,
  ToggleButtonModule,
  DividerModule,
  ProgressSpinnerModule,
  PasswordModule,
  ConfirmPopupModule,
  ScrollTopModule,
  TimelineModule,
  ColorPickerModule,
  FileUploadModule,
  GalleriaModule,
  CarouselModule,
  ImageModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ...modules
  ],
  declarations: [

  ],
  exports: [
    ...modules
  ]
})
export class PrimeNGModule { }
