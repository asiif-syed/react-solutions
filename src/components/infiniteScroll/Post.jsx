const Post = ({ post }) => {
  const {
    title,
    userId,
    reactions: { dislikes, likes },
  } = post;

  return (
    <div className="post">
      <h1>{title}</h1>
      <p>Owner's id: {userId}</p>
      <p>Likes {likes}</p>
      <p>Dislikes {dislikes}</p>
    </div>
  );
};

export default Post;
