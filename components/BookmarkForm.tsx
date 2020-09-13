import { useState, ChangeEvent } from 'react'
import { Bookmark } from '../interfaces';

type Props = {
  onCreate: (bookmark: Bookmark) => Promise<void>;
};

const emptyBookmark = { title: '', url: '' };

const BookmarkForm = ({ onCreate }: Props) => {
  const [editingBookmark, setEditingBookmark] = useState(emptyBookmark);

  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEditingBookmark((prevValue) => ({...prevValue, title: newValue}));
  }

  const updateUrl = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEditingBookmark((prevValue) => ({...prevValue, url: newValue}));
  }

  const handleAdd = async () => {
    await onCreate(editingBookmark);
    setEditingBookmark(emptyBookmark);
  };


  return (<div>
    title: <input type="text" value={editingBookmark.title} onChange={updateTitle} /><br />
    url: <input type="text" value={editingBookmark.url} onChange={updateUrl} /><br />
    <button onClick={handleAdd}>追加</button>
  </div>);
};

export default BookmarkForm;
