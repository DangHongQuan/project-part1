import React, { useEffect, useState } from "react";
import { Badge, Card, DatePicker, Pagination, Table, Tooltip } from 'antd';
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
    SettingOutlined,
} from "@ant-design/icons";
import { saveAs } from 'file-saver';

import { Button, Col, Input, Layout, Menu, Row, Select, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import Column from "antd/es/table/Column";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxtoolkit/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { format } from "date-fns";
import { fetchNumberData } from "../reduxtoolkit/NumberLeverActions";
import { write, utils as XLSXUtils, writeFile } from 'xlsx';
import { fetchstoryData } from "../reduxtoolkit/StoryAction";

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
const DownloadButton = ({ handleDownload }) => (
    <Button onClick={handleDownload}>Tải về</Button>
  );
 
function convertTableToExcelData(tableData) {
    const worksheet = XLSXUtils.json_to_sheet(tableData);
    const workbook = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    return excelData;
  }

const Story: React.FC = () => {
   
    const [userData, setUserData] = useState<any>({});
    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
        setUserData(storedUserData);
    }, []);

    const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();


    useEffect(() => {
        dispatch(fetchstoryData());
    }, [dispatch]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const { datastory } = useSelector((state: RootState) => state.story);
    const handleSearch = () => {
        const filtered = datastory.filter((item) => {
            const itemDate = new Date(item.date);
            const startDate = selectedDate && selectedDate[0] ? new Date(selectedDate[0]) : null;
            const endDate = selectedDate && selectedDate[1] ? new Date(selectedDate[1]) : null;

            if (startDate && endDate) {
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 999);
            }
            return (
                item.name &&
                (!selectedDate || (startDate && endDate && itemDate >= startDate && itemDate <= endDate)) &&
                item.name.toLowerCase().includes(searchText.toLowerCase())
            );
        });
        return filtered;
    };
    const handleDateChange = (dates) => {
        setSelectedDate(dates);
    };
    const handleChangeSearchText = e => {
      setSearchText(e.target.value);
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

                        <Col span={15} className=" ms-3">
                            <label className="tthd " > Chọn thời gian</label>
                            <Space.Compact block>
                                <DatePicker.RangePicker style={{ width: '30%' }} onChange={handleDateChange} />


                            </Space.Compact>
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
                                <Table dataSource={handleSearch()} bordered pagination={{ pageSize: 5 }} rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-even' : 'table-row-odd')} >
                                    <Column
                                        dataIndex="name"
                                        key="name"
                                        title={<span className="table-title">Tên đăng nhập</span>}
                                        
                                        
                                        render={(text: string) => <span>{text}</span>}
                                    />
                                       <Column
                                    title={<span className="table-title">Thời gian thao tác</span>}
                                    dataIndex="date"
                                    key="date"
                                    render={(text: string) => <span>{format(new Date(text), "HH:mm:ss ' ' dd/MM/yyyy")}</span>}
                                />
                                 <Column
                                        dataIndex="ip"
                                        key="ip"
                                        title={<span className="table-title">Ip thực hiện</span>}
                                        
                                        
                                        render={(text: string) => <span>{text}</span>}
                                    />
                                        <Column
                                        dataIndex="operations"
                                        key="operations"
                                        title={<span className="table-title">Thao tác thực hiện</span>}
                                        
                                        
                                        render={(text: string) => <span>{text}</span>}
                                    />





                                </Table>
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

export default Story;


