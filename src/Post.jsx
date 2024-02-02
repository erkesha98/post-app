import React, { useEffect, useState } from "react";

const getUrl = "https://jsonplaceholder.typicode.com/users/1/posts";
const postUrl = "https://jsonplaceholder.typicode.com/posts";

const defaultData = {
  id: "",
  title: "",
  body: "",
};

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState(defaultData);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await fetch(getUrl);
    const data = await response.json();
    console.log(data);
    setPosts(data);
  };

  const writePost = async () => {
    try{
    const response = await fetch(postUrl, {
      method: 'POST',
      body: JSON.stringify(singlePost),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
    );

    const data = await response.json();
    setPosts([data, ...posts]);
   
  }catch(err){
    console.log("error",err);
}
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSinglePost({ ...singlePost, [name]: value });
  };
  const handleHeaderChange=(e)=>{
    
  }

  return (
    <div>
       <div><input type="text" style={{width:"250px",border:"2px solid blue"}} onChange={handleHeaderChange}/></div> 
      <textarea value={singlePost.body}
        name="body"
        id="note"
        cols="30"
        rows="10"
        placeholder="write here..."
        onChange={handleInputChange}
      ></textarea>
      <br />
      <button onClick={writePost}>Post</button>
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map((el) => (
            <li key={el.id}>{el.body}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Post;
