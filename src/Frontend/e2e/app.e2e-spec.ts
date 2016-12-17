import { TodoWebsitePage } from './app.po';

describe('todo-website App', function() {
  let page: TodoWebsitePage;

  beforeEach(() => {
    page = new TodoWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
