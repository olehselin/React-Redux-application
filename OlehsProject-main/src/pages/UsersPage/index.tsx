import { useGetUsersQuery } from "../../api/users";
import { Button, Card, Spin, Typography } from "antd";
import styles from "./UsersPage.module.scss";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const { data, isLoading } = useGetUsersQuery(null);

  return (
    <div className={styles.container}>
      <Typography.Title>All users</Typography.Title>
      {isLoading ? (
        <Spin className={styles.spin} />
      ) : (
        data?.map((e) => (
          <Card key={e.id} className={styles.user} title={e.name} hoverable>
            <div className={styles.innerContainer}>
              <div> {e.email}</div>
              <Link to={`/users/${e.id}`}>
                <Button>Posts</Button>
              </Link>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default UsersPage;
