import { UserService } from 'src/app/feature-modules/users/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { merge ,of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DeleteFormComponent } from '../delete-form/delete-form.component';
import { SnackbarComponent } from 'src/app/core/components/snackbar/snackbar.component';
import { ErrorMessage, SuccessMessage } from 'src/configs/defines';
import { ViewFormComponent } from '../view-form/view-form.component';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  changeDetectorRefs: any;

  data: any;
  laodingFlag = true;
  resultsLength = 0;
  isRateLimitReached = false;
  dialogRef:any;

  dataSource = new MatTableDataSource<any>([]);
  public displayedColumns = ['id', 'first_name', 'last_name', 'email', 'avater', 'actions'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) { }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.getListOfUsers();
  }

  ngOnInit() {
  }

  getListOfUsers () {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
      startWith({}),
      switchMap(() => {
        this.laodingFlag = true;
        return this.userService.getUsers(
          this.paginator.pageIndex)
          .pipe(catchError(() => observableOf(null)));
      }),
      map(data => {
        this.laodingFlag = false;
        this.isRateLimitReached = data === null;
        if (data === null) {
          return [];
        }
        this.resultsLength = data['total'];
        return data['data'];
      })
      ).subscribe(data => this.dataSource.data = data);
  }


  openDeleteDialog(title, message, action) {
    return this.dialog.open(DeleteFormComponent, {
      data: {
        title,
        message,
        action
      }
    });
  }

  deleteUser(user) {
    const dialogRef = this.openDeleteDialog('Delete record', 'Are you sure you want to delete this record?', 'delete');
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe((res: any) => {
          this.deleteingSuccessHandler(user);
        }, (err) => {
          this.deleteingFailureHandler();
        });
      }
    });

  }
  handleSnakScript(data ,message?) {
    this.snack.openFromComponent(SnackbarComponent, {
      data: { data, ...message },
      duration: 3000
    });
  }
  deleteingSuccessHandler(user) {
    let data = {
      message: 'Record Has been Deleted Successfuly'
    }
    this.handleSnakScript(data, SuccessMessage);
    this.removeDeletedRecord(user);
  }

  deleteingFailureHandler() {
    let data = {
      message: 'Something Went Wrong'
    }
    this.handleSnakScript(data, ErrorMessage);
  }

  removeDeletedRecord(user) {
    let index = this.dataSource.data.indexOf(user);
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.resultsLength = this.resultsLength - 1;
  }

  openDialogForm(title, action ,componentName,data?) {
    this.dialogRef = this.dialog.open(componentName, {
      data: { title: title, action: action, data },
      height: '500px',
      width: '600px',
    });
  }

  viewUser(user) {
    this.userService.getSingleUser(user.id).subscribe(
      data => {
        this.openDialogForm('View User', 'view',ViewFormComponent,data['data']);
      }, error => {
        let data = {
          message: 'Sorry something went wrong please try again'
        }
        this.handleSnakScript(data);
      }
    )

  }

  editUser(user) {
    this.userService.getSingleUser(user.id).subscribe(
      data => {
        this.openDialogForm('View User', 'view',EditFormComponent, data['data']);
        this.updateUserOnList(user);
      }, error => {
        let data = {
          message: 'Sorry something went wrong please try again'
        }
        this.handleSnakScript(data);
      }
    )
  }

  updateUserOnList(user) {
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('user',user);
        let index = this.dataSource.data.findIndex((el) => {
          return el.id == user.id;
        });
        this.dataSource.data[index] = { ...result };
        this.dataSource = new MatTableDataSource(this.dataSource.data);
      }
    });
  }

  addNewUser(): void {
    this.openDialogForm('Add User', 'save',EditFormComponent);
    this.dialogRef.afterClosed().subscribe(user => {
      if (user) {
        console.log('user',user);
        this.dataSource.data.push(user);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.resultsLength = this.resultsLength + 1;
        console.log('this.dataSource.data',this.dataSource.data);
      }
    });
  }



}

