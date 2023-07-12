// import React, { useState, useEffect } from 'react';
// import { Area } from '@ant-design/plots';

// interface DataItem {
//   timePeriod: string;
//   value: number;
// }

// const DemoArea = () => {

//   const [data, setData] = useState<DataItem[]>([]);

//   useEffect(() => {
//     const newData = [
//       { timePeriod: 'Q1', value: 100 },
//       { timePeriod: 'Q2', value: 150 },
//       { timePeriod: 'Q3', value: 120 },
//       { timePeriod: 'Q4', value: 180 },
//     ];
//     setData(newData);
//   }, []);

//   const config = {
//     data,
//     xField: 'timePeriod',
//     yField: 'value',
//     xAxis: {
//       range: [0, 1],
//     },
//   };

//   return <Area {...config} />;
// };

// export default DemoArea;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { Area } from '@ant-design/plots';
import { RootState } from '../reduxtoolkit/store';
import { fetchNumberData } from '../reduxtoolkit/NumberLeverActions';

const DemoArea = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { data } = useSelector((state: RootState) => state.numberlever);
  const dataChart = data || [];

  useEffect(() => {
    dispatch(fetchNumberData());
  }, [dispatch]);

  const newData = dataChart.map((item: any) => {
    const date = new Date(item.data);
    const dateString = date.toISOString().slice(0, 100);
    const count = dataChart.filter((d: any) => d.data === item.data).length;
    return { timePeriod: dateString, value: count };
  });

  const sortedData = newData.sort((a, b) => {
    if (a.timePeriod < b.timePeriod) return -1;
    if (a.timePeriod > b.timePeriod) return 1;
    return 0;
  });

  const config = {
    data: sortedData,
    xField: 'timePeriod',
    yField: 'value',
    seriesField: '', // Xóa seriesField để chỉ hiển thị một đường
    xAxis: {
      range: [0, 1],
    },
  };

  return <Area {...config} />;
};

export default DemoArea;

