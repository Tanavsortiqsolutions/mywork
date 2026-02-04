import React, { useEffect, useRef } from 'react';
import { Card, Table, Typography } from 'antd';
import gsap from 'gsap';

const { Title } = Typography;

const FeeLedger = () => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.from(ref.current, { opacity: 1, y: 10, duration: 0.5 });
  }, []);

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Description', dataIndex: 'desc', key: 'desc' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  const data = [
    { key: 1, date: '2026-01-05', desc: 'Tuition', amount: '$200', status: 'Paid' },
    { key: 2, date: '2025-12-10', desc: 'Library Fine', amount: '$5', status: 'Unpaid' },
  ];

  return (
    <Card ref={ref} title={<Title level={4}>Fee Ledger</Title>}>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

export default FeeLedger;
