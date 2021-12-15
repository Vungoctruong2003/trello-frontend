import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardService} from "../../../services/card.service";
import {BoardService} from "../../../services/board.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.css']
})
export class ChangeAvatarComponent implements OnInit {

  avatar?:any
  fb: any | undefined;
  downloadURL: Observable<string> | undefined;


  formUpdateImage?: FormGroup ;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ChangeAvatarComponent>,
    private router: Router,
    private storage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    this.userService.getAvatar().subscribe(res=>{
      if (res.status == 'success'){
        this.avatar  = res.data
      }
    })
    console.log(this.avatar)
    this.formUpdateImage = this.formBuilder.group({
      avatar: ['',[Validators.required]],
    })
  }

  update(){
    var data = this.formUpdateImage?.value;
    data.avatar = this.fb
    this.userService.updateAvatar(data).subscribe(res => {
      if (res.status == 'success') {
        console.log(data)
        this.onClose();
        // this.router.navigate(['/login'])
      }else{}
    })
  }

  onClose(){
    this.formUpdateImage?.reset();
    this.dialogRef.close();
    this.router.navigate(['/home'])
  }

  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          // console.log(url);
        }
      });
  }


}
