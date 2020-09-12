import useBookmarks from '../../utils/data/bookmarks'
import { useUser } from '../../utils/auth/useUser'
import Layout from '../../components/Layout'
import { Bookmark } from '../../interfaces'

const Loading = () => (<div style={{margin: '3rem 0'}}>読み込み中</div>);
const BookmarkListItems = ({bookmarks} : {bookmarks: Bookmark[]}) => (<ul>{bookmarks.map(bookmark => <li key={bookmark.id}><a href={bookmark.url} target="_blank">{bookmark.title}</a></li>)}</ul>);

const InnerBookmarkPage = () => {
  const { loading, bookmarks } = useBookmarks();
  return (<Layout title="ブックマーク | FamilyApp">
    <h1>ブックマーク</h1>
    { loading ? <Loading /> : <BookmarkListItems bookmarks={bookmarks}/> }
  </Layout>);
}

const BookmarksPage = () => {
  const { user } = useUser();
  if (!user) {
    return (<div>Please wait...</div>);
  } else {
    return (<InnerBookmarkPage />);
  }
};

export default BookmarksPage;
