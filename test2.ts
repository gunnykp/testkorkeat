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

จริง Angular อาจยากกว่านี้ได้เยอะครับ อันนี้ขอจัด Angular 3 ข้อ + Java 3 ข้อ แนว Codility/Live Coding

Codility มีโจทย์ Angular practice แบบ Like Button จริง และแพลตฟอร์มใช้ทดสอบ coding/technical interview หลายภาษา

Angular 3 ข้อที่ยากขึ้น
1. Debounce Search + API
search$ = new Subject<string>();
results: any[] = [];

ngOnInit() {
  this.search$
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(q => this.http.get<any[]>(`/api/users?q=${q}`))
    )
    .subscribe(res => this.results = res);
}

onSearch(value: string) {
  this.search$.next(value);
}
2. Route Guard เช็ก Token
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) return true;

  router.navigate(['/login']);
  return false;
};
3. HttpInterceptor ใส่ Bearer Token
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    : req;

  return next(authReq);
};