import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import { By } from '@angular/platform-browser';
import {DebugElement} from '@angular/core';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tomato-timer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tomato-timer');
  });

  it('should find the <a> identified with id "lnkGithub" with the Github link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const debugElement: DebugElement = fixture.debugElement;
    const aDebug = debugElement.query(By.css('#lnkGithub'));
    const aHTMLElement: HTMLElement = aDebug.nativeElement;
    expect(aHTMLElement.getAttribute('href')).toEqual('https://github.com/dr-star/tomato-timer');
  });
});
