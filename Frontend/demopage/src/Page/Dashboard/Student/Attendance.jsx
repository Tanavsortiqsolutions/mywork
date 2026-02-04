import React, { useEffect, useRef } from 'react';
import { Card, Typography } from 'antd';
import gsap from 'gsap';

const { Title, Paragraph } = Typography;

const Attendance = () => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.from(ref.current, { opacity: 1, y: 10, duration: 0.5 });
  }, []);

  return (
    <Card ref={ref} title={<Title level={4}>Attendance</Title>}>
      <Paragraph>Attendance details and calendar will appear here.</Paragraph>
    </Card>
  );
};

export default Attendance;
