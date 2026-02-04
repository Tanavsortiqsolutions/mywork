import React, { useEffect, useRef } from 'react';
import { Card, Typography } from 'antd';
import gsap from 'gsap';
import './Notice.css';

const { Title, Text } = Typography;

const Notice = () => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.from(ref.current, { opacity: 1, x: 10, duration: 0.5 });
  }, []);

  const notices = [
    { id: 1, title: 'School Closed', message: 'School will remain closed on Friday', date: '2026-02-05' },
    { id: 2, title: 'Parent-Teacher Meeting', message: 'Parent-teacher meeting on 20th Feb at 2 PM', date: '2026-02-04' },
    { id: 3, title: 'Project Submission', message: 'Submit science project by end of this month', date: '2026-02-03' },
  ];

  return (
    <Card ref={ref} title={<Title level={4}>Notices</Title>} className="notice-card">
      <div className="notices-container">
        {notices.map((notice) => (
          <div key={notice.id} className="notice-item">
            <div className="notice-header">
              <Text strong>{notice.title}</Text>
              <Text type="secondary" className="notice-date">{notice.date}</Text>
            </div>
            <div className="notice-body">
              <Text>{notice.message}</Text>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Notice;
