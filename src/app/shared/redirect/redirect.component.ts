import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const downloadIdFromRoute = Number(routeParams.get('downloadId'));

    window.open('https://downloads.paulcosta.at/' + downloadIdFromRoute, '_blank');

    this.router.navigate(['/']);
  }

}
