หาได้จาก Codility มีตัวอย่าง Angular ชื่อ Angular Like Button จริงครับ
ส่วนข้อสอบจริงของบริษัทหา exact ไม่ได้ แต่แนว Angular test มักเป็น 3 แบบนี้:

1. Like Button Component
import { Component } from '@angular/core';

@Component({
  selector: 'app-like-button',
  template: `
    <button
      class="like-button"
      [class.liked]="liked"
      (click)="toggleLike()">
      Like | <span class="likes-counter">{{ likes }}</span>
    </button>
  `
})
export class LikeButtonComponent {
  likes = 100;
  liked = false;

  toggleLike() {
    this.liked = !this.liked;
    this.likes += this.liked ? 1 : -1;
  }
}
2. Search Filter List
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  template: `
    <input [(ngModel)]="keyword" />

    <ul>
      <li *ngFor="let user of filteredUsers">
        {{ user }}
      </li>
    </ul>
  `
})
export class UserListComponent {
  keyword = '';

  users = ['Jack', 'Betty', 'John', 'Alice'];

  get filteredUsers() {
    return this.users.filter(u =>
      u.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }
}

ต้อง import:

import { FormsModule } from '@angular/forms';
3. Fetch API With Service
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  template: `
    <div *ngFor="let post of posts">
      {{ post.title }}
    </div>
  `
})
export class PostsComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(res => {
        this.posts = res;
      });
  }
}

ต้อง import:

import { HttpClientModule } from '@angular/common/http';

Codility Angular จะเน้น component, binding, click event, class binding, ngFor/ngIf, form input และ service/HTTP ครับ.