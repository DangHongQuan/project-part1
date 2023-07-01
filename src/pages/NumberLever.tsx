import React, { useEffect, useState } from "react";
import './homedasboard.css'
import { Link, Route, Routes } from "react-router-dom";
import {
    AppstoreOutlined,
    AreaChartOutlined,
    BuildOutlined,
    CameraOutlined,
    DesktopOutlined,
    LoginOutlined,
    MessageOutlined,
    SearchOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Col, DatePicker, Form, Image, Input, Layout, Menu, Row, Select, Space, Table } from "antd";
import { Header } from "antd/es/layout/layout";
import Column from "antd/es/table/Column";

import './numberlever.css'
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


const data = [
    {
        id: 1,
        name: "máy tính",
        ipAddress: "192.168.1.1",
        isActive: true,
        isConnected: true,
        service: "Dịch vụ máy tính",
        ct: "Chi tiết",
        cn: "Cập nhật",
    },
    {
        id: 2,
        name: "máy tính",
        ipAddress: "192.168.1.1",
        isActive: true,
        isConnected: true,
        service: "Dịch vụ máy tính",
        ct: "Chi tiết",
    },

    // ...Thêm dữ liệu của các thiết bị khác
];

// const userData = JSON.parse(localStorage.getItem('userData') || '{}');

const handleLogout = () => {
    // Xử lý đăng xuất tại đây (ví dụ: xóa thông tin đăng nhập, đặt lại trạng thái, v.v.)
    // Sau đó, chuyển hướng về trang đăng nhập
    // Ví dụ: xóa thông tin người dùng trong localStorage
    localStorage.removeItem('userData');
    window.location.href = ('/')
};

const NumberLever: React.FC = () => {
    const [userData, setUserData] = useState<any>({});
    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
        setUserData(storedUserData);
    }, []);
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
                                    <Menu.Item
                                        key={item.key} icon={item.icon} className="menu-item" style={item.key === '4' ? { backgroundColor: '#ff7506', color: 'white' } : {}}> {/* Add className="menu-item" */}
                                        <Link to={item.path}>{item.label}</Link>
                                    </Menu.Item>
                                )
                            )}

                        </Menu>
                    </div>
                    <Button className="btn-dangxuat" icon={<LoginOutlined style={{ color: "#ff7506" }} />}>
                        <span onClick={handleLogout} className="btn-text__logout">Đăng xuất</span>

                    </Button>
                </Sider>

                <Content className="bg">
                    <Header className="hdaccount">
                        <Row >
                            <Col span={10}>
                                <p className="hederpc mx-2">Cấp số &gt;  <a href="/numbers" className="dstb ms-2"> Danh sách cấp số</a></p>

                            </Col>
                            <Col span={11}>
                                <div className="hederpaccount text-end">
                                    <img src="/img/icon/notification.png" className="me-2 iconaccount" />
                                    <img src={userData.imageURL} alt="" className="imgaccount" />
                                </div>

                            </Col>
                            <Col span={3}>
                                <p className="xc">xin chào</p>
                                <p className="name">{userData.name}</p>
                            </Col>
                        </Row>
                    </Header>


                    <p className="dstbhome">Danh sách cấp số</p>

                    <Row className="custom-ms">
                        <Col span={3}>
                            <label className="tthd ">Tên dịch vụ</label>
                            <Select defaultValue="all" style={{ width: 154 }} className="slectTop d-flex ms-3">
                                <Select.Option value="all"  >Tất cả</Select.Option>
                                <Select.Option value="active">Hoạt động</Select.Option>
                                <Select.Option value="inactive">
                                    Ngưng hoạt động
                                </Select.Option>
                            </Select>
                        </Col>
                        <Col span={3} className="">
                            <label className="tthd ">Tình trạng</label>
                            <Select defaultValue="all" style={{ width: 154 }} className="slectTop d-flex ms-3">
                                <Select.Option value="all"  >Tất cả</Select.Option>
                                <Select.Option value="active">Hoạt động</Select.Option>
                                <Select.Option value="inactive">
                                    Ngưng hoạt động
                                </Select.Option>
                            </Select>
                        </Col>
                        <Col span={3} className="">
                            <label className="tthd ">Nguồn cấp</label>
                            <Select defaultValue="all" style={{ width: 154 }} className="slectTop d-flex ms-3">
                                <Select.Option value="all"  >Tất cả</Select.Option>
                                <Select.Option value="active">Hoạt động</Select.Option>
                                <Select.Option value="inactive">
                                    Ngưng hoạt động
                                </Select.Option>
                            </Select>
                        </Col>
                        <Col span={6} className=" ms-3">
                            <label className="ctg  " > Chọn thời gian</label>
                            <Space.Compact block>
                                <DatePicker.RangePicker style={{ width: '60%' }} />

                            </Space.Compact>
                        </Col>
                        <Col span={5} className="custom-tk ms-1">
                            <label className="tukhoa">Từ khóa</label>
                            <Input
                                style={{ width: 280 }}
                                placeholder="Nhập từ khóa"
                                suffix={
                                    <Space>
                                        <SearchOutlined
                                            className="d-flex align-items-center justify-content-center inputtk"
                                            style={{ color: "#1890ff" }}
                                        />
                                    </Space>
                                }
                            />
                        </Col>
                    </Row>



                    <Row className="mt-5 ms-5">
                        <Col span={20}>
                            <Table dataSource={data} bordered pagination={{ pageSize: 5 }} rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-even' : 'table-row-odd')} >
                                <Column
                                    title={<span className="table-title">STT</span>}
                                    dataIndex="id"
                                    key="id"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                <Column
                                    title={<span className="table-title">Tên khách hàng</span>}
                                    dataIndex="name"
                                    key="name"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                <Column
                                    title={<span className="table-title">Tên dịch vụ</span>}
                                    dataIndex="ipAddress"
                                    key="ipAddress"
                                    render={(text: string) => <span>{text}</span>}
                                />


                                <Column
                                    title={<span className="table-title">Thời gian cấp</span>}
                                    dataIndex="service"
                                    key="service"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                <Column
                                    title={<span className="table-title">Hạn sử dụng</span>}
                                    dataIndex="service"
                                    key="service"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                <Column
                                    title={<span className="table-title">Trạng thái</span>}
                                    dataIndex="service"
                                    key="service"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                <Column
                                    title={<span className="table-title">Nguồn cấp</span>}
                                    dataIndex="service"
                                    key="service"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                <Column
                                    title=""
                                    dataIndex="ct"
                                    key="ct"
                                    render={(text: string) => <Link to={"/detailNumberLever"}>{text}</Link>}
                                />

                            </Table>
                        </Col>
                        <Col span={3} className="ms-1">
                            <Link to={"/addNumberLever"}>
                                <Card className="bgaDvice">
                                    <img src="/img/icon/add-square.png" alt="" />
                                    <p>Cấp số mới</p>
                                </Card>
                            </Link>
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

export default NumberLever;
