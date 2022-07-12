import { NgModule } from '@angular/core';
import { WebhookService } from 'src/app/shared/services/webhook.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { PopupComponent } from './pages/popup/popup.component';
import { PopupRoutingModule } from './popup-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [PopupComponent],
  imports: [SharedModule, PopupRoutingModule, NgxSpinnerModule],
  providers:[WebhookService]
})
export class PopupModule {}
