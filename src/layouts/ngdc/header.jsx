import React from 'react';
import { Row, Col } from 'antd';
const Header = () => {
  return (
    <Row
      style={{
        height: '30px',
        backgroundColor: '#0c64b6',
        // backgroundColor: '#001529',
        borderColor: '#0c64b6',
        // borderColor: '#001529',
        fontFamily: ' Arial',
      }}
    >
      <Col xs={12} sm={12} md={12} style={{ height: '30px' }}>
        <div
          style={{
            height: '30px',
            paddingTop: '2px',
            paddingLeft: '5%',
          }}
        >
          <a
            href="https://www.cncb.ac.cn"
            target="_blank"
            className="bigd-navbar-brand"
          >
            <img
              src="https://ngdc.cncb.ac.cn/cdn/image/cncb-nav.png"
              className="bigd-img-responsive"
              style={{ width: '67px', height: '22px' }}
            />
          </a>
          <a href="https://ngdc.cncb.ac.cn/">
            <img
              src="https://ngdc.cncb.ac.cn/cdn/image/ngdc-nav.png"
              style={{ width: '67px', height: '22px' }}
            />
          </a>
        </div>
      </Col>
      <Col xs={12} sm={12} md={12} style={{ height: '30px' }}>
        <div
          style={{
            height: '30px',
            paddingTop: '2px',
            paddingLeft: '2%',
          }}
        >
          <a
            href="https://ngdc.cncb.ac.cn/databases"
            style={{ color: '#fff', marginLeft: '40%' }}
          >
            {' '}
            Databases
          </a>
          <a
            href="https://ngdc.cncb.ac.cn/tools"
            style={{ color: '#fff', marginLeft: '4%' }}
          >
            Tools
          </a>
          <a
            href="https://ngdc.cncb.ac.cn/standards"
            style={{ color: '#fff', marginLeft: '4%' }}
          >
            Standards
          </a>
          <a
            href="https://ngdc.cncb.ac.cn/publications"
            style={{ color: '#fff', marginLeft: '4%' }}
          >
            Publications
          </a>
          <a
            href="https://ngdc.cncb.ac.cn/about"
            style={{ color: '#fff', marginLeft: '4%' }}
          >
            About
          </a>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
