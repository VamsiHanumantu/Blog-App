import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'

const PostCard = (
    {$id, title, featuredImage}
) => {
    const [imageUrl, setImageUrl] = useState("");
 useEffect(() => {
  const fetchImage = async () => {
    console.log(featuredImage)
    if (featuredImage) {
      const url = await appwriteService.getFilePreview(featuredImage);
      setImageUrl(url);
    }
  };
  fetchImage();
}, [featuredImage]);
  return (
   <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div>
            <img src={imageUrl} alt={title} className='rounded-xl' />
        </div>
        <h2 className=' text-xl font-bold'>{title}</h2>
    </div>
   </Link>
  )
}

export default PostCard