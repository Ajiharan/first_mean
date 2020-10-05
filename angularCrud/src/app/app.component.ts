import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from './todo-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angularCrud';
  post = {
    title: '',
  };
  pid = '';
  postList: any = [];
  btnName = 'Add';
  display = 'none';
  isEdited: boolean = false;

  constructor(private todoService: TodoServiceService) {}

  ngOnInit() {
    this.todoService.getAllPosts().subscribe((data) => {
      this.postList = data;
      console.log(data);
    });
  }

  addPost() {
    if (!this.isEdited) {
      const newPost = {
        title: this.post.title,
      };

      this.todoService.createPost(newPost).subscribe(
        (data) => {
          this.postList.push(data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.UpdatePost({
        _id: this.pid,
        title: this.post.title,
      });
    }
  }
  editPost(data) {
    this.post.title = data.title;
    this.pid = data._id;
    this.btnName = 'Update';
    this.display = 'inline';
    this.isEdited = true;
  }

  CancelAll() {
    this.post.title = '';
    this.pid = '';
    this.btnName = 'Add';
    this.display = 'none';
  }

  UpdatePost(data) {
    this.todoService.updatePost(data).subscribe((res) => {
      const tempArray = this.postList.map((result) => {
        if (data._id === result._id) {
          return {
            ...result,
            title: data.title,
          };
        } else {
          return {
            ...result,
          };
        }
      });
      this.postList = tempArray;
      this.isEdited = false;
      this.CancelAll();
    });
  }

  deletePost(data) {
    this.todoService.deletePost(data._id).subscribe((res) => {
      const tempArray = this.postList.filter(
        (result) => result._id !== data._id
      );
      this.postList = tempArray;
    });
  }
}
