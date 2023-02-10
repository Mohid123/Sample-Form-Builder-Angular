import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
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


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
  declarations: [HomePage, CounterComponent, CounterOutputComponent, CounterButtonsComponent, CustomCounterInputComponent]
})
export class HomePageModule {}
