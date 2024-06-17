import { Button, Form, Input, Modal } from "antd";
import { Post } from "../../types/posts";
import styles from "./PostModal.module.scss";

interface PostModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  title: string;
  defaultValue?: Post;
  onFinish: any;
}

const PostModal = ({
  isModalOpen,
  closeModal,
  title,
  defaultValue,
  onFinish,
}: PostModalProps) => {
  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      className={styles.container}
    >
      <Form name={title} onFinish={onFinish} layout="vertical">
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
          <Input defaultValue={defaultValue?.title} />
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
          <Input.TextArea
            className={styles.descriptionTextarea}
            defaultValue={defaultValue?.body}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.submitButton}
        >
          {title}
        </Button>
      </Form>
    </Modal>
  );
};

export default PostModal;
