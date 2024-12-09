export class Note {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;

  constructor(_id: string, title: string, content: string, createdAt: Date) {
    this._id = _id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
}
