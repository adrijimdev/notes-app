export class NoteModel {
  _id?: string;
  title: string;
  content: string;
  createdAt?: Date;

  constructor(title: string, content: string, _id?: string, createdAt?: Date) {
    this._id = _id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
}
