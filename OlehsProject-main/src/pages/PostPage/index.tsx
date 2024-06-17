import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeletePostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "../../api/posts";
import styles from "./PostPage.module.scss";
import { useGetCommentByIdQuery } from "../../api/comments";
import { Spin, Card, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import PostModal from "../../components/PostModal";
import { Post } from "../../types/posts";
import { useState } from "react";

const PostPage = () => {
  const { id } = useParams();
  const { data: postInfo } = useGetPostByIdQuery(id!);
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);

  const navigate = useNavigate();
  const { data: comments = [], isLoading } = useGetCommentByIdQuery(
    postInfo?.id!
  );

  const updatePostHandler = async (updatedPost: Post) => {
    try {
      await updatePost(updatedPost);
      navigate(`/users/${postInfo?.userId}`);
      toast("Post updated successfully!");
    } catch (e) {
      console.log(e);
    }
  };

  const deletePostHandler = async () => {
    try {
      await deletePost(postInfo?.id!);
      navigate(`/users/${postInfo?.userId}`);
      toast("Post deleted successfully!");
    } catch (e) {
      console.log(e);
    }
  };

  const openEditPostModal = () => setIsEditPostModalOpen(true);

  return (
    <div className={styles.container}>
      <Link to={`/users/${postInfo?.userId}`} className={styles.backLink}>
        <LeftOutlined />
        Back to posts
      </Link>
      <div className={styles.actionButtonsContainer}>
        <Button size="large" onClick={openEditPostModal}>
          Edit
        </Button>
        <Button size="large" onClick={deletePostHandler}>
          Delete
        </Button>
      </div>
      <div>
        <span className={styles.key}>Title:</span> {postInfo?.title}
      </div>
      <div>
        <span className={styles.key}>Body:</span> {postInfo?.body}
      </div>
      <div className={styles.commentsTitle}>Comments:</div>
      {isLoading ? (
        <Spin className={styles.spin} />
      ) : (
        comments.map((e) => (
          <Card
            key={e.id}
            className={styles.comment}
            title={`Comment by: ${e.email}`}
            hoverable
          >
            <div className={styles.innerContainer}>
              <div> {e.body}</div>
            </div>
          </Card>
        ))
      )}
      <PostModal
        title="Edit post"
        closeModal={() => setIsEditPostModalOpen(false)}
        isModalOpen={isEditPostModalOpen}
        onFinish={updatePostHandler}
      />
    </div>
  );
};

export default PostPage;
