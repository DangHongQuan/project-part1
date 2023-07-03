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

const data = [
    {
        id_sv: "KIO_01",
        name: "Kiosk",
        describe: "Hoạt động",
        isActive: true,
        ct: "Chi tiết",
        cn: "Cập nhật",
    },
    {
        id_sv: "KIO_01",
        name: "Kiosk",
        describe: "Hoạt động",
        isActive: true,
        ct: "Chi tiết",
        cn: "Cập nhật",
    },

];
interface Data {
    id_sv: string;
    name: string;
    describe: string;
    isActive: boolean;
    ct: string;
    cn: string;
}



const Report: React.FC = () => {

    
    

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
                                    <Menu.Item key={item.key} icon={item.icon} className="menu-item" style={item.key === '5' ? { backgroundColor: '#ff7506', color: 'white' } : {}}> {/* Add className="menu-item" */}
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
                                <p className="hederpc mx-2">Báo cáo &gt;  <a href="/reports" className="dsdv ms-2"> Lập báo cáo</a></p>
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
                    <p className="dstbhome">Danh sách dịch vụ</p>

                    <Row className="custom-ms">
                       
                        <Col span={10} className=" ms-3">
                            <label className="tthd " > Chọn thời gian</label>
                            <Space.Compact block>
                                <DatePicker.RangePicker style={{ width: '60%' }} />

                            </Space.Compact>
                        </Col>
                       
                    </Row>



                    <Row className="mt-5 ms-5">
                        <Col span={20}>
                            <Table
                                dataSource={data}
                                bordered
                                pagination={{ pageSize: 5 }}
                                rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-even' : 'table-row-odd')}
                            >
                                <Table.Column
                                    title={<span>Mã dịch vụ</span>}
                                    dataIndex="id_sv"
                                    key="id_sv"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                <Table.Column
                                    title={<span className="table-title">Tên dịch vụ</span>}
                                    dataIndex="name"
                                    key="name"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                <Table.Column
                                    title={<span className="table-title">Mô tả</span>}
                                    dataIndex="describe"
                                    key="describe"
                                    render={(text: string) => <span>{text}</span>}
                                />
                                  <Table.Column
                                    title={<span className="table-title">Trạng thái hoạt động</span>}
                                    dataIndex="status"
                                    key="status"
                                    render={(text: string) => <span>{text}</span>}
                                />
                          
                                
                            </Table>
                        </Col>
                        <Col span={3} className="ms-1">
                            <Link to={"/addService"}>
                                <Card className="bgaDvice">
                                    <img src="/img/icon/document-download.png" alt="" />
                                    <p>Tải về   </p>

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

export default Report;

