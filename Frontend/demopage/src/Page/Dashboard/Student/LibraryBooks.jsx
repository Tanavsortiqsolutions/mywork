import React, { useEffect, useRef } from 'react';
import { Card, List, Typography } from 'antd';
import gsap from 'gsap';

const { Title } = Typography;

const LibraryBooks = () => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.from(ref.current, { opacity: 1, x: -10, duration: 0.5 });
  }, []);

  const books = [
    { title: 'Mathematics - Algebra', id: 'B001' },
    { title: 'Science - Biology', id: 'B002' },
    { title: 'History - World', id: 'B003' },
  ];

  return (
    <Card ref={ref} title={<Title level={4}>Library Books</Title>}>
      <List
        dataSource={books}
        renderItem={(b) => (
          <List.Item>
            {b.title} <span style={{ marginLeft: 8, color: '#888' }}>{b.id}</span>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LibraryBooks;
