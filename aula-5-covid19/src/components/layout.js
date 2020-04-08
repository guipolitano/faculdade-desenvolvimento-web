import React from 'react';
import { Layout, Menu } from "antd";
const {Header, Footer, Content} = Layout;
const LayoutBase = ({children}) => {
  return (
    <React.Fragment>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">Gráfico</Menu.Item>
            <Menu.Item key="2">Prevenção</Menu.Item>
            <Menu.Item key="3">COVID-19</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </React.Fragment>
  );
}
export default LayoutBase;
