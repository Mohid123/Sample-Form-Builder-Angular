import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CounterComponent } from '../components/counter/counter.component';
import { CounterOutputComponent } from '../components/counter-output/counter-output.component';
import { CounterButtonsComponent } from '../components/counter-buttons/counter-buttons.component';
import { StoreModule } from '@ngrx/store';
import { CustomCounterInputComponent } from '../components/custom-counter-input/custom-counter-input.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppReducer } from '../store/store.state';
import { FormBuilderComponent } from '../pages/form-builder/form-builder.component';
import { TextFieldComponent } from '../form-components/text-field/text-field.component';
import { DragDropSwapDirective } from '../directives/dragAndDrop.directive';
import { TextAreaFieldComponent } from '../form-components/text-area-field/text-area-field.component';
import { CheckboxComponent } from '../form-components/checkbox/checkbox.component';
import { RadioGroupComponent } from '../form-components/radio-group/radio-group.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragDropSwapDirective,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    StoreModule.forRoot(AppReducer),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      autoPause: true,
      features: {
        pause: false,
        lock: true,
        persist: true
      }
    })
  ],
  declarations: [
    HomePage,
    TextFieldComponent,
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomCounterInputComponent,
    FormBuilderComponent,
    TextAreaFieldComponent,
    CheckboxComponent,
    RadioGroupComponent
  ]
})
export class HomePageModule {}
