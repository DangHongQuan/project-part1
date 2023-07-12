import React from 'react';
import { RingProgress } from '@ant-design/plots';

interface DemoRingProgressProps {
  height?: number;
  width?: number;
  autoFit?: boolean;
  percent?: number;
  color?: string[];
}

const DemoRingProgress: React.FC<DemoRingProgressProps> = ({
  height = 100,
  width = 100,
  autoFit = false,
  percent = 0.7,
  color = ['#5B8FF9', '#E8EDF3'],
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Căn giữa theo chiều dọc
  };

  const config = {
    height,
    width,
    autoFit,
    percent,
    color,
  };

  return (
    <div style={containerStyle}>
      <RingProgress {...config} />
    </div>
  );
};

export default DemoRingProgress;
