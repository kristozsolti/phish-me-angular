import { NgModule } from '@angular/core';
import { Home, File, ShoppingCart, Users, BarChart2, Layers, PlusCircle, FileText, Anchor } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  Home,
  File,
  ShoppingCart,
  Users,
  BarChart2,
  Layers,
  PlusCircle,
  FileText,
  Anchor
};

@NgModule({
  declarations: [],
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
