import { Button, Form, Input, Modal } from "antd";
import { Post } from "../../../../types/posts";
import styles from "./AddPostModal.module.scss";
import { useAddPostMutation } from "../../../../api/posts";
import { toast } from "react-toastify";
interface AddPostModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  userId: number;
  onAddPostFinish: () => void;
}

const AddPostModal = ({
  isModalOpen,
  closeModal,
  userId,
  onAddPostFinish,
}: AddPostModalProps) => {
  const [addNewPost] = useAddPostMutation();

  const handleCancel = () => {
    closeModal();
  };

  const onFinish = async (values: Post) => {
    try {
      await addNewPost({ ...values, userId });
      closeModal();
      onAddPostFinish();
      toast("Post added successfully!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      title="Add post"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      className={styles.container}
    >
      <Form name="addNewPost" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="body"
          rules={[
            {
              required: true,
              message: "Please input description!",
            },
          ]}
        >
          <Input.TextArea className={styles.descriptionTextarea} />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.submitButton}
        >
          Add
        </Button>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
