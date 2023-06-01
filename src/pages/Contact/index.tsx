import React from 'react';
import styles from './index.less';
import { Breadcrumb, Col, Divider, Image, Row, Typography } from 'antd';
const { Paragraph } = Typography;
// @ts-ignore
import { URL_PREFIX } from '@/common/constants';
export default function Page() {
  return (
    <div>
      <Row>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href={URL_PREFIX + '/home'}>
                <strong style={{ fontFamily: 'sans-serif' }}>Home</strong>
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">
                <strong style={{ fontFamily: 'sans-serif' }}>Contact US</strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Col xs={10} sm={10} md={10} lg={8} xl={7} xxl={8}>
          <Paragraph className={styles.title}>Contact US</Paragraph>
          <Paragraph className={styles.subtitle}>Email:</Paragraph>
          <Paragraph copyable style={{ fontSize: '1.2em' }}>
            pjia@big.ac.cn
          </Paragraph>
          <br />
          <Paragraph className={styles.subtitle}>Address:</Paragraph>
          <Paragraph>
            National Genomics Data Center
            <br />
            Beijing Institute of Genomics
            <br />
            Chinese Academy of Sciences
            <br />
            1 Beichen West Road, Chaoyang District
            <br />
            Beijing 100101, China
            <br />
          </Paragraph>
        </Col>
        <Col xs={14} sm={14} md={14} lg={12} xl={10} xxl={10}>
          <Image
            width={'100%'}
            src={'https://ngdc.cncb.ac.cn/static/image/address.jpg'}
            preview={false}
          />
        </Col>
      </Row>
    </div>
  );
}
