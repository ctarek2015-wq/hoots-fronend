import { useParams } from "react-router";
import { useEffect, useState } from "react";
import CommentForm from "../CommentForm/CommentForm";

// services
import * as hootService from "../../services/hootService.js";
import * as commentService from "../../services/commentService.js";

const HootDetails = () => {
  const { id } = useParams();
  const [hoot, setHoot] = useState(null);

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(id);
      setHoot(hootData);
    };
    fetchHoot();
  }, [id]);

  if (!hoot) return <main>LOADING...</main>;

  const handleAddComment = async (commentFormData) => {
    const newComment = await commentService.createComment(
      hoot._id,
      commentFormData,
    );
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };

  return (
    <main>
      <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <p>
            {`${hoot.author.username} posted on
            ${new Date(hoot.createdAt).toLocaleDateString()}`}
          </p>
        </header>
        <p>{hoot.text}</p>
      </section>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />

        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {`${comment.author.username} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HootDetails;
