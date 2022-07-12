import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { WebhookService } from '../../../../shared/services/webhook.service';
import { TAB } from '@providers/tab.provider';
import { PopupFormData } from 'src/app/shared/model/popup.model';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/shared/services/storage.service';
import { IWebhook } from 'src/app/shared/model/webhook.model';

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss'],
  providers: [WebhookService, PopupFormData]
})
export class PopupComponent implements OnInit {
  form: FormGroup;
  params: Params;
  currentYear: number;
  webhookUrl: string;
  webhooks: Array<IWebhook>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    @Inject(TAB) readonly tab: chrome.tabs.Tab,
    private storage: StorageService,
    private webhookService: WebhookService,
    private popupFormData: PopupFormData
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      this.params = params;
    });

    this.webhooks = await new Promise<IWebhook[]>(resolve => {
      this.storage.get(['webhooks']).then(result => {
        if (result.webhooks) {
          resolve(JSON.parse(result.webhooks));
        }
      });
    });

    console.log('onInit: ' + JSON.stringify(this.webhooks));

    let webhookUrl = '';
    this.webhooks.forEach(webhook => {
      if (webhook.selected) {
        webhookUrl = webhook.url;
      }
    });

    this.form = this.formBuilder.group({
      webhook: [webhookUrl, Validators.required],
      tabUrl: [this.tab.url, Validators.required],
      tabTitle: [this.tab.title, Validators.required],
      notes: [this.params['notes']]
    });
  }

  appVersion(): string {
    return chrome.runtime.getManifest().version;
  }

  close(): void {
    const message = {
      action: 'popup_close_btn_click',
      data: undefined
    };
    chrome.tabs.sendMessage(this.tab.id, message);
  }

  submit(): void {
    if (this.form.valid) {
      this.popupFormData = this.form.value;
      this.popupFormData.favIconUrl = this.tab.favIconUrl;
      this.webhookService.sendWebhook(this.popupFormData);
    }

    this.webhooks.forEach(webhook => {
      webhook.selected = false;
      if (webhook.url === this.form.value.webhook) {
        webhook.selected = true;
      }
    });

    console.log('submit: ' + JSON.stringify(this.webhooks));
    this.storage.set({ webhooks: JSON.stringify(this.webhooks) });
  }

  year(): string {
    return new Date().getUTCFullYear().toString();
  }
}
