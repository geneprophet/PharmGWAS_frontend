import React, { useEffect, useState } from 'react';
import styles from './index.less';
import NGDCHeader from '../ngdc/header';
import NGDCFooter from '../ngdc/footer';
import logo from '../../assets/logo.png';
import { DownloadOutlined } from '@ant-design/icons';
import {
  Layout,
  Menu,
  MenuProps,
  ConfigProvider,
  BackTop,
  Typography,
  Row,
  Col,
  Image,
} from 'antd';
const { Header, Content, Footer } = Layout;
import HeaderLab from '../HeaderLab';
import { history } from 'umi';
import enUS from 'antd/lib/locale/en_US';
import moment from 'moment';
moment.locale('en');
import {
  DatasetIcon,
  HomeIcon,
  ContactIcon,
  BiomarkerIcon,
  ExploreIcon,
  ResourceIcon,
  DocumentationIcon,
  BrowseIcon,
  BenchmarkIcon,
  OnlineIcon,
  LandscapeIcon,
} from '../../components/Icons/index';
export default function (props) {
  // console.log(props);
  const [selectKey, setSelectkey] = useState('1');
  useEffect(() => {
    if (history.location.pathname.startsWith('/herit')) {
      setSelectkey('3');
    } else if (history.location.pathname.startsWith('/browse')) {
      setSelectkey('2');
    } else if (history.location.pathname.startsWith('/summary')) {
      setSelectkey('2');
    } else if (history.location.pathname.startsWith('/twosmr')) {
      setSelectkey('4');
    } else if (history.location.pathname.startsWith('/smr')) {
      setSelectkey('5');
    } else if (history.location.pathname.startsWith('/coloc')) {
      setSelectkey('6');
    } else if (history.location.pathname.startsWith('/documentation')) {
      setSelectkey('7');
    } else if (history.location.pathname.startsWith('/download')) {
      setSelectkey('8');
    } else if (history.location.pathname.startsWith('/contact')) {
      setSelectkey('9');
    } else if (history.location.pathname.startsWith('/trait')) {
      setSelectkey('10');
    } else if (history.location.pathname.startsWith('/twas')) {
      setSelectkey('2');
    } else if (history.location.pathname.startsWith('/magma')) {
      setSelectkey('2');
    } else if (history.location.pathname.startsWith('/garfield')) {
      setSelectkey('2');
    } else if (history.location.pathname.startsWith('/finemapping')) {
      setSelectkey('11');
    } else if (history.location.pathname.startsWith('/ldsc')) {
      setSelectkey('2');
    }
    // console.log(history.location.pathname);
  }, [history.location]);
  const items = [
    {
      label: (
        <a
          onClick={() => {
            history.push('/home');
          }}
        >
          <strong style={{ color: '#252746' }}>Home</strong>
        </a>
      ),
      key: '1',
      icon: <HomeIcon />,
    },
    {
      label: <strong style={{ color: '#252746' }}>Browse</strong>,
      key: '2',
      icon: <BrowseIcon />,
      children: [
        {
          label: (
            <a
              onClick={() => {
                history.push('/traitoverview');
              }}
            >
              <strong style={{ color: '#252746' }}>Overview</strong>
            </a>
          ),
          key: '10',
        },
        {
          label: (
            <a
              onClick={() => {
                history.push('/herit/all');
              }}
            >
              <strong style={{ color: '#252746' }}>
                Heritability Analysis
              </strong>
            </a>
          ),
          key: '3',
        },
        {
          label: (
            <a
              onClick={() => {
                history.push('/twosmr/all');
              }}
            >
              <strong style={{ color: '#252746' }}>Two Sample MR</strong>
            </a>
          ),
          key: '4',
        },
        {
          label: (
            <a
              onClick={() => {
                history.push('/smroverview');
              }}
            >
              <strong style={{ color: '#252746' }}>SMR Overview</strong>
            </a>
          ),
          key: '5',
        },
        {
          label: (
            <a
              onClick={() => {
                history.push('/colocoverview');
              }}
            >
              <strong style={{ color: '#252746' }}>Colocalization</strong>
            </a>
          ),
          key: '6',
        },
        {
          label: (
            <a
              onClick={() => {
                history.push('/finemapping/AD_Marioni_2018');
              }}
            >
              <strong style={{ color: '#252746' }}>Fine mapping</strong>
            </a>
          ),
          key: '11',
        },
      ],
    },
    {
      label: (
        <a
          onClick={() => {
            history.push('/smroverview');
          }}
        >
          <strong style={{ color: '#252746' }}>SMR</strong>
        </a>
      ),
      key: '5',
      icon: <BenchmarkIcon />,
    },
    {
      label: (
        <a
          onClick={() => {
            history.push('/colocoverview');
          }}
        >
          <strong style={{ color: '#252746' }}>Colocalization</strong>
        </a>
      ),
      key: '6',
      icon: <LandscapeIcon />,
    },
    {
      label: (
        <a
          onClick={() => {
            history.push('/documentation');
          }}
        >
          <strong style={{ color: '#252746' }}>Documentation</strong>
        </a>
      ),
      key: '7',
      icon: <DocumentationIcon />,
    },
    // {
    //   label: (
    //     <a
    //       onClick={() => {
    //         history.push('/download');
    //       }}
    //     >
    //       <strong style={{ color: '#252746' }}>Download</strong>
    //     </a>
    //   ),
    //   key: '8',
    //   icon: <DownloadOutlined />,
    // },
    {
      label: (
        <a
          onClick={() => {
            history.push('/contact');
          }}
        >
          <strong style={{ color: '#252746' }}>Contact</strong>
        </a>
      ),
      key: '9',
      icon: <ContactIcon />,
    },
  ];
  const onClick = (e) => {
    console.log('click ', e);
    setSelectkey(e.key);
  };

  return (
    <Row className={styles.container}>
      <Col md={24}>
        <NGDCHeader />
        <HeaderLab />
        <Layout>
          <Header className={styles.header}>
            <Row justify={'center'}>
              <Col
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                xxl={4}
                style={{ textAlign: 'right' }}
              >
                <Image
                  src={logo}
                  style={{ width: '42%', float: 'right' }}
                  preview={false}
                  onClick={() => {
                    history.push('/home');
                  }}
                ></Image>
              </Col>
              <Col
                xs={20}
                sm={20}
                md={20}
                lg={20}
                xl={20}
                xxl={16}
                style={{ justifyContent: 'center' }}
              >
                <Menu
                  theme="light "
                  mode="horizontal"
                  selectedKeys={[selectKey]}
                  style={{ lineHeight: '64px', backgroundColor: '#DDDDDD' }}
                  items={items}
                  onClick={onClick}
                ></Menu>
              </Col>
            </Row>
          </Header>
          <Row>
            <Col md={24} xl={24} lg={24}>
              <Content className="site-layout">
                <ConfigProvider locale={enUS}>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 380 }}
                  >
                    {props.children}
                  </div>
                </ConfigProvider>
              </Content>
            </Col>
          </Row>
          <BackTop />
          <Footer>
            <NGDCFooter />
          </Footer>
        </Layout>
      </Col>
    </Row>
  );
}
