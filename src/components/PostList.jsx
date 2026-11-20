
import useFetch from "../hooks/useFetch";
import { postContent } from "../data/postContent";

function PostList({ onSelectPost, selectedPostId }) {
  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useFetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );

  if (loading) return <p>Loading posts...</p>;

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={refetch}>Try Again</button>
      </div>
    );
  }

  return (
    <section className="post-list">
      <div className="section-heading">
        <h2>All Posts</h2>
        <button onClick={refetch}>Refresh</button>
      </div>

      {posts.map((post) => {
        const content = postContent.find(
          (item) => item.id === post.id
        );

        return (
          <div
            key={post.id}
            className={`post-card ${
              selectedPostId === post.id ? "active" : ""
            }`}
            onClick={() => onSelectPost(post.id)}
          >
            <h3>{content?.title || post.title}</h3>
            <p>{content?.body || post.body}</p>
          </div>
        );
      })}
    </section>
  );
}

export default PostList;
