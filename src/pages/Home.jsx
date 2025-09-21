import React, { useEffect, useState } from 'react'
import appWriteService from '../appwrite/config'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
const Home = () => {
  const[posts,setPosts]  = useState([])

  useEffect(()=>{
    appWriteService.getPosts([]).then((posts)=>{
      if(posts){
        setPosts(posts.rows)
      }
    })
  },[])
  if(posts.length === 0){
    return (
     <div className='w-full py-8'> 
     <Container>
      <div className="flex flex-wrap">
        <h1>Login to read posts</h1>
      </div>
     </Container>

    </div>
  )
  }
  return (
     <div className='w-full py-8'> 
     <Container>
      <div className="flex flex-wrap">
        {posts.map((post)=>(
          <div className="p-2 w-1/4" key = {post.$id}>
              <PostCard {...post} />
          </div>
        ))}
      </div>
     </Container>

    </div>
  )
   
}

export default Home