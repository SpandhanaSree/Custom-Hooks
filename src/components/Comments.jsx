
function Comments({ comments }) {
  return (
    <section className="comments-section">
      <h3>Comments ({comments.length})</h3>

      {comments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        comments.map((comment) => (
          <div className="comment-card" key={comment.id}>
            <h4>{comment.name}</h4>
            <p>{comment.email}</p>
            <p>{comment.body}</p>
          </div>
        ))
      )}
    </section>
  );
}

export default Comments;
