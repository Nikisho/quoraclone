import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import Post from './Post';

function Posts() {
  const [realTimePost, loading, error] = useCollection(
    query(collection(db, "posts"), orderBy('timestamp', "desc"))
  );
  return (
    <div className='priority'>
        {realTimePost?.docs.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            name={post.data().name}
            message={post.data().message}
            timestamp={post.data().timestamp}
            image={post.data().image}
            postImage={post.data().postImage}
            votes={post.data().votes}
          />
        ))}
    </div>
  )
}

export default Posts