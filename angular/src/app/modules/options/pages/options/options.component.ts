import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IWebhook } from 'src/app/shared/model/webhook.model';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss']
})
export class OptionsComponent implements OnInit {
  controls: Array<IWebhook> = [
    {
      name: 'Uber Webhook',
      url: 'https://uberlist.io/api/ListAPI/GetListByMemo?listDetailId=5467a9d3-c568-4c7a-b708-ddac1a6a9e3e&value=Bizscrum%20Chrome%20Extension%20webook&typeformat=json&tags=&untags=',
      selected: true
    }
  ];
  // newControl: IWebhook = {
  //   name: '',
  //   url: '',
  //   selected: false
  // };
  isEditItems: boolean;

  constructor(private route: ActivatedRoute, private storage: StorageService) {
    this.storage.get(['webhooks']).then(result => {
      let webhooks = [];
      if (result.webhooks) {
        webhooks = JSON.parse(result.webhooks);
      }

      // eslint-disable-next-line no-prototype-builtins
      if (webhooks.length && !webhooks.find(x => x.hasOwnProperty('selected'))) {
        this.storage.remove(['webhooks']);
      } else if (webhooks.length) {
        this.controls = JSON.parse(result.webhooks);
      } else {
        this.storage.set({ webhooks: JSON.stringify(this.controls) });
      }
    });
  }

  addControl() {
    if (this.controls.length <= 2) {
      const newControl: IWebhook = {
        name: '',
        url: '',
        selected: false
      };
      this.controls.push(newControl);
    } else {
      // add logic here
    }
  }

  deleteControl(index) {
    this.controls.splice(index, 1);
  }

  async onEditCloseItems() {
    this.isEditItems = !this.isEditItems;
    this.storage.set({ webhooks: JSON.stringify(this.controls) });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      console.log(params);
    });

    console.log(id);
  }
}
