import { ReactNode } from "react";
import styles from "./Layout.module.scss";
import { Alert, Layout, Menu } from "antd";
import { InfoOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

interface IMainLayout {
  children: ReactNode;
}

const MainLayout = ({ children }: IMainLayout) => {
  return (
    <Layout className={styles.container}>
      <Alert
        showIcon
        message="Important: resource will not be really updated on the server but it will be faked as if."
        type="info"
      />
      <Header className={styles.header}>
        <span className={styles.title}> Users project</span>

        <Menu theme="dark" mode="horizontal"></Menu>
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>
        Oleh Selin ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default MainLayout;
