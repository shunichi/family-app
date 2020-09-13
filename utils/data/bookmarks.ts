// import firebase from 'firebase/app'
import firebase from '../auth/firebase'
import 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Bookmark } from '../../interfaces'

// App.db.collection('bookmarks').get().then((qs) => qs.forEach((doc) => console.log(`${doc.id}: ${doc.data().title}`)))
// App.db.collection('bookmarks').add({title: 'ふぉと', url: 'https://photos.google.com/'}).then((docRef) => console.log(`doc added ${docRef.id}`)).catch((error) => console.log(`error: ${error}`))
// App.db.collection('bookmarks').onSnapshot((querySnapshot) => { querySnapshot.forEach(function(doc) { console.log(`${doc.id}: ${doc.data().title}`); });});

function syncBookmarks(callback: (bookmark: Bookmark[]) => void) {
  const db = firebase.firestore();
  db.collection('bookmarks').onSnapshot(
    (querySnapshot) => {
      const bookmarks: Bookmark[] = [];
      querySnapshot.forEach((doc) => {
        const { id } = doc;
        const { title, url } = doc.data();
        bookmarks.push({ id, title, url });
      });
      callback(bookmarks);
    });
}

export const useBookmarks = (): { loading: boolean, bookmarks: Bookmark[] } => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unmounted = false;
    syncBookmarks((bms) => {
      if(!unmounted) {
        setBookmarks(bms);
        setLoading(false);
      }
    });
    const cleanup = () => {
      unmounted = true;
    };
    return cleanup;
  }, [])

  console.log({ loading, bookmarks });
  return { loading, bookmarks };
}

export const updateBookmark = (bookmark: Bookmark) => {
  if (bookmark.id == null) return;
  const db = firebase.firestore();
  const { title, url } = bookmark;
  db.collection('bookmarks').doc(bookmark.id).set({ title, url });
}

export const deleteBookmark = (bookmark: Bookmark) => {
  if (bookmark.id == null) return;
  const db = firebase.firestore();
  db.collection('bookmarks').doc(bookmark.id).delete();
}

export const createBookmark = (bookmark: Bookmark): Promise<void> => {
  const db = firebase.firestore();
  return db.collection('bookmarks').add(bookmark).then(() => {});
}

