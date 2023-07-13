import React, { useEffect, useState } from "react";
// import './homedasboard.css'
// import  useFetchServiceData  from '../redux/serviceActions';

import { Badge, Card, DatePicker, Pagination, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './dasbordefault.css'
import './service.css'
import { Link, Route, useNavigate, Routes } from 'react-router-dom';
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
import { query } from "express";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxtoolkit/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { fetchServiceData } from "../reduxtoolkit/serviceActions";
import { Option } from "antd/es/mentions";
import { fetchUsersData } from '../reduxtoolkit/UserAction';


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





const PageAccount: React.FC = () => {


    const navigate = useNavigate();
    const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
    const { data } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(fetchUsersData());
    }, [dispatch]);

    const [searchText, setSearchText] = useState('');
    const [searchStatus, setSearchStatus] = useState('');

    const handleSearch = () => {
        const filtered = data.filter(item =>
            item.name &&
            item.name.toLowerCase().includes(searchText.toLowerCase()) &&
            (searchStatus === '' || item.status.toLowerCase() === searchStatus.toLowerCase())
        );
        return filtered;
    };

    const handleChangeSearchText = e => {
        setSearchText(e.target.value);
    };

    const handleChangeSearchStatus = value => {
        setSearchStatus(value);
    };


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
                                    <Menu.Item key={item.key} icon={item.icon} className="menu-item" style={item.key === '' ? { backgroundColor: '#ff7506', color: 'white' } : {}}> {/* Add className="menu-item" */}
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
                                <p className="hederpc mx-2">Cài đặt hệ thống &gt;  
                                <a href="/" className="dsdv ms-2"> Quản lý tài khoản</a></p>
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
                    <p className="dstbhome">Danh sách tài khoản</p>

                    <Row className="custom-ms">
                        <Col span={15}>
                            <label className="tthd ">Trạng thái hoạt động</label>
                            <Select
                             className=" d-flex ms-3"
                                placeholder="Tìm kiếm theo trạng thái hoạt động"
                                value={searchStatus}
                                onChange={handleChangeSearchStatus}
                                style={{ width: 180, marginBottom: 16  }}
                            >
                                <Option value="">Tất cả</Option>
                                <Option value="Hoạt động">Hoạt động</Option>
                                <Option value="Ngừng hoạt động">Ngừng hoạt động</Option>
                            </Select>
                          
                        </Col>
                       
                        <Col span={5} className="custom-tk">
                            <label className="tk">Từ khóa</label>
                            <Input.Search
                                placeholder="Tìm kiếm..."
                                value={searchText}
                                onChange={handleChangeSearchText}
                                onSearch={handleSearch}
                                style={{ marginBottom: 16 }}
                            />

                        </Col>
                    </Row>



                    <Row className="mt-5 ms-5">
                        <Col span={20}>
                          
                            <Table
                                dataSource={handleSearch()}
                                bordered
                                pagination={{ pageSize: 5 }}
                                rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-even' : 'table-row-odd')}
                            >
                                <Table.Column
                                    title={<span>Tên đăng nhập</span>}
                                    dataIndex="email"
                                    key="email"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                <Table.Column
                                    title={<span className="table-title">Họ tên</span>}
                                    dataIndex="name"
                                    key="name"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                <Table.Column
                                    title={<span className="table-title">Số điện thoại</span>}
                                    dataIndex="phone"
                                    key="phone"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                <Table.Column
                                    title={<span className="table-title">Email</span>}
                                    dataIndex="email"
                                    key="email"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                 <Table.Column
                                    title={<span className="table-title">Vai trò</span>}
                                    dataIndex="role"
                                    key="role"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                 <Table.Column
                                    title={<span className="table-title">Trạng thái hoạt động</span>}
                                    dataIndex="status"
                                    key="status"
                                    render={(text: string) => <span>{text}</span>}
                                />
                              
                                <Table.Column
                                    dataIndex="cn"
                                    key="cn"
                                    render={(text: string, record: any) => (
                                        <a className="link-a" onClick={() => navigate(`/editUser/${record.email}`)}>Cập Nhật</a>
                                    )}
                                />
                            </Table>
                        </Col>
                        <Col span={3} className="ms-1">
                            <Link to={"/addcount"}>
                                <Card className="bgaDvice">
                                    <img src="/img/icon/add-square.png" alt="" />
                                    <p>Thêm tài khoản</p>

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

export default PageAccount;


