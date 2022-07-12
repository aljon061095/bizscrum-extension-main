import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
    if (chrome === undefined) {
      throw new Error('Chrome API is not available.');
    }
  }

  async get(keys: Array<string>) {
    return new Promise<any>(resolve => {
      chrome.storage.sync.get(keys, function (result) {
        resolve(result);
      });
    });
  }

  set(obj: Record<string, unknown>) {
    chrome.storage.sync.set(obj, function () {
      // console.log('Value is set to ' + value);
    });
  }

  remove(keys: Array<string>) {
    chrome.storage.sync.remove(keys, function () {
      // console.log('Value is set to ' + value);
    });
  }
}
