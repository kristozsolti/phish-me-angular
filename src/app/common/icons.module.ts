import { NgModule } from '@angular/core';
import {  Home, File, Users, BarChart2, FilePlus, Save,
          PlusCircle, FileText, Anchor, Mail, Edit2, HelpCircle,
          Trash2, UserPlus, Send, CheckCircle, XCircle, User, X
        } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  Home,
  File,
  Users,
  BarChart2,
  PlusCircle,
  FileText,
  Anchor,
  Mail,
  Edit2,
  Trash2,
  UserPlus,
  Send,
  CheckCircle,
  XCircle,
  User,
  FilePlus,
  HelpCircle,
  X,
  Save
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
