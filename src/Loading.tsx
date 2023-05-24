import React from 'react';
import { Space, Spin } from 'antd';
const Loading = () => {
  return (
    <div>
      <Space>
        <Spin size="large" />
        <strong>Loading....</strong>
      </Space>
    </div>
  );
};

export default Loading;

// scp -P 22004 -r /Users/kanghongen/WebstormProjects/cellular_response_fronted/dist/cedr root@192.168.164.83:/cedr/dist
// ssh -p 22004 root@192.168.164.83
