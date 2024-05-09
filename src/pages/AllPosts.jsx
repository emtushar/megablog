import React, { useState } from "react";
import { PostCard, Container } from "../components/index";
import postService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  //   useEffect(() => {}, []);
  postService.getAllBlogs([]).then((postData) => {
    setPosts(postData.documents);
  });

  return (
    <div>
      <Container>
        <div>
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
