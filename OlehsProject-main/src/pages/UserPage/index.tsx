import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import styles from "./UserPage.module.scss";
import { useGetPostsByIdQuery } from "../../api/posts";
import { Button, Card, Flex, Spin, Typography } from "antd";
import { useGetUserByIdQuery } from "../../api/users";
import AddPostModal from "./components/AddPostModal";
import { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const UserPage = () => {
  const { id } = useParams();
  const { data: posts, isLoading } = useGetPostsByIdQuery(id!);
  const { data: userInfo } = useGetUserByIdQuery(id!);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { width, height } = useWindowSize();
  const [isFinished, setIsFinished] = useState(false);

  const openAddModal = () => setIsAddModalOpen(true);

  return (
    <div className={styles.container}>
      <Link to={"/"} className={styles.backLink}>
        <LeftOutlined />
        All users
      </Link>
      <Flex className={styles.titleContainer}>
        <Typography.Title>Posts by {userInfo?.name}</Typography.Title>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={openAddModal}
        >
          Add Post
        </Button>
      </Flex>
      <div>
        {isLoading ? (
          <Spin className={styles.spin} />
        ) : (
          posts?.map((e) => (
            <Card key={e.id} className={styles.post} title={e.title} hoverable>
              <div className={styles.innerContainer}>
                <div> {e.body}</div>
                <Link to={`/posts/${e.id}`}>
                  <Button>Details</Button>
                </Link>
              </div>
            </Card>
          ))
        )}
        <AddPostModal
          isModalOpen={isAddModalOpen}
          closeModal={() => setIsAddModalOpen(false)}
          userId={userInfo?.id!}
          onAddPostFinish={() => setIsFinished(true)}
        />
        <Confetti
          run={isFinished}
          recycle={false}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default UserPage;
