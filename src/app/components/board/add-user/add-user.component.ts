import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BoardService} from "../../../services/board.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  addUserOnBoard?: FormGroup;
  constructor(
    private boardService: BoardService,
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    let id = this.boardService.getBoardId()
    this.addUserOnBoard = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      role: ['',[Validators.required]],
      board_id: [id,[Validators.required]],
    })
  }

  addUserToBoard(){
    const data = this.addUserOnBoard?.value;
    console.log(data);
    this.boardService.addUser(data).subscribe(res => {
      // if (res.status == 'success') {
      //   alert()
      console.log(res)
        // this.onClose();
        // this.router.navigate(['/login'])
      // }else{}
    })
  }

  get email() {
    return this.addUserOnBoard?.get('email');
  }

  get role() {
    return this.addUserOnBoard?.get('role');
  }

  onClose(){

    this.addUserOnBoard?.reset();
    this.dialogRef.close();
    this.router.navigate(['/load-home']);
  }

}
