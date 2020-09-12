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

// async function getBookmarks(): Promise<Bookmark[]> {
//   const db = firebase.firestore();
//   const querySnapshot = await db.collection('bookmarks').get();
//   const bookmarks: Bookmark[] = [];
//   querySnapshot.forEach((doc) => {
//     const data = doc.data()
//     bookmarks.push({id: doc.id, title: data.title, url: data.url})
//   })
//   return bookmarks
// }

const useBookmarks = (): { loading: boolean, bookmarks: Bookmark[] } => {
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

  return { loading, bookmarks };
}

export default useBookmarks
