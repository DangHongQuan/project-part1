import React, { useEffect, useState } from "react";
// import './homedasboard.css'
// import  useFetchServiceData  from '../redux/serviceActions';

import { Badge, Card, DatePicker, Pagination, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './dasbordefault.css'
import './service.css'
import './detaildevice.css'
import { Link, Route, useNavigate, Routes, useParams } from 'react-router-dom';
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
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import './detailservice.css'

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



const DetailServiceeee: React.FC = () => {


    const navigate = useNavigate();
    const { id_sv } = useParams<{ id_sv: string }>();
    const data = useSelector((state: RootState) => state.service.data);

    // Kiểm tra xem dữ liệu đã được lấy thành công hay chưa
    const selectedData = data.find(item => item.id_sv === id_sv);
    if (!selectedData) {
        return <div>Loading...</div>; // Hoặc thông báo lỗi nếu cần
    }


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
                                <p className="hederpc mx-2">Dịch vụ &gt;  <a href="/services" className="dstbadd ms-2"> Danh sách dịch vụ  &gt;</a> <a href="/" className="dsdv ms-2"> Chi tiết</a></p>
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
                    <p className="dstbhome">Quảng lý dịch vụ</p>
                    <Row>
                        <Col span={7} className="ms-3">
                            <Card>
                                <h1 className="tbdv">Thông tin dịch vụ</h1>
                                <p className="mdv d-flex"> Mã dịch vụ: {selectedData.id_sv}  </p>
                                <p className="mdv d-flex">Tên dịch vụ: {selectedData.name}  </p>
                                <p className="mdv d-flex"> Mô tả:  {selectedData.describe} </p>
                                <h1 className="tbdv">Quy tắt cấp số</h1>
                                <span className="d-flex"> {selectedData.numberlever}</span>
                            </Card>
                        </Col>
                        <Col span={13} className="ms-3">
                            <Card>
                                <h1>Table</h1>

                            </Card>
                        </Col>
                        <Col span={3} >

                            <div className="cnsc">  
                            <a onClick={() => navigate(`/editService/${selectedData.id_sv}`)}>
                                <img src="/img/icon/Edit Square.png" /> <br /><span>Cập Nhật</span></a>
                                
                                </div>
                                <div className="cnsc1">  
                            <a href="/services">
                                <img src="/img/Edit Square.png" /> <br /><span>Quay lại    </span></a>
                                
                                </div>


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

export default DetailServiceeee;


