export class Post {
  constructor(
    title,
    contents,
    preview = " ",
    createDateTime = "2023-01-26",
    lastMdfdDay = "2023-01-26",
    writer = "root",
    thumbnailPath = null
  ) {
    this.title = title;
    this.contents = contents;
    this.preview = preview;
    this.createDateTime = createDateTime;
    this.lastMdfdDay = lastMdfdDay;
    this.writer = writer;
    this.thumbnailPath = thumbnailPath;
  }
}
