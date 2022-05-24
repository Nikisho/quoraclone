import React from 'react';
import Comment from './Comment';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { collection, orderBy, query } from 'firebase/firestore';

function Comments({postId}) {
    const postRef = collection(db, "posts", `${postId}`, "comments");
    const [realTimeComments] = useCollection(
      query(postRef, orderBy('timestamp', "desc"))
    )
  return (
    <div>
        {realTimeComments?.docs.map((comment) => (
          <Comment
            message={comment.data().message}
            name={comment.data().name}
            image={comment.data().image}
            timestamp={comment.data().timestamp}
          />
        ))}
    </div>
  )
}

export default Comments