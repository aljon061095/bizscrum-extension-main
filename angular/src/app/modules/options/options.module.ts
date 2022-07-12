import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './pages/options/options.component';

@NgModule({
  declarations: [OptionsComponent],
  imports: [SharedModule, OptionsRoutingModule]
})
export class OptionsModule {}
