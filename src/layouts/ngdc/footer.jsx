import React from 'react';
import { Col, Divider, Row, Space } from 'antd';
import { Typography } from 'antd';

const { Title, Text } = Typography;
const Footer = () => {
  return (
    <div>
      <Row justify={'center'}>
        <Col xs={6} sm={8} md={4}>
          <a href="https://ngdc.cncb.ac.cn/">
            <img
              src="https://ngdc.cncb.ac.cn/static/image/CNCB-NGDC.png"
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          </a>
          <ul style={{ listStyle: 'none' }}>
            <li>
              <a href="https://ngdc.cncb.ac.cn/about">About NGDC</a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/people">People</a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/mission">Mission</a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/board">Advisory Board</a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/structure">
                Organizational Structure
              </a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/history">History</a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/annual-report">Annual Reports</a>
            </li>
          </ul>
        </Col>
        <Col xs={6} sm={8} md={4}>
          <Title level={5}>Research &amp; Resources</Title>
          <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
            <li>
              <a href="https://ngdc.cncb.ac.cn/databases">Databases</a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/tools">Tools</a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/standards">Standards</a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/research">
                Topics &amp; Projects
              </a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/publications">Publications</a>
            </li>
          </ul>
        </Col>
        <Col xs={6} sm={8} md={4}>
          <Title level={5}>Featured</Title>
          <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
            <li>
              <a href="https://ngdc.cncb.ac.cn/cedr" target="_blank">
                CeDR Atlas
              </a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/icb" target="_blank">
                ICB-Portal
              </a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/braincatalog" target="_blank">
                Brain Catalog
              </a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/databasecommons" target="_blank">
                Database Commons
              </a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/gsa" target="_blank">
                GSA
              </a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/gwh" target="_blank">
                GWH
              </a>
            </li>
            <li>
              <a
                href="https://ngdc.cncb.ac.cn/methbank"
                target="_blank"
                title="Methylation DataBank"
              >
                MethBank
              </a>
            </li>
          </ul>
        </Col>
        <Col xs={6} sm={8} md={4}>
          <Title level={5}>Conference &amp; Outreach</Title>
          <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
            <li>
              <a href="https://ngdc.cncb.ac.cn/conference">Conferences</a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/education">Education</a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/training">Training</a>
            </li>
            <li>
              <a
                href="https://www.sciencedirect.com/journal/genomics-proteomics-and-bioinformatics"
                target="_blank"
              >
                GPB
              </a>
            </li>
          </ul>
        </Col>
        <Col xs={6} sm={8} md={4}>
          <Title level={5}>Alliance &amp; Collaboration</Title>
          <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
            <li>
              <a href="http://bhbd-alliance.org" target="_blank">
                BHBD
              </a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/p10k/" target="_blank">
                P10K
              </a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/partners">Partners</a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/collaborations">
                Collaborations
              </a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/funding">Funding</a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/contact">Contact Us</a>
            </li>
            <li>
              <a href="https://ngdc.cncb.ac.cn/news/80">Join Us</a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row style={{ marginRight: '100px', marginLeft: '100px' }}>
        <Divider style={{ marginTop: '0px', marginBottom: '6px' }} />
      </Row>
      <Row justify={'center'}>
        <Col md={12}>
          <Text>
            © 2023 National Genomics Data Center,
            <span>
              <a href="http://english.big.cas.cn" target="_blank">
                China National Center for Bioinformation / Beijing Institute of
                Genomics
              </a>
            </span>
            ,{' '}
            <span>
              <a href="http://english.cas.cn" target="_blank">
                Chinese Academy of Sciences
              </a>
            </span>
            <br />
            No.1 Beichen West Road, Chaoyang District, Beijing 100101, China
            <br />
            Tel: +86 (10) 8409-7340 | Fax: +86 (10) 8409-7200 |
            ngdc(AT)big.ac.cn <br />
            <span>
              <a href="https://ngdc.cncb.ac.cn/policies">
                Policies and Disclaimers
              </a>
            </span>
          </Text>
          <br />
          <Text>
            <span>
              <a
                rel="license"
                target="_blank"
                href="http://creativecommons.org/licenses/by/3.0/cn/"
              >
                <img
                  alt="Creative Commons License"
                  style={{ borderWidth: '0', height: '15px' }}
                  src="https://ngdc.cncb.ac.cn/static/image/cc.png"
                />
              </a>
            </span>
            &nbsp; This work is licensed under a
            <span>
              <a
                rel="license"
                href="http://creativecommons.org/licenses/by/3.0/cn/"
                target="_blank"
              >
                {' '}
                Creative Commons Attribution 3.0 China Mainland License.
              </a>{' '}
              <br />
              <a href="https://beian.miit.gov.cn/" target="_blank">
                京ICP备10050270号
              </a>
            </span>
          </Text>
        </Col>
        <Col md={8}>
          <div>
            <ul style={{ listStyle: 'none', marginLeft: '120px' }}>
              <Space>
                <li style={{ display: 'inline' }}>
                  <a href="http://english.big.cas.cn" target="_blank">
                    <img
                      src="https://ngdc.cncb.ac.cn/static/image/big_logo.png"
                      style={{ width: '32px' }}
                    />
                  </a>
                </li>
                <li style={{ display: 'inline' }}>
                  <a href="https://www.picb.ac.cn/picben/#/" target="_blank">
                    <img
                      src="https://ngdc.cncb.ac.cn/static/image/picb.png"
                      style={{ height: '32px' }}
                    />
                  </a>
                </li>
                <li style={{ display: 'inline' }}>
                  <a href="http://english.ibp.cas.cn/" target="_blank">
                    <img
                      src="https://ngdc.cncb.ac.cn/static/image/ibp.png"
                      style={{ height: '32px' }}
                    />
                  </a>
                </li>
                <li style={{ display: 'inline' }}>
                  <a href="http://english.cas.cn/" target="_blank">
                    <img
                      src="https://ngdc.cncb.ac.cn/static/image/cas.png"
                      style={{ height: '32px' }}
                    />
                  </a>
                </li>
              </Space>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
