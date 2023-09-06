import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import Swal from 'sweetalert2';

import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private aRouter: ActivatedRoute,
    private faio: FingerprintAIO) {}

    public showFingerprintAuthDlg() {

      this.faio.isAvailable().then((result: any) => {
        console.log(result)

        this.faio.show({
          cancelButtonTitle: 'Cancel',
          description: "Some biometric description",
          disableBackup: true,
          title: 'Scanner Title',
          fallbackButtonTitle: 'FB Back Button',
          subtitle: 'This SubTitle'
        })
          .then((result: any) => {
            console.log(result)
            alert("Successfully Authenticated!")
          })
          .catch((error: any) => {
            console.log(error)
            alert("Match not found!")
          });

      })
        .catch((error: any) => {
          console.log(error)
        });
    }

    ngOnInit(): void {

    }

}
