import styles from './index.less';
import { LinkOutlined } from '@ant-design/icons';
import {
  PeopleIcon,
  DatasetIcon,
  VSIcon,
  DrugIcon,
  ToolIcon,
  CmapIcon,
  TreatmentIcon,
  CompoundIcon,
  GEOIcon,
} from '@/components/Icons';
import workflow from '@/assets/workflow.png';
import type { MenuProps } from 'antd';
import * as echarts from 'echarts';
import {
  Typography,
  Row,
  Col,
  Card,
  Button,
  Statistic,
  Divider,
  Timeline,
  Input,
  Dropdown,
  Space,
  message, Image
} from "antd";
const { Search } = Input;
import { SearchOutlined,DownOutlined,UserOutlined  } from '@ant-design/icons';
const { Text, Title, Link } = Typography;
import { URL_PREFIX,IMG_PREFIX } from '@/common/constants';
import Organizationkk from '@/components/Organization';
import React, { useEffect, useRef, useState } from "react";
import { getRemoteSVG } from "@/pages/service";
export default function IndexPage() {
  const [data, setData] = useState();
  const [nodes, setNodes] = useState();
  const chartRef: any = useRef(); //拿到DOM容器
  const [svg, setSvg] = useState(undefined);

  useEffect(()=>{
    const a = [
      ['GWAS Summary Statistics', 'MAGMA and deTS'],
      ['GWAS Summary Statistics', 'S-Predixcan'],
      ['MAGMA and deTS', 'Top 3 diseased related tissue and Whole Blood'],
      ['Top 3 diseased related tissue and Whole Blood', 'S-Predixcan'],
      ['S-Predixcan', 'Disease Gene Expression Signature'],
      ['Expanded CMap Signatures', 'Connectivity Methods'],
      ['GEO Signatures', 'Connectivity Methods'],
      ['Disease Gene Expression Signature', 'Connectivity Methods'],
      ['Connectivity Methods', 'Genetic Supported Drug Candidates'],
    ];
    setData(a);
    const b = [
      {
        id: 'GWAS Summary Statistics',
        title: '<strong>GWAS Summary Statistics</strong>',
        name: ' ',
        color: '#377D71',
        // layout: 'hanging',
        url: undefined,
      },
      {
        id: 'MAGMA and deTS',
        title: '<strong>MAGMA and deTS</strong>',
        name: ' ',
        color: '#D1D1D1',
        url: undefined,
        // column: 1,
        // offsetVertical: '-40%',
        // offsetHorizontal: '-60%',
        offset: '-100%',
      },
      {
        id: 'Top 3 diseased related tissue and Whole Blood',
        title: '<strong>Top 3 diseased related tissue and Whole Blood</strong>',
        name: ' ',
        url: undefined,
        color: '#D1D1D1',
        // column: 2,
        offset: '-100%'
      },
      {
        id: 'S-Predixcan',
        title: '<strong>S-Predixcan</strong>',
        name: ' ',
        url: undefined,
        color: '#D1D1D1',
        // column: 3,
        // layout: 'hanging',
        offset: '-50%'
      },
      {
        id: 'Disease Gene Expression Signature',
        title: '<strong>Disease Gene Expression Signature</strong>',
        name: ' ',
        url: window.location.pathname.replace('trait', 'magma'),
        color: '#F6E3C5',
        image: IMG_PREFIX + 'magma.png',
        offset: '-50%',
        // column: 5,
      },
      {
        id: 'Expanded CMap Signatures',
        title: '<strong>Expanded CMap Signatures</strong>',
        name: ' ',
        url: window.location.pathname.replace('trait', 'garfield'),
        color: '#F6E3C5',
        image: IMG_PREFIX + 'garfield.png',
        // layout: 'hanging',
        // column: 1,
      },
      {
        id: 'GEO Signatures',
        title: '<strong>GEO Signatures</strong>',
        name: ' ',
        url: window.location.pathname.replace('trait', 'ldsc'),
        color: '#F6E3C5',
        image: IMG_PREFIX + 'sldsc.png',
        // column: 1,
      },
      {
        id: 'Connectivity Methods',
        title: '<strong>Connectivity Methods</strong>',
        name: ' ',
        url: window.location.pathname.replace('trait', 'herit'),
        color: '#748DA6',
        image: IMG_PREFIX + 'herit.png',
        offset: '70%',
      },
      {
        id: 'Genetic Supported Drug Candidates',
        title: '<strong>Genetic Supported Drug Candidates</strong>',
        name: ' ',
        url: window.location.pathname.replace('trait', 'herit'),
        color: '#748DA6',
        image: IMG_PREFIX + 'heritenrich.png',
        offset: '70%',
      },
    ];
    setNodes(b);
    getRemoteSVG().then((res) => {
      // console.log(res);
      setSvg(res);
    });
  },[]);

  // useEffect(()=>{
  //   const myChart = echarts.init(chartRef.current,'auto',{renderer:'svg'}); //echart初始化容器
  //   echarts.registerMap('organ_diagram', { svg: svg });
  //   let option = {
  //     tooltip: {},
  //     geo: {
  //       left: '5%',
  //       right: '5%',
  //       map: 'organ_diagram',
  //       selectedMode: 'single',
  //       itemStyle: {
  //         color: null,
  //       },
  //       emphasis: {
  //         focus: 'self',
  //         itemStyle: {
  //           color: "#9AC5F4",
  //         },
  //         label: {
  //           position: 'bottom',
  //           distance: 0,
  //           textBorderColor: '#fff',
  //           textBorderWidth: 2
  //         }
  //       },
  //       blur: {},
  //       select: {
  //         itemStyle: {
  //           color: null,
  //           // shadowColor: 'rgba(0, 0, 0, 0.5)',
  //           // shadowBlur: 10
  //         },
  //         label: {
  //           show: false,
  //           textBorderColor: '#fff',
  //           textBorderWidth: 2
  //         }
  //       }
  //     },
  //     visualMap:{
  //       show:false,
  //       min:0,
  //       max:600,
  //       inRange:{
  //         colorLightness:[0,1]
  //       }
  //     },
  //     // grid: {
  //     //   left: '60%',
  //     //   right: '20%',
  //     //   top: '10%',
  //     //   bottom: '20%'
  //     // },
  //     // xAxis: {},
  //     // yAxis: {
  //     //   data: [
  //     //     'heart',
  //     //     'large-intestine',
  //     //     'small-intestine',
  //     //     'spleen',
  //     //     'kidney',
  //     //     'lung',
  //     //     'liver'
  //     //   ]
  //     // },
  //     // series: [
  //     //   {
  //     //     type: 'bar',
  //     //     emphasis: {
  //     //       focus: 'self'
  //     //     },
  //     //     data: [121, 321, 141, 52, 198, 289, 139]
  //     //   }
  //     // ]
  //   };
  //   myChart.setOption(option);
  //   myChart.on('click', { geoIndex: 0,name: 'heart' }, function (param) {
  //     console.log("click")
  //     console.log(param.name)
  //     window.open("https://cn.bing.com/search?q="+param.name,'_blank')
  //   });
  //   // myChart.on('mouseover', { seriesIndex: 0 }, function (event) {
  //   //   myChart.dispatchAction({
  //   //     type: 'highlight',
  //   //     geoIndex: 0,
  //   //     name: event.name
  //   //   });
  //   // });
  //   // myChart.on('mouseout', { seriesIndex: 0 }, function (event) {
  //   //   myChart.dispatchAction({
  //   //     type: 'downplay',
  //   //     geoIndex: 0,
  //   //     name: event.name
  //   //   });
  //   // });
  // },[svg]);

  const [buttontext, setButtontext] = useState("GWAS Dataset");
  const [placeholder, setPlaceholder] = useState("Please enter a trait keyword");
  const [url, setUrl] = useState("/datasetoverview/");

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // message.info('Click on menu item.' + e.key);
    if (e.key=="1"){
      setButtontext("GWAS Dataset");
      setPlaceholder("Please enter a trait keyword, e.g. Coronary Artery Disease");
      setUrl("/datasetoverview/");
    }else if(e.key=="2"){
      setButtontext("CMap Signature");
      setPlaceholder("Please enter a CMap keyword, e.g. lisofylline");
      setUrl("/cmapoverview/");
    }else {
      setButtontext("GEO Signature");
      setPlaceholder("Please enter a GEO keyword, e.g. JCAD");
      setUrl("/geooverview/");
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'GWAS Dataset',
      key: '1',
      icon: <DatasetIcon />,
    },
    {
      label: 'CMap Signature',
      key: '2',
      icon: <DrugIcon />,
    },
    {
      label: 'GEO Signature',
      key: '3',
      icon: <VSIcon />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div>
      <Row justify="center" style={{ background: '#ECF2FF' }}>
        <Title level={2} className={styles.introduction}>
          PharmGWAS: a GWAS-based knowledgebase for drug repurposing
        </Title>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Col>
          <Dropdown menu={menuProps}>
            <Button type={"primary"} size={'large'}>
              <Space>
                {buttontext}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Col>
        <Col xs={18} sm={16} md={16} lg={12} xl={12} xxl={12}>
          <Search
            placeholder={placeholder}
            allowClear
            enterButton={
              <strong>
                <SearchOutlined /> Search
              </strong>
            }
            size="large"
            onSearch={(value) => {
              console.log(value);
              if (value) {
                window.open(URL_PREFIX + url + value.trim(), '_blank'); //在新页面打开
              } else {
                message.warn('please input the keyword!!');
              }
            }}
          />
          <strong style={{ fontSize: '1.2em' }}>
            e.g.{' '}
            <Space>
              <a href={URL_PREFIX + '/datasetoverview/Coronary Artery Disease'} target={'_blank'}>
                Coronary Artery Disease,
              </a>
              <a
                href={URL_PREFIX + '/datasetoverview/Attention Deficit'}
                target={'_blank'}
              >
                Attention Deficit,
              </a>
              <a href={URL_PREFIX + '/cmapoverview/lisofylline'} target={'_blank'}>
                lisofylline,
              </a>
              <a href={URL_PREFIX + '/geooverview/JCAD'} target={'_blank'}>
                JCAD
              </a>
            </Space>
          </strong>
        </Col>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Col xs={24} sm={24} md={22} lg={21} xl={17} xxl={17}>
          <Row justify={'center'}>
            {/*<Organizationkk data={data} nodes={nodes}/>*/}
            {/*<div*/}
            {/*  ref={chartRef}*/}
            {/*  className={styles.charts}*/}
            {/*  style={{ height: '800px', width: '100%' }}*/}
            {/*></div>*/}
            <Image src={workflow} preview={false} width={"80%"}/>
          </Row>
          <Divider />
          <Row>
            <Col xs={23} sm={23} md={23} lg={23} xl={23} xxl={23}>
              <div>
                <Title
                  level={2}
                  className={styles.introduction}
                  style={{ textAlign: 'left' }}
                >
                  Introduction of PharmGWAS:
                </Title>
                <Text
                  style={{
                    fontFamily: 'Trebuchet MS',
                    fontSize: '20px',
                    textAlign: 'justify',
                    display: 'inline-block',
                    width: '100%',
                  }}
                >
                  <p>
                    PharmGWAS is a comprehensive catalog for drug repurposing by leveraging a validated framework that links GWAS and drug perturbation data. The current release contains  <span style={{color:"red"}}>1,929</span> GWAS datasets, the <span style={{color:"red"}}>720,216</span> small molecule compound signatures of Expanded CMap LINCS Resource 2020, and <span style={{color:"red"}}>4,269</span> perturbation signatures from GEO. The analysis framework roughly includes three steps:
                  </p>
                  <p>
                    1)	To infer disease-relevant tissues based on GWAS summary statistics using
                    <a
                      href={
                        'https://ctg.cncr.nl/software/magma'
                      }
                      target={'_blank'}
                    >
                      {' '}MAGMA
                    </a> and
                    <a
                      href={'https://github.com/bsml320/deTS'}
                      target={'_blank'}
                    >
                      {' '}deTS
                    </a>
                    .
                  </p>
                  <p>
                    2)	To impute genetically regulated expression signatures (i.e., TWAS) in disease-relevant tissues. We used
                    <a
                      href={'https://github.com/hakyimlab/MetaXcan'}
                      target={'_blank'}
                    >
                      {' '}S-PrediXcan{' '}
                    </a>
                    for this purpose.
                  </p>
                  <p>
                    3)	To infer disease-drug pairs by integrative analysis of the imputed gene expression signatures with drug-induced gene expression signatures.
                  </p>
                  In total, PharmGWAS deposits <span style={{color:"red"}}>732,947</span> disease-drug pairs derived from
                  <a href={'https://clue.io'} target={'_blank'}>
                    {' '}Connectivity Map (CMap){' '}
                  </a>
                  signatures and <span style={{color:"red"}}>7,280</span> disease-drug pairs from
                  <a href={'https://www.ncbi.nlm.nih.gov/geo'} target={'_blank'}>
                    {' '}GEO{' '}
                  </a>
                  signatures. We believe PharmGWAS will shed light on drug discovery, drug combination and drug resistance, and drug side effects through the discovery power of GWAS.
                  More details can be found in the
                  <a href={URL_PREFIX + '/documentation'}>{' '}Documentation</a>
                  {' page.'}
                </Text>
              </div>
            </Col>
          </Row>
          <Divider />

        </Col>
        <Col xs={16} sm={16} md={16} lg={14} xl={7} xxl={7}>
          <Card
            title={<strong style={{ fontSize: '1.5em' }}>Statistics</strong>}
            bordered={true}
            hoverable={false}
          >
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={true}
              onClick={() => {
                window.open(URL_PREFIX + '/datasetoverview/all');
              }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    GWAS Datasets
                  </strong>
                }
                value={1929}
                valueStyle={{ color: '#3f8600' }}
                prefix={<PeopleIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={true}
              onClick={() => {
                window.open(URL_PREFIX + '/cmapoverview/all');
              }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    CMap Signatures
                  </strong>
                }
                value={720216}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CmapIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={true}
              onClick={() => {
                window.open(URL_PREFIX + '/geooverview/all');
              }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    GEO Signatures
                  </strong>
                }
                value={4269}
                valueStyle={{ color: '#3f8600' }}
                prefix={<GEOIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={true}
              onClick={() => {
                window.open(URL_PREFIX + '/documentation#methods');
              }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Connectivity Methods
                  </strong>
                }
                value={6}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ToolIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={true}
              onClick={() => {
                window.open(URL_PREFIX + '/allcmapresult');
              }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    CMap Results
                  </strong>
                }
                value={732947}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CompoundIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={true}
              onClick={() => {
                window.open(URL_PREFIX + '/allgeoresult');
              }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    GEO Results
                  </strong>
                }
                value={7280}
                valueStyle={{ color: '#3f8600' }}
                prefix={<TreatmentIcon />}
              />
            </Card.Grid>
          </Card>
          <Divider />
          <Card
            title={<strong style={{ fontSize: '1.5em' }}>Recent Events</strong>}
            bordered={true}
          >
            <Timeline style={{ width: '100%' }}>
              <Timeline.Item style={{ fontSize: '1.2em' }} color={"green"}>
                PharmGWAS Version 1.0 is released on 2022-06-29
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                Bugs fixed on 2022-06-28
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                Network problems being solved 2022-06-22
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                All analyses were finished on 2022-6-21
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                All GWAS datasets were collected on 2022-03-15
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                The project PharmGWAS was created on 2022-03-07
              </Timeline.Item>
            </Timeline>
          </Card>
          <Divider />
          <Card
            title={
              <strong style={{ fontSize: '1.5em' }}>External Links</strong>
            }
            bordered={true}
            hoverable={false}
          >
            <p>
              <a href={'https://www.ebi.ac.uk/gwas/'} target={'_blank'}>
                {' '}
                <LinkOutlined />
                &nbsp;GWAS Catalog{' '}
              </a>
            </p>
            <p>
              <a href={'http://www.nealelab.is/uk-biobank'} target={'_blank'}>
                {' '}
                <LinkOutlined />
                &nbsp;UK BioBank{' '}
              </a>
            </p>
            <p>
              <a
                href={'https://clue.io/'}
                target={'_blank'}
              >
                {' '}
                <LinkOutlined />
                &nbsp;ConnectivityMap{' '}
              </a>
            </p>
            <p>
              <a href={'https://maayanlab.cloud/sigcom-lincs/'} target={'_blank'}>
                {' '}
                <LinkOutlined />
                &nbsp;Signature Commons{' '}
              </a>
            </p>
            <p>
              <a
                href={'https://www.ncbi.nlm.nih.gov/geo/'}
                target={'_blank'}
              >
                <LinkOutlined />
                &nbsp;GEO
              </a>
            </p>
            {/*<p>*/}
            {/*  <a href={'https://lph-big.github.io/'} target={'_blank'}>*/}
            {/*    <LinkOutlined />*/}
            {/*    &nbsp;Laboratory for Precision Health{' '}*/}
            {/*  </a>*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*  <a href={'https://ngdc.cncb.ac.cn/'} target={'_blank'}>*/}
            {/*    <LinkOutlined />*/}
            {/*    &nbsp;National Genomics Data Center*/}
            {/*  </a>*/}
            {/*</p>*/}
          </Card>
          <Divider />
          <Card
            title={
              <strong style={{ fontSize: '1.5em' }}>Citation</strong>
            }
            bordered={true}
            hoverable={false}
          >
            <Text
              style={{
                fontFamily: 'Trebuchet MS',
                fontSize: '20px',
                textAlign: 'left',
                display: 'inline-block',
                width: '100%',
              }}
            >
              {
                'PharmGWAS: a GWAS-based knowledgebase for drug repurposing. Nucleic Acids Research,2023;gkad832. doi: '
              }
              <a
                href={'https://doi.org/10.1093/nar/gkad832'}
                target={'_blank'}
              >
                10.1093/nar/gkad832
              </a>
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
