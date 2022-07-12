import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TAB } from '@providers/tab.provider';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  if (environment.production) {
    enableProdMode();
  }

  const tab = [...tabs].pop();

  // provides the current Tab to get additional information or send messages to the content page
  platformBrowserDynamic([{ provide: TAB, useValue: tab }])
    .bootstrapModule(AppModule)
    .catch(error => console.error(error));
});
