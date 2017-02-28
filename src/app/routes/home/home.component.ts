import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from './../apiendpoint.service';

@Component({
  selector: 'app-home',
  templateUrl: 'app/routes/home/home.component.html',
  providers: [ApiEndpointService]
})
export class HomeComponent implements OnInit {
  public text: string = '';
  public response_data: any;
  constructor(private api: ApiEndpointService) {}

  ngOnInit() {}

  public clicked(): void {
    console.log("__endpoint__:", this.text);
    if (this.text && this.text != '') {
      this.api.getStringValue(this.text).subscribe(
        (res) => {
          this.response_data = res
        },
        err => console.log(err)
      );
    } else {
      alert('please insert string!');
    }
  }

  public clear(): void {
    this.text = '';
    this.response_data = {};
  }
}
