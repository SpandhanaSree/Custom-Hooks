
import { useEffect, useState } from "react";
import Comments from "./Comments";
import { postContent } from "../data/postContent";

function PostDetails({ postId }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!postId) {
      setPost(null);
      setComments([]);
      return;
    }

    const controller = new AbortController();

    async function fetchDetails() {
      try {
        setLoading(true);
        setError("");

        const [postResponse, commentsResponse] =
          await Promise.all([
            fetch(
              `https://jsonplaceholder.typicode.com/posts/${postId}`,
              { signal: controller.signal }
            ),
            fetch(
              `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
              { signal: controller.signal }
            ),
          ]);

        if (!postResponse.ok || !commentsResponse.ok) {
          throw new Error("Failed to load post details");
        }

        const [postData, commentsData] = await Promise.all([
          postResponse.json(),
          commentsResponse.json(),
        ]);

        if (!controller.signal.aborted) {
          setPost(postData);
          setComments(commentsData);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDetails();

    return () => controller.abort();
  }, [postId]);

  if (!postId) {
    return <p className="select-message">Select a post to view details.</p>;
  }

  if (loading) return <p>Loading post details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!post) return null;

  const content = postContent.find(
    (item) => item.id === postId
  );

  const displayComments = content?.comments || comments;

  return (
    <section className="post-details">
      <span className="post-label">POST #{post.id}</span>

      <h2>{content?.title || post.title}</h2>

      <p className="post-body">
        {content?.body || post.body}
      </p>

      <Comments comments={displayComments} />
    </section>
  );
}

export default PostDetails;
