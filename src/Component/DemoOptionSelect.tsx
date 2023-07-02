import React from 'react';
import {
  Input,
  Select,
  Space,
 
} from 'antd';

const { Option } = Select;

const DemoOption: React.FC = () => (
  <div className="site-space-compact-wrapper">
   
    <Space.Compact block>
      <Select allowClear mode="multiple" defaultValue="Zhejianggggg" style={{ width: '50%' }}>
        <Option value="Zhejianggggg">Zhejianggggg</Option>
        <Option value="Jiangsu">Jiangsu</Option>
      </Select>
    </Space.Compact>
   
  </div>
);

export default DemoOption;