/*
    document.body.scrollHeight --> Total height of the scrollable page
    window.scrollY --> current scroll position
    window.innerHeight --> current view port height
    document.body.scrollHeight === window.scrollY +  window.innerHeight --> User reached the end of the page
*/

import { useEffect, useState } from "react";
import Post from "./Post";
import "./infiniteScroll.css";
import { fetchPaginatedPosts } from "../../utils/networkUtils";

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    fetchData();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      document.body.scrollHeight <= window.scrollY + window.innerHeight + 50 &&
      !isLoading
    ) {
      fetchData();
    }
  };

  const fetchData = async () => {
    if (!isLoading && hasMore) {
      setIsLoading(true);
      const data = await fetchPaginatedPosts(10, 10);
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setHasMore(data.hasMore);
    }
  };

  return (
    <div>
      <section className="posts-container">
        {posts.map((post, idx) => (
          <Post key={`${post.id}-${idx}`} post={post} />
        ))}
      </section>
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
