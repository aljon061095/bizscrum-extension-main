import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { PopupFormData } from "src/app/shared/model/popup.model";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner"; 

@Injectable()
export class WebhookService {
    constructor(private http: HttpClient,
        private spinnerService: NgxSpinnerService) { }

    
    getWebhookUrl(url: string): any {        
        this.http.get<any>(url).subscribe(data => {
            return data;
        })
    }

    sendWebhook(formData: PopupFormData): any {

        const popupFormData = {
            //text: '`URL:`' + formData.tabUrl + '\n`Notes:`' + formData.notes,
            cards: [{
                header: {
                    title: formData.tabTitle,
                    imageUrl: formData.favIconUrl
                },
                sections: [
                    {
                        widgets: [
                            {
                                keyValue: {
                                    topLabel: "Notes",
                                    content: formData.notes,
                                    contentMultiline: true
                                }
                            }
                        ]
                    },
                    {
                        widgets: [
                            {
                                buttons: [
                                    {
                                        textButton: {
                                            text: "Open Link",
                                            onClick: {
                                                openLink: {
                                                    url: formData.tabUrl
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }]
        };

   
        this.spinnerService.show();
        return this.http.post(formData.webhook, JSON.stringify(popupFormData)).subscribe(
            () =>      
             setTimeout(() => {
                this.spinnerService.hide();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully sent to webhook.',
                    showConfirmButton: false,
                    timer: 3000
                  });
             },1000),
            (error) => console.log(error)
        )
    }
}