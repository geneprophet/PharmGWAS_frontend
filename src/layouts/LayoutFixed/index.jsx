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
  LandscapeIcon, DrugIcon, VSIcon
} from "../../components/Icons/index";
export default function (props) {
  // console.log(props);
  const [selectKey, setSelectkey] = useState('1');
  useEffect(() => {
    if (history.location.pathname.startsWith('/browse')) {
      setSelectkey('2');
    } else if (history.location.pathname.startsWith('/datasetoverview')) {
      setSelectkey('2-1');
    } else if (history.location.pathname.startsWith('/cmapoverview')) {
      setSelectkey('2-2');
    } else if (history.location.pathname.startsWith('/geooverview')) {
      setSelectkey('2-3');
    } else if (history.location.pathname.startsWith('/explore')) {
      setSelectkey('3');
    } else if (history.location.pathname.startsWith('/xxx')) {
      setSelectkey('4');
    } else if (history.location.pathname.startsWith('/download')) {
      setSelectkey('5');
    } else if (history.location.pathname.startsWith('/documentation')) {
      setSelectkey('6');
    } else if (history.location.pathname.startsWith('/contact')) {
      setSelectkey('7');
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
                history.push('/datasetoverview');
              }}
            >
              <strong style={{ color: '#252746' }}>GWAS Datasets</strong>
            </a>
          ),
          key: '2-1',
          icon: <DatasetIcon />,
        },
        {
          label: (
            <a
              onClick={() => {
                history.push('/cmapoverview');
              }}
            >
              <strong style={{ color: '#252746' }}>
                CMap Signatures
              </strong>
            </a>
          ),
          key: '2-2',
          icon: <DrugIcon/>,
        },
        {
          label: (
            <a
              onClick={() => {
                history.push('/geooverview');
              }}
            >
              <strong style={{ color: '#252746' }}>GEO Signatures</strong>
            </a>
          ),
          key: '2-3',
          icon: <VSIcon />,
        },
      ],
    },
    {
      label: (
        <a
          onClick={() => {
            history.push('/explore');
          }}
        >
          <strong style={{ color: '#252746' }}>Explore</strong>
        </a>
      ),
      key: '3',
      icon: <ExploreIcon />,
    },
    {
      label: (
        <a
          onClick={() => {
            history.push('/colocoverview');
          }}
        >
          <strong style={{ color: '#252746' }}>XXXXX</strong>
        </a>
      ),
      key: '4',
      icon: <LandscapeIcon />,
    },
    {
      label: (
        <a
          onClick={() => {
            history.push('/download');
          }}
        >
          <strong style={{ color: '#252746' }}>Download</strong>
        </a>
      ),
      key: '5',
      icon: <DownloadOutlined />,
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
      key: '6',
      icon: <DocumentationIcon />,
    },
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
      key: '7',
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
