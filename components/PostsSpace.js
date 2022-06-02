import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import Post from './Post';
import PostSpace from './PostSpace';

function PostsSpace({id}) {
  const [realTimePost, loading, error] = useCollection(
    query(collection(db, `${id}-posts`), orderBy('timestamp', "desc"))
  );
  return (
    <div className='priority'>
        {realTimePost?.docs.map((post) => (
          <PostSpace
            key={post.id}
            id={post.id}
            pid={id}
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

export default PostsSpace