import React, { useEffect } from "react";
// import './homedasboard.css'
import { Badge, Card, Pagination, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './dasbordefault.css'
import './device.css'
import { Link, Route, Routes, useNavigate } from "react-router-dom";
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
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../reduxtoolkit/store";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevicesData } from "../reduxtoolkit/DevicesActions";


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
interface DataType {
  key: string;
  name: string;
  age: number;
  tel: string;
  phone: number;
  address: string;
}

// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
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
    cn: "Cập nhật",
  },

  // ...Thêm dữ liệu của các thiết bị khác
];
const DeviceApp: React.FC = () => {
  const navigate= useNavigate();
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { data } = useSelector((state: RootState) => state.device);

  useEffect(() => {
    dispatch(fetchDevicesData());
  }, [dispatch]);
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
                <p className="hederpc mx-2">Thiết bị &gt;  <a href="/device" className="dstb ms-2"> Danh sách thiết bị</a></p>
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
          <p className="dstbhome">Danh sách thiết bị</p>

          <Row className="custom-ms">
            <Col span={5}>
              <label className="tthd ">Trạng thái hoạt động</label>
              <Select defaultValue="all" style={{ width: 280 }} className="slectTop d-flex ms-3">
                <Select.Option value="all"  >Tất cả</Select.Option>
                <Select.Option value="active">Hoạt động</Select.Option>
                <Select.Option value="inactive">
                  Ngưng hoạt động
                </Select.Option>
              </Select>
            </Col>
            <Col span={10}>
              <label className="ttkn">Trạng thái kết nối</label>
              <Select defaultValue="all" style={{ width: 280 }} className="slectTop d-flex ms-3">
                <Select.Option value="all"  >Tất cả</Select.Option>
                <Select.Option value="active">Hoạt động</Select.Option>
                <Select.Option value="inactive">
                  Ngưng hoạt động
                </Select.Option>
              </Select>
            </Col>
            <Col span={5} className="custom-tk">
              <label className="tk">Từ khóa</label>
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
                  title={<span className="table-title">Mã thiết bị</span>}
                  dataIndex="id_dc"
                  key="id_dc"
                  render={(text: string) => <span>{text}</span>}
                />
                <Column
                  title={<span className="table-title">Tên thiết bị</span>}
                  dataIndex="name"
                  key="name"
                  render={(text: string) => <span>{text}</span>}
                />
                <Column
                  title={<span className="table-title">Địa chỉ IP</span>}
                  dataIndex="ip"
                  key="ip"
                  render={(text: string) => <span>{text}</span>}
                />
                <Column
                  title={
                    <span className="table-title">Trạng thái hoạt động</span>
                  }
                  dataIndex="status_hd"
                  key="status_hd"
                  render={(text: string) => <span>{text}</span>}
                />
                <Column
                  title={
                    <span className="table-title">Trạng thái kết nối</span>
                  }
                  dataIndex="status_kn"
                  key="status_kn"
                  render={(text: string) => <span>{text}</span>}

                />
                <Column
                  title={<span className="table-title">Dịch vụ sử dụng</span>}
                  dataIndex="servie_dc"
                  key="servie_dc"
                  render={(text: string) => <span>{text}</span>}
                />
                <Table.Column
                  title="aaa"
                  dataIndex="ct"
                  key="ct"
                  render={(text: string, record: any) => (
                    <Button onClick={() => navigate(`/detailDevice/${record.id_dc}`)} >Chi tiết</Button>
                  )}
                />
                <Table.Column
                  title="aaaaa"
                  dataIndex="cn"
                  key="cn"
                  render={(text: string, record: any) => (
                    <Button onClick={() => navigate(`/editDevice/${record.id_dc}`)}>Cập Nhật</Button>
                  )}
                />
              </Table>
            </Col>
            <Col span={3} className="ms-1">
              <Link to={"/addDevice"}>
                <Card className="bgaDvice">
                  <img src="/img/icon/add-square.png" alt="" />
                  <p>Thêm thiết bị</p>
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

export default DeviceApp;