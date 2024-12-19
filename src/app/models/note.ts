export class NoteModel {
  _id?: string;
  title: string;
  content: string;
  userId: string;
  createdAt?: Date;

  constructor(title: string, content: string, userId: string, _id?: string, createdAt?: Date) {
    this._id = _id;
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}
