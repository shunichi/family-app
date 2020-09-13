import { Bookmark } from '../interfaces';
import BookmarkItem from  './BookmarkItem';

type Props = {
  bookmarks: Bookmark[];
  onChange: (bookmark: Bookmark) => void;
  onDelete: (bookmark: Bookmark) => void;
}
const BookmarkList = ({bookmarks, onChange, onDelete}: Props) => {
  return (<ul>{bookmarks.map(bookmark => <BookmarkItem key={bookmark.id} bookmark={bookmark} onChange={onChange} onDelete={onDelete} />)}</ul>);
}

export default BookmarkList;
