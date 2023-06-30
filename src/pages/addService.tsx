import React from "react";
// import './homedasboard.css'
import { Badge, Card, Checkbox, DatePicker, Form, Pagination, Table, Tag } from 'antd';
import './dasbordefault.css'
import './addservice.css'
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
import Column from "antd/es/table/Column";
import TextArea from "antd/es/input/TextArea";


const { Sider, Content } = Layout;
const { SubMenu } = Menu;

// Lấy thông tin người dùng từ localStorage
const userData = JSON.parse(localStorage.getItem('userData') || '{}');

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

// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0


const AddService: React.FC = () => {
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
                                    <Menu.Item key={item.key} icon={item.icon} className="menu-item" style={item.key === '3' ? { backgroundColor: '#ff7506', color: 'white' } : {}}> {/* Add className="menu-item" */}
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
                                <p className="hederpc mx-2">Dịch vụ &gt;
                                    <a href="/device" className=" dsdvadd ms-2"> Danh sách dịch vụ &gt;  </a>
                                    <a href="" className="dsdv ms-2"> Thêm dịch vụ</a>
                                </p>
                            </Col>
                            <Col span={11}   >
                                <div className="hederpaccount text-end">
                                    <img src="/img/icon/notification.png" className="me-2 iconaccount" />
                                    <img src={userData.imageURL} alt="" className="imgaccount" />
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
                    <p className="qldv">Quản lý dịch vụ</p>
                    <Card className="card">
                        <p className="thongTindichvu">Thông tin dịch vụ</p>
                        <Row>
                            <Col span={11}>
                                <Row>
                                    <Col span={24}>
                                        <label className="lbaddSe" > Mã dịch vụ: <i className="kytu"> &#42;</i></label>
                                        <Input className="inputaddSe" />
                                    </Col>
                                    <Col span={24}>
                                        <label className="lbaddSe custom-lbadd" > Tên dịch vụ: <i className="kytu"> &#42;</i></label>
                                        <Input className="inputaddSe" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={11} className="ms-4">

                                <label className="lbaddSe" >Mô tả: </label>
                                <TextArea rows={5} />

                            </Col>
                        </Row>
                        <p className="qtcs mt-4"> Quy tắt cấp số</p>
                        <Row>
                            <Col span={20}>
                                <Checkbox className="checkbok" >Tăng tự động từ:
                                    <Tag className="ms-1 tagcheck">0001</Tag>
                                    đến
                                    <Tag className="ms-1"> 999</Tag>
                                </Checkbox>
                            </Col>
                            <Col span={20} className="mt-3">
                                <Checkbox className="checkbok" >Frefix:
                                    <Tag className="ms-7 tagcheck">0001</Tag>
                                </Checkbox>
                            </Col>
                            <Col span={20} className="mt-3">
                                <Checkbox className="checkbok" >Surfix:
                                    <Tag className="ms-7 tagcheck">0001</Tag>
                                </Checkbox>
                            </Col>
                            <Col span={20} className="mt-3">
                                <Checkbox className="checkbok" >Reset mỗi ngày
                                </Checkbox>
                            </Col>
                        </Row>
                        <p className="mt-5 abs"> <i className="kytu"> &#42;</i> là trường thông tin bắt buộc</p>
                    </Card>
                    <Row className="justify-content-center mt-3">
                        <Col span={10} className="text-end col-hb">
                            <button className="btn-adddvice">
                                Hủy bỏ
                            </button>
                        </Col>
                        <Col span={12} className="d-flex ms-5">
                            <button className="btn-ttb">
                                Thêm dịch vụ
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

export default AddService;