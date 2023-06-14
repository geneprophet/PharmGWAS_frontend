import React, { useEffect, useState } from "react";
import styles from './index.less';
import { Breadcrumb, Col, Descriptions, Divider, Row, Select, Space, Table, Typography } from "antd";
import { URL_PREFIX ,uniqueArray} from '@/common/constants';
import { getRemoteCMap } from "@/pages/CMapOverview/service";
import { getRemoteResultCMap } from "@/pages/CMapResult/service";
import { getRemoteCMapResultLike, getRemoteDeTSResult } from "@/pages/DatasetResult/service";
import { ProTable } from "@ant-design/pro-table";
import { Parser } from 'json2csv';
const { Title, Text, Paragraph } = Typography;
import {
  AnalysisIcon
} from "@/components/Icons/index";
export default function Page(props: any) {
  const [name,setName] = useState(undefined);
  useEffect(() => {
    console.log(props.match.params.name);
    setName(props.match.params.name);
  }, [props]);
  const [cmapsignature, setCmapsignature] = useState(undefined);
  useEffect(()=>{
    if(props){
      getRemoteCMap({
        pageSize: pagesize,
        pageIndex: pageindex,
        pert_id:  undefined,
        sig_id:  undefined,
        sig_index:  props.match.params.name,
        cmap_name:  undefined,
        cell_iname: undefined,
        pert_idose:  undefined,
        pert_itime:  undefined,
        sort_field: undefined,
        sort_direction: undefined
      }).then((res) => {
        setCmapsignature(res.data[0]);
      });
    }
  },[props]);

  const [cmapresult, setCmapresult] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  useEffect(()=>{
    if(name){
      getRemoteResultCMap({
        pageSize: pagesize,
        pageIndex: pageindex,
        dataset:  undefined,
        datasetid: undefined,
        tissue:  undefined,
        cmap_name:undefined,
        sig_index:  name,
        sort_field: undefined,
        sort_direction: undefined
      }).then((res)=>{
        setLoading(false);
        setCmapresult(res.data);
        setTotal(res.meta.total);
      })
    }
  },[name]);

  interface SearchKeywords {
    dataset: string | undefined;
    tissue: string | undefined;
    trait:string | undefined;
    cmap_name:string | undefined;
    sig_index: string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  };
  const [keywords, setKeywords] = useState<SearchKeywords>({});
  const [traitlist, setTraitlist] = useState([]);
  const [tissuelist, setTissuelist] = useState([]);

  const [selectitems, setSelectitems] = useState([]);
  const [selectitemsrowkey, setSelectitemsrowkey] = useState([]);
  const columns =[
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Association ID</strong>,
      key: 'id',
      dataIndex: 'id',
      ellipsis: true,
      width: 200,
      search: false,
      sorter: true,
      render: (text: string, record: any) => (
        <span>
          <a href={URL_PREFIX + '/explorecmap/' + record.dataset + "/" + record.tissue + "/" + record.sig_index} target={'_blank'}>
            <Space style={{ fontWeight: 'bold' }}>
              {'PCMAP'+record.id.toString().padStart(10,'0')}
              <AnalysisIcon />
            </Space>
          </a>
        </span>
      ),
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Trait</strong>,
      key: 'trait',
      dataIndex: 'trait',
      ellipsis: true,
      search: true,
      width:200,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Dataset</strong>,
      key: 'dataset',
      dataIndex: 'dataset',
      ellipsis: true,
      search: false,
      width:200,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Tissue</strong>,
      key: 'tissue',
      dataIndex: 'tissue',
      ellipsis: true,
      search: true,
      width: 150,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>CMap Name</strong>,
      key: 'cmap_name',
      dataIndex: 'cmap_name',
      ellipsis: true,
      search: false,
      width: 150,
      sorter:true,
    },
    // {
    //   title: <strong style={{ fontFamily: 'sans-serif' }}>sig_index</strong>,
    //   key: 'sig_index',
    //   dataIndex: 'sig_index',
    //   ellipsis: true,
    //   search: false,
    //   sorter:true,
    // },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>WTCS</strong>,
      key: 'wtcs',
      dataIndex: 'wtcs',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if (record.wtcs == 0){
          return record.wtcs
        }else if (Math.abs(record.wtcs) < 0.01){
          return record.wtcs.toExponential(4)
        }else {
          return record.wtcs.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>ES Up</strong>,
      key: 'es_up',
      dataIndex: 'es_up',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if (Math.abs(record.es_up) < 0.01){
          return record.es_up.toExponential(4)
        }else {
          return record.es_up.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>ES Down</strong>,
      key: 'es_down',
      dataIndex: 'es_down',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if (Math.abs(record.es_down) < 0.01){
          return record.es_down.toExponential(4)
        }else {
          return record.es_down.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>ES Up P-adj</strong>,
      key: 'es_up_padj',
      dataIndex: 'es_up_padj',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if (Math.abs(record.es_up_padj) < 0.01){
          return record.es_up_padj.toExponential(4)
        }else {
          return record.es_up_padj.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>ES Down P-adj</strong>,
      key: 'es_down_padj',
      dataIndex: 'es_down_padj',
      ellipsis: true,
      search: false,
      sorter:true,
      width: 140,
      render:(text,record,index) => {
        if (Math.abs(record.es_down_padj) < 0.01){
          return record.es_down_padj.toExponential(4)
        }else {
          return record.es_down_padj.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>XSum</strong>,
      key: 'xsum',
      dataIndex: 'xsum',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if (Math.abs(record.xsum) < 0.01){
          return record.xsum.toExponential(4)
        }else {
          return record.xsum.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>CSS</strong>,
      key: 'css',
      dataIndex: 'css',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if (Math.abs(record.css) < 0.01){
          return record.css.toExponential(4)
        }else {
          return record.css.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>CSS P</strong>,
      key: 'css_pvalue',
      dataIndex: 'css_pvalue',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if (Math.abs(record.css_pvalue) < 0.01){
          return record.css_pvalue.toExponential(4)
        }else {
          return record.css_pvalue.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Spearman</strong>,
      key: 'spearman',
      dataIndex: 'spearman',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if (Math.abs(record.spearman) < 0.01){
          return record.spearman.toExponential(4)
        }else {
          return record.spearman.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>XSpearman</strong>,
      key: 'xspearman',
      dataIndex: 'xspearman',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if (Math.abs(record.xspearman) < 0.01){
          return record.xspearman.toExponential(4)
        }else {
          return record.xspearman.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Pearson</strong>,
      key: 'pearson',
      dataIndex: 'pearson',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if (Math.abs(record.pearson) < 0.01){
          return record.pearson.toExponential(4)
        }else {
          return record.pearson.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>XPearson</strong>,
      key: 'xpearson',
      dataIndex: 'xpearson',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if (Math.abs(record.xpearson) < 0.01){
          return record.xpearson.toExponential(4)
        }else {
          return record.xpearson.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Cosine</strong>,
      key: 'cosine',
      dataIndex: 'cosine',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if (Math.abs(record.cosine) < 0.01){
          return record.cosine.toExponential(4)
        }else {
          return record.cosine.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>XCosine</strong>,
      key: 'xcos',
      dataIndex: 'xcos',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if (Math.abs(record.xcos) < 0.01){
          return record.xcos.toExponential(4)
        }else {
          return record.xcos.toFixed(4)
        }
      }
    },
  ]

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
              <a href="/cmapoverview">
                <strong style={{ fontFamily: 'sans-serif' }}>
                  CMap Signatures
                </strong>
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">
                <strong style={{ fontFamily: 'sans-serif' }}>
                  {cmapsignature?.sig_id}
                </strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Title level={2}>
          Signature ID: <span style={{ color: '#F15412' }}>{cmapsignature?.sig_id}</span>
        </Title>
        <Col md={22}>
          <Descriptions title={"Signature Meta Information"} bordered={true} >
            <Descriptions.Item label="CMap Name">{cmapsignature?.cmap_name}</Descriptions.Item>
            <Descriptions.Item label="Cell Line">{cmapsignature?.cell_iname}</Descriptions.Item>
            <Descriptions.Item label="Dose">{cmapsignature?.pert_idose}</Descriptions.Item>
            <Descriptions.Item label="Time">{cmapsignature?.pert_itime}</Descriptions.Item>
            <Descriptions.Item label="Target">{cmapsignature?.target}</Descriptions.Item>
            <Descriptions.Item label="MOA">{cmapsignature?.moa}</Descriptions.Item>
            <Descriptions.Item label="Canonical SMILES">{cmapsignature?.canonical_smiles}</Descriptions.Item>
            <Descriptions.Item label="InChiKey">{cmapsignature?.inchi_key}</Descriptions.Item>
            <Descriptions.Item label="Compound Aliase">{cmapsignature?.compound_aliases}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Divider/>
      <Row>
        <Col md={24}>
          <ProTable
            columns={columns}
            bordered={true}
            options={false}
            dataSource={cmapresult}
            loading={loading}
            scroll={{ x: 2400 }}
            rowKey={(record: any) => {
              return record.id.toString() + 'table';
            }}
            search={{
              defaultCollapsed: false,
              labelWidth: 130,
              searchText: 'Search',
              resetText: 'Reset',
              collapseRender: false,
              collapsed: false,
            }}
            pagination={{
              pageSize: pagesize,
              total: total,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
