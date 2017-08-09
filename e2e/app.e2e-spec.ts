import { NgHackernewsPage } from './app.po';

describe('ng-hackernews App', () => {
  let page: NgHackernewsPage;

  beforeEach(() => {
    page = new NgHackernewsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
