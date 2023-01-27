export class Post {
  constructor(title, contents, preview, createDateTime, lastMdfdDay, writer) {
    this.title = title;
    this.contents = contents;
    this.preview = preview;
    this.createDateTime = createDateTime;
    this.lastMdfdDay = lastMdfdDay;
    this.writer = writer;
  }
}
