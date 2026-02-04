import React, { useEffect, useRef } from 'react';
import { Card, Typography } from 'antd';
import gsap from 'gsap';

const { Title, Paragraph } = Typography;

const Announcement = () => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.from(ref.current, { opacity: 1, scale: 0.98, duration: 0.45 });
  }, []);

  return (
    <Card ref={ref} title={<Title level={4}>Announcement</Title>}>
      <Paragraph>School picnic announced for next month. Details will follow soon.</Paragraph>
    </Card>
  );
};

export default Announcement;
