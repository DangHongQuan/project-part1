import React from "react";

import { Link, Route, Routes } from "react-router-dom";
import {
  AppstoreOutlined,
  AreaChartOutlined,
  BuildOutlined,
  DesktopOutlined,
  LoginOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import "../Css/abc.css"
import '../Css/admindashborad.css';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;



type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  path: string;
  children?: MenuItem[];
};

function getItem(
  label: React.ReactNode,
  key: string,
  icon: React.ReactNode,
  path: string,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    label,
    path,
    children,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "1", <AppstoreOutlined />, "/"),
  getItem("Thiết bị", "2", <DesktopOutlined />, "/login"),
  getItem("Dịch vụ", "3", <MessageOutlined />, "/services"),
  getItem("Cấp số", "4", <BuildOutlined />, "/numbers"),
  getItem("Báo cáo", "5", <AreaChartOutlined />, "/reports"),
  getItem("Cài đặt hệ thống", "6", <SettingOutlined />, "/settings", [
    getItem("Quản lý vai trò", "6.1", <SettingOutlined />, "/roles"),
    getItem("Quản lý tài khoản", "6.2", <SettingOutlined />, "/accounts"),
    getItem("Quản lý người dùng", "6.3", <SettingOutlined />, "/users"),
  ]),
];

const Dashboard: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" className="sidebar" style={{}}>
        <div style={{ width: 200 }}>
          <img src="/img/Logoalta.png" style={{ width: 100 }} />
          <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="vertical" theme="light">
            {items.map((item) =>
              item.children ? (
                <SubMenu key={item.key} icon={item.icon} title={item.label}>
                  {item.children.map((child) => (
                    <Menu.Item key={child.key}>
                      <Link to={child.path}>{child.label}</Link>
                    </Menu.Item>
                   ))}
                </SubMenu>
              ) : (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
              )
            )}
          </Menu>
        </div>
        <Button className="btn-logout" icon={<LoginOutlined style={{ color: "#ff7506" }} />}>
          <span className="btn-text__logout">Đăng xuất</span>
        </Button>
      </Sider>
      <Content>
        <Routes>
          {items.map((item) => (
            <Route key={item.key} path={item.path}>
              {item.label}
            </Route>
          ))}
        </Routes>
      </Content>
    </Layout>
  );
};

export default Dashboard;