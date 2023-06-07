import styles from './index.less';
import { LinkOutlined } from '@ant-design/icons';
import {
  PeopleIcon,
  MarkerIcon,
  OnlineIcon,
  LociIcon,
  TreatmentIcon,
  TissueIcon,
  TCGAIcon,
} from '@/components/Icons';
import * as echarts from 'echarts';
import {
  Typography,
  Row,
  Col,
  Card,
  Statistic,
  Divider,
  Timeline,
  Input,
  Space,
  message,
} from 'antd';
const { Search } = Input;
import { SearchOutlined } from '@ant-design/icons';
const { Text, Title, Link } = Typography;
import { URL_PREFIX,IMG_PREFIX } from '@/common/constants';
import Organizationkk from '@/components/Organization';
import React, { useEffect, useRef, useState } from "react";
import { getRemoteSVG } from "@/pages/service";
export default function IndexPage() {
  const [data, setData] = useState();
  const [nodes, setNodes] = useState();
  const chartRef: any = useRef(); //拿到DOM容器

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
      console.log(res);
      setSvg(res);
    });
  },[]);
  const [svg, setSvg] = useState(undefined);
  useEffect(()=>{
    const myChart = echarts.init(chartRef.current,null,{renderer:'svg'}); //echart初始化容器
    echarts.registerMap('organ_diagram', { svg: svg });
    let option = {
      tooltip: {},
      geo: {
        left: 10,
        right: '50%',
        map: 'organ_diagram',
        selectedMode: 'multiple',
        emphasis: {
          focus: 'self',
          itemStyle: {
            color: null
          },
          label: {
            position: 'bottom',
            distance: 0,
            textBorderColor: '#fff',
            textBorderWidth: 2
          }
        },
        blur: {},
        select: {
          itemStyle: {
            color: '#b50205'
          },
          label: {
            show: false,
            textBorderColor: '#fff',
            textBorderWidth: 2
          }
        }
      },
      grid: {
        left: '60%',
        top: '20%',
        bottom: '20%'
      },
      xAxis: {},
      yAxis: {
        data: [
          'heart',
          'large-intestine',
          'small-intestine',
          'spleen',
          'kidney',
          'lung',
          'liver'
        ]
      },
      series: [
        {
          type: 'bar',
          emphasis: {
            focus: 'self'
          },
          data: [121, 321, 141, 52, 198, 289, 139]
        }
      ]
    };
    myChart.setOption(option);
    myChart.on('mouseover', { seriesIndex: 0 }, function (event) {
      myChart.dispatchAction({
        type: 'highlight',
        geoIndex: 0,
        name: event.name
      });
    });
    myChart.on('mouseout', { seriesIndex: 0 }, function (event) {
      myChart.dispatchAction({
        type: 'downplay',
        geoIndex: 0,
        name: event.name
      });
    });
  },[svg]);

  return (
    <div>
      <Row justify="center" style={{ background: '#ECF2FF' }}>
        <Title level={2} className={styles.introduction}>
          PharmGWAS Catalog: a GWAS-based knowledgebase for drug repurposing
        </Title>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Col xs={18} sm={16} md={16} lg={12} xl={12} xxl={12}>
          <Search
            placeholder="input search keyword"
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
                window.open(URL_PREFIX + '/summary/' + value.trim(), '_blank'); //在新页面打开
              } else {
                message.warn('please input the keyword!!');
              }
            }}
          />
          <strong style={{ fontSize: '1.2em' }}>
            e.g.{' '}
            <Space>
              <a
                href={URL_PREFIX + '/summary/Alzheimer disease'}
                target={'_blank'}
              >
                Alzheimer disease,
              </a>
              <a href={URL_PREFIX + '/summary/ALS'} target={'_blank'}>
                ALS,
              </a>
              <a href={URL_PREFIX + '/summary/rs9899649'} target={'_blank'}>
                rs9899649,
              </a>
              <a href={URL_PREFIX + '/summary/rs4593926'} target={'_blank'}>
                rs4593926,
              </a>
              <a href={URL_PREFIX + '/summary/APOE'} target={'_blank'}>
                APOE,
              </a>
              <a href={URL_PREFIX + '/summary/RPLP2'} target={'_blank'}>
                RPLP2
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
            <div
              ref={chartRef}
              className={styles.charts}
              style={{ height: '800px', width: '100%' }}
            ></div>
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
                  Introduction of Brain Catalog:
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
                  {
                    'Brain Catalog is a comprehensive resource for genetic landscape of brain disorders and related phenotypes. Currently, Brain Catalog includes the following components: '
                  }
                  <li>
                    {'Variant annotation by three software '}
                    <a
                      href={
                        'https://grch37.ensembl.org/info/docs/tools/vep/index.html'
                      }
                      target={'_blank'}
                    >
                      VEP
                    </a>
                    {', '}
                    <a
                      href={'http://pcingola.github.io/SnpEff/'}
                      target={'_blank'}
                    >
                      snpEff
                    </a>
                    {' and '}
                    <a
                      href={'https://annovar.openbioinformatics.org/en/latest/'}
                      target={'_blank'}
                    >
                      ANNOVAR
                    </a>
                    {'.'}
                  </li>
                  <li>
                    {'Gene-based and gene set analysis by '}
                    <a
                      href={'https://ctg.cncr.nl/software/magma'}
                      target={'_blank'}
                    >
                      MAGMA
                    </a>
                    {'.'}
                  </li>
                  <li>
                    {
                      'Heritability, heritability enrichment and heritability correlation analysis by two software '
                    }
                    <a href={'https://github.com/bulik/ldsc'} target={'_blank'}>
                      LDSC
                    </a>
                    {' and '}
                    <a href={'https://dougspeed.com/ldak/'} target={'_blank'}>
                      LDAK
                    </a>
                    {'.'}
                  </li>
                  <li>
                    {
                      ' Enrichment analysis of associated-trait loci in regulatory and functional annotations by  '
                    }
                    <a
                      href={'https://www.ebi.ac.uk/birney-srv/GARFIELD/'}
                      target={'_blank'}
                    >
                      GARFIELD
                    </a>
                    {' and '}
                    <a
                      href={'https://github.com/ay-lab/S_LDSC'}
                      target={'_blank'}
                    >
                      S-LDSC
                    </a>
                    {'.'}
                  </li>
                  <li>
                    {'Finemapping analysis by four fine-mapping methods '}
                    <a
                      href={
                        'https://chr1swallace.github.io/coloc/reference/finemap.abf.html'
                      }
                      target={'_blank'}
                    >
                      ABF
                    </a>
                    {', '}
                    <a
                      href={'http://www.christianbenner.com/'}
                      target={'_blank'}
                    >
                      FINEMAP
                    </a>
                    {', '}
                    <a
                      href={'https://stephenslab.github.io/susieR/'}
                      target={'_blank'}
                    >
                      SuSiE
                    </a>
                    {' and '}
                    <a
                      href={'https://github.com/omerwe/polyfun'}
                      target={'_blank'}
                    >
                      PolyFun + SuSiE
                    </a>
                    {'.'}
                  </li>
                  <li>
                    {'Gene-based TWAS association by three software '}
                    <a
                      href={'https://github.com/hakyimlab/MetaXcan'}
                      target={'_blank'}
                    >
                      S-PrediXcan
                    </a>
                    {', '}
                    <a
                      href={'https://github.com/Joker-Jerome/UTMOST'}
                      target={'_blank'}
                    >
                      UTMOST
                    </a>
                    {' and '}
                    <a
                      href={'https://github.com/gamazonlab/MR-JTI'}
                      target={'_blank'}
                    >
                      JTI
                    </a>
                    {'.'}
                  </li>
                  <li>
                    <a
                      href={
                        'https://yanglab.westlake.edu.cn/software/smr/#Overview'
                      }
                      target={'_blank'}
                    >
                      Causal inference
                    </a>
                    {' and '}
                    <a
                      href={'http://chr1swallace.github.io/coloc/index.html'}
                      target={'_blank'}
                    >
                      colocalization
                    </a>
                    {
                      '  between six kinds of molecule-QTLs and brain traits, and also the '
                    }
                    <a
                      href={'https://mrcieu.github.io/TwoSampleMR/'}
                      target={'_blank'}
                    >
                      causal effect
                    </a>
                    {' of exposure traits on outcome traits.'}
                  </li>
                  More details can be found in the{' '}
                  <a href={'/braincatalog/documentation'}>Documentation</a>{' '}
                  page.
                </Text>
              </div>
            </Col>
          </Row>
          <Divider />
          {/*<Row>*/}
          {/*  <Col xs={23} sm={23} md={23} lg={23} xl={23} xxl={23}>*/}
          {/*    <Title*/}
          {/*      level={2}*/}
          {/*      className={styles.introduction}*/}
          {/*      style={{ textAlign: 'left' }}*/}
          {/*    >*/}
          {/*      Citation:*/}
          {/*    </Title>*/}
          {/*    <Text*/}
          {/*      style={{*/}
          {/*        fontFamily: 'Trebuchet MS',*/}
          {/*        fontSize: '20px',*/}
          {/*        textAlign: 'left',*/}
          {/*        display: 'inline-block',*/}
          {/*        width: '100%',*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      {*/}
          {/*        'Pan,S., Kang,H., Liu,X., Lin,S., Yuan,N., Zhang,Z., Bao,Y. and Jia,P. (2023) Brain Catalog: a comprehensive resource for the genetic landscape of brain-related traits. Nucleic Acids Res, doi: '*/}
          {/*      }*/}
          {/*      <a*/}
          {/*        href={' https://doi.org/10.1093/nar/gkac895'}*/}
          {/*        target={'_blank'}*/}
          {/*      >*/}
          {/*        https://doi.org/10.1093/nar/gkac895*/}
          {/*      </a>*/}
          {/*    </Text>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Divider />*/}
        </Col>
        <Col xs={16} sm={16} md={16} lg={14} xl={7} xxl={7}>
          <Card
            title={<strong style={{ fontSize: '1.5em' }}>Statistics</strong>}
            bordered={true}
            hoverable={false}
          >
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={false}
              // onClick={() => {
              //   window.open(URL_PREFIX + '/traitoverview');
              // }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Studies
                  </strong>
                }
                value={517}
                valueStyle={{ color: '#3f8600' }}
                prefix={<PeopleIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={false}
              // onClick={() => {
              //   window.open(URL_PREFIX + '/traitoverview');
              // }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Loci
                  </strong>
                }
                value={5054}
                valueStyle={{ color: '#3f8600' }}
                prefix={<LociIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={false}
              // onClick={() => {
              //   window.open(URL_PREFIX + '/traitoverview');
              // }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    xQTL Datasets
                  </strong>
                }
                value={58}
                valueStyle={{ color: '#3f8600' }}
                prefix={<TCGAIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={false}
              // onClick={() => {
              //   window.open(URL_PREFIX + '/traitoverview');
              // }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    xQTL Types
                  </strong>
                }
                value={6}
                valueStyle={{ color: '#3f8600' }}
                prefix={<OnlineIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={false}
              // onClick={() => {
              //   window.open(URL_PREFIX + '/documentation#methods');
              // }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Analysis Methods
                  </strong>
                }
                value={22}
                valueStyle={{ color: '#3f8600' }}
                prefix={<TreatmentIcon />}
              />
            </Card.Grid>
            <Card.Grid
              style={{ width: '50%', textAlign: 'center', height: '130px' }}
              hoverable={false}
              // onClick={() => {
              //   window.open(URL_PREFIX + '/traitoverview');
              // }}
            >
              <Statistic
                title={
                  <strong style={{ color: '#363636', fontSize: '1.3em' }}>
                    Cell Types
                  </strong>
                }
                value={436}
                valueStyle={{ color: '#3f8600' }}
                prefix={<TissueIcon />}
              />
            </Card.Grid>
          </Card>
          <Divider />
          <Card
            title={<strong style={{ fontSize: '1.5em' }}>Recent Events</strong>}
            bordered={true}
          >
            <Timeline style={{ width: '100%' }}>
              <Timeline.Item style={{ fontSize: '1.2em' }} color="green">
                Add download function on 2022-08-10
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                Version 1.0 is released on 2022-06-30
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                Bugs fixed on 2022-06-28
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                Network problems being solved 2022-06-22
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                All Colocalization analyses were finished on 2022-06-16
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                All SMR analyses were finished on 2022-06-07
              </Timeline.Item>
              <Timeline.Item style={{ fontSize: '1.2em' }}>
                The site Brain Catalog was created on 2022-05-06
              </Timeline.Item>
            </Timeline>
          </Card>
          <Divider />
          <Card
            title={
              <strong style={{ fontSize: '1.5em' }}>External Links</strong>
            }
            bordered={true}
            hoverable={true}
          >
            <p>
              <a href={'https://gtexportal.org/home/'} target={'_blank'}>
                {' '}
                <LinkOutlined />
                &nbsp;GTEx{' '}
              </a>
            </p>
            <p>
              <a href={'https://www.ebi.ac.uk/gwas/'} target={'_blank'}>
                {' '}
                <LinkOutlined />
                &nbsp;GWAS Catalog{' '}
              </a>
            </p>
            <p>
              <a href={'https://braininitiative.nih.gov/'} target={'_blank'}>
                {' '}
                <LinkOutlined />
                &nbsp;The Brain Initiative{' '}
              </a>
            </p>
            <p>
              <a
                href={'https://ngdc.cncb.ac.cn/brainbase/index'}
                target={'_blank'}
              >
                {' '}
                <LinkOutlined />
                &nbsp;BrainBase{' '}
              </a>
            </p>
            <p>
              <a
                href={'https://yanglab.westlake.edu.cn/software/smr/#Overview'}
                target={'_blank'}
              >
                <LinkOutlined />
                &nbsp;Summary-data-based Mendelian Randomization (SMR)
              </a>
            </p>
            <p>
              <a href={'https://lph-big.github.io/'} target={'_blank'}>
                <LinkOutlined />
                &nbsp;Laboratory for Precision Health{' '}
              </a>
            </p>
            <p>
              <a href={'https://ngdc.cncb.ac.cn/'} target={'_blank'}>
                <LinkOutlined />
                &nbsp;National Genomics Data Center
              </a>
            </p>
          </Card>
          <Divider />
        </Col>
      </Row>
    </div>
  );
}
