import React from 'react';
import Comment from './Comment';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { collection, orderBy, query } from 'firebase/firestore';

function Comments({photo}) {
    const [realTimeComments] = useCollection(
        query(collection(db, "comments"), orderBy('timestamp', "desc"))
    )
  return (
    <div>
        
    </div>
  )
}

export default Comments