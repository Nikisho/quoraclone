import { useRouter } from 'next/router';
import SpaceFeed from '../components/SpaceFeed';

const Post = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <SpaceFeed
        id={id}
       />
    </>
  )
}

export default Post