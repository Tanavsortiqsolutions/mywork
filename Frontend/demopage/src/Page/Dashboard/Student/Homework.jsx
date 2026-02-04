import React, { useEffect, useRef } from 'react';
import { Card, List, Typography } from 'antd';
import gsap from 'gsap';

const { Title } = Typography;

const Homework = () => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.from(ref.current, { opacity: 1, y: 10, duration: 0.5 });
  }, []);

  const data = [
    { title: 'Math: Chapter 5 exercises' },
    { title: 'Science: Project on Plants' },
    { title: 'English: Read pages 23-30' },
  ];

  return (
    <Card ref={ref} title={<Title level={4}>Homework</Title>}>
      <List dataSource={data} renderItem={(item) => <List.Item>{item.title}</List.Item>} />
    </Card>
  );
};

export default Homework;
