import { useState, ChangeEvent } from 'react'
import { Bookmark } from '../interfaces';

type Props = {
  bookmark: Bookmark;
  onChange: (bookmark: Bookmark) => void;
  onDelete: (bookmark: Bookmark) => void;
};

const BookmarkItem = ({bookmark, onChange, onDelete}: Props) => {
  const [editing, setEditing] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(bookmark);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newBookmark = { ...editingBookmark, title: e.target.value };
    setEditingBookmark(newBookmark);
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newBookmark = { ...editingBookmark, url: e.target.value };
    setEditingBookmark(newBookmark);
  };

  const handleSave = () => {
    onChange(editingBookmark);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditingBookmark(bookmark);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = () => {
    if (confirm('削除してもよいですか？')) {
      onDelete(editingBookmark);
    }
  };

  if (editing) {
    return (<li>
      <div>
        <input type="text" value={editingBookmark.title} onChange={handleTitleChange} />
        <input type="text" value={editingBookmark.url} onChange={handleUrlChange} />
        <button onClick={handleSave} disabled={editingBookmark.title === '' || editingBookmark.url === ''}>保存</button>
        <button onClick={handleCancel}>キャンセル</button>
      </div>
    </li>);
  } else {
    return (<li key={bookmark.id}>
      <a href={editingBookmark.url} target="_blank">{editingBookmark.title}</a>
      <button onClick={handleEdit}>編集</button>
      <button onClick={handleDelete}>削除</button>
    </li>);
  }
};

export default BookmarkItem;
