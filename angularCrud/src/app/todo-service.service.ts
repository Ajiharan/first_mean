import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoClient } from './TodoInterface';
@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  constructor(private http: HttpClient) {}

  createPost(data) {
    return this.http.post('http://localhost:5000/todo/add', data);
  }

  getAllPosts() {
    return this.http.get('http://localhost:5000/todo/getAll');
  }

  deletePost(id) {
    return this.http.delete(`http://localhost:5000/todo/delete/${id}`);
  }
  updatePost(data) {
    return this.http.put('http://localhost:5000/todo/update', data);
  }
}
