import { useBookmarks, updateBookmark, deleteBookmark, createBookmark } from '../../utils/data/bookmarks'
import { useUser } from '../../utils/auth/useUser'
import Layout from '../../components/Layout'
import BookmarkList from '../../components/BookmarkList'
import BookmarkForm from '../../components/BookmarkForm'

const Loading = () => (<div style={{margin: '3rem 0'}}>読み込み中</div>);

const InnerBookmarkPage = () => {
  const { loading, bookmarks } = useBookmarks();

  return (<Layout title="ブックマーク | FamilyApp">
    <h1>ブックマーク</h1>
    { loading ?
      <Loading /> :
      <div>
        <BookmarkList bookmarks={bookmarks} onChange={updateBookmark} onDelete={deleteBookmark} />
        <BookmarkForm onCreate={createBookmark} />
      </div>
    }
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
