import { ImageSource } from 'image-source';
import { Image } from 'tns-core-modules/ui/image';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { BarcodeScanner } from 'nativescript-barcodescanner';

@Component({
  selector: 'app-barcode',
  templateUrl: 'pages/barcode/barcode.component.html',
  styleUrls: ['pages/barcode/barcode.component.css']
})
export class BarcodeComponent implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner) { }
  
  @ViewChild("img") img: ElementRef;

  ngOnInit() {
  }

  public create() {

    var ZXing = require('nativescript-zxing');

    var zx = new ZXing();
    var barcode = zx.createBarcode({ encode: "Text", height: 300, width: 300, format: ZXing.QR_CODE });
    
    let imageField = <Image>this.img.nativeElement;
    imageField.src = barcode;
  }

  public scan() {
    this.barcodeScanner.scan({
      formats: "QR_CODE,PDF_417",   // Pass in of you want to restrict scanning to certain types
      cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
      cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
      message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
      showFlipCameraButton: true,   // default false
      preferFrontCamera: false,     // default false
      showTorchButton: true,        // default false
      beepOnScan: true,             // Play or Suppress beep on scan (default true)
      torchOn: false,               // launch with the flashlight on (default false)
      closeCallback: function () { console.log("Scanner closed"); }, // invoked when the scanner was closed (success or abort)
      resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
      orientation: "landscape",     // Android only, optionally lock the orientation to either "portrait" or "landscape"
      openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
    }).then(
      function (result) {
        console.log("Scan format: " + result.format);
        console.log("Scan text:   " + result.text);
      },
      function (error) {
        console.log("No scan: " + error);
      }
      );
  }
}
