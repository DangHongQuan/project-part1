import React from "react";
import { Card } from 'antd';
import './dasbordefault.css'
import './adddevice.css'
import { Link, Route, Routes } from "react-router-dom";
import {
    AppstoreOutlined,
    AreaChartOutlined,
    BuildOutlined,
    DesktopOutlined,
    LoginOutlined,
    MessageOutlined,
    SearchOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Layout, Menu, Row, Select, Space } from "antd";
import { Header } from "antd/es/layout/layout";
// Lấy thông tin người dùng từ localStorage
const userData = JSON.parse(localStorage.getItem('userData') || '{}');

const { Sider, Content } = Layout;
const { SubMenu } = Menu;



type Menu = {
    key: string;
    icon: React.ReactNode;
    label: React.ReactNode;
    path: string;
    children?: Menu[];
};

function getItem(
    label: React.ReactNode,
    key: string,
    icon: React.ReactNode,
    path: string,
    children?: Menu[]
): Menu {
    return {
        key,
        icon,
        label,
        path,
        children,
    } as Menu;
}

const items: Menu[] = [
    getItem("Dashboard", "1", <AppstoreOutlined />, "/dasboard"),
    getItem("Thiết bị", "2", <DesktopOutlined />, "/device"),
    getItem("Dịch vụ", "3", <MessageOutlined />, "/services"),
    getItem("Cấp số", "4", <BuildOutlined />, "/numbers"),
    getItem("Báo cáo", "5", <AreaChartOutlined />, "/reports"),
    getItem("Cài đặt hệ thống", "6", <SettingOutlined />, "/settings", [
        getItem("Quản lý vai trò", "6.1", <SettingOutlined />, "/roles"),
        getItem("Quản lý tài khoản", "6.2", <SettingOutlined />, "/accounts"),
        getItem("Quản lý người dùng", "6.3", <SettingOutlined />, "/users"),
    ]),
];
interface DataType {
    key: string;
    name: string;
    age: number;
    tel: string;
    phone: number;
    address: string;
}


const AddDevice: React.FC = () => {
    return (
        <>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider theme="light" className="sidebar">
                    <div style={{ width: 200 }}>
                        <img src="/img/Logoalta.png" className="mb-5" style={{ width: 100 }} />
                        <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="vertical" theme="light" className="abc">
                            {items.map((item) =>
                                item.children ? (
                                    <SubMenu key={item.key} icon={item.icon} title={item.label}>
                                        {item.children.map((child) => (
                                            <Menu.Item key={child.key} className="menu-item"> {/* Add className="menu-item" */}
                                                <Link to={child.path}>{child.label}</Link>
                                            </Menu.Item>
                                        ))}
                                    </SubMenu>
                                ) : (
                                    <Menu.Item key={item.key} icon={item.icon} className="menu-item" style={item.key === '2' ? { backgroundColor: '#ff7506', color: 'white' } : {}}> {/* Add className="menu-item" */}
                                        <Link to={item.path}>{item.label}</Link>
                                    </Menu.Item>
                                )
                            )}

                        </Menu>
                    </div>
                    <Button className="btn-dangxuat" icon={<LoginOutlined style={{ color: "#ff7506" }} />}>
                        <span className="btn-text__logout">Đăng xuất</span>

                    </Button>
                </Sider>
                <Content>
                    <Header className="hdaccount">
                        <Row >
                            <Col span={10}>
                                <p className="hederpc mx-2">Thiết bị &gt;
                                    <a href="/device" className="dstbadd ms-2"> Danh sách thiết bị &gt;</a>
                                    <a href="/addDevice" className="dstbadd dstb ms-2"> Thêm thiết bị</a>
                                </p>
                            </Col>
                            <Col span={11}   >
                                <div className="hederpaccount text-end">
                                    <img src="/img/icon/notification.png" className="me-2 iconaccount" />
                                    <img src={userData.imageURL } alt="" className="imgaccount" />
                                </div>
                            </Col>
                            <Col span={3} >
                                <a href="/persoalaccount">
                                    <p className="xc">xin chào</p>
                                    <p className="name">{userData.name}</p>
                                </a>

                            </Col>
                        </Row>
                    </Header>
                    <p className="qltb">Quảng lý thiết bị</p>


                    <Card className="card">
                        <p className="tttb">Thông tin thiết bị</p>
                        <Row>
                            <Col span={11} className="mx-2">
                                <h1 className="lbadd">Mã thiết bị: <i className="kytu"> &#42;</i></h1>
                                <Input placeholder="Nhập mã thiết bị" className="inputadd" />
                            </Col>
                            <Col span={11} className="ms-4">
                                <h1 className="lbadd">Loại thiết bị: <i className="kytu"> &#42;</i></h1>
                                <select className="inputaddSelect" >
                                    <option disabled >Chọn loại thiết bị</option>
                                    <option value="">Kiosk</option>
                                    <option value="">Display couter</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={11} className="mx-2">
                                <h1 className="lbadd">Tên thiết bị: <i className="kytu"> &#42;</i></h1>
                                <Input placeholder="Nhập mã thiết bị" className="inputadd" />
                            </Col>
                            <Col span={11} className="ms-4">
                                <h1 className="lbadd">Tên đăng nhập: <i className="kytu"> &#42;</i></h1>
                                <Input placeholder="Nhập mã thiết bị" className="inputadd" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={11} className="mx-2">
                                <h1 className="lbadd">Địa chỉ ip: <i className="kytu"> &#42;</i></h1>
                                <Input placeholder="Nhập mã thiết bị" className="inputadd" />
                            </Col>
                            <Col span={11} className="ms-4">
                                <h1 className="lbadd">Mật khẩu: <i className="kytu"> &#42;</i></h1>
                                <Input placeholder="Nhập mã thiết bị" className="inputadd" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={23} className="mx-2">
                                <h1 className="lbadd">Dịch vụ sử dụng: <i className="kytu"> &#42;</i></h1>
                                <Input placeholder="Nhập mã thiết bị" className="inputaddAll" />
                            </Col>

                        </Row>


                    </Card>
                    <Row className="justify-content-center mt-3">
                        <Col span={10} className="text-end col-hb">
                            <button className="btn-adddvice">
                                Hủy bỏ
                            </button>
                        </Col>
                        <Col span={12} className="d-flex ms-5">
                            <button className="btn-ttb">
                                Thêm thiết bị
                            </button>
                        </Col>
                    </Row>


                    <Routes >
                        {items.map((item) => (
                            <Route key={item.key} path={item.path}>
                                {item.label}
                            </Route>
                        ))}
                    </Routes>
                </Content>
            </Layout>
        </>
    )
};

export default AddDevice;