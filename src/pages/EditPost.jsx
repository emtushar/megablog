import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/config";

function EditPost() {
  const [post, setPost] = useState("null");
  const navigate = useNavigate();
  const slug = useParams();
  useEffect(() => {
    if (slug) {
      postService.getBlog(slug).then((post) => setPost(post));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
