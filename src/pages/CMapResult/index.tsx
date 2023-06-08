import React, { useEffect, useState } from "react";
import styles from './index.less';
import { getRemoteCMap } from "@/pages/CMapOverview/service";
import { getRemoteCMapResult } from "@/pages/CMapResult/service";
import { Breadcrumb, Col, Divider, Row, Table } from "antd";
import { URL_PREFIX ,uniqueArray} from '@/common/constants';
import { ProTable } from "@ant-design/pro-table";
import { Parser } from 'json2csv';
export default function Page(props: any) {
  const [cmapresult, setCmapresult] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  const [name,setName] = useState();
  useEffect(() => {
    console.log(props.match.params.name);
    setName(props.match.params.name);
  }, [props]);

  interface SearchKeywords {
    dataset: string | undefined;
    tissue: string | undefined;
    sig_index: string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  };
  const [keywords, setKeywords] = useState<SearchKeywords>({});
  useEffect(()=>{
    getRemoteCMapResult({
      pageSize: pagesize,
      pageIndex: pageindex,
      dataset:  name,
      tissue:  undefined,
      sig_index:  undefined,
      sort_field: undefined,
      sort_direction: undefined
    }).then((res) => {
      setLoading(false);
      setCmapresult(res.data);
      setTotal(res.meta.total);
    });
  },[]);

  const columns =[
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Dataset</strong>,
      key: 'dataset',
      dataIndex: 'dataset',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>tissue</strong>,
      key: 'tissue',
      dataIndex: 'tissue',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>spredixcan_up_gene</strong>,
      key: 'spredixcan_up_gene',
      dataIndex: 'spredixcan_up_gene',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>spredixcan_down_gene</strong>,
      key: 'spredixcan_down_gene',
      dataIndex: 'spredixcan_down_gene',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>sig_index</strong>,
      key: 'sig_index',
      dataIndex: 'sig_index',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>cmap_up_gene</strong>,
      key: 'cmap_up_gene',
      dataIndex: 'cmap_up_gene',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>cmap_down_gene</strong>,
      key: 'cmap_down_gene',
      dataIndex: 'cmap_down_gene',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>es_up</strong>,
      key: 'es_up',
      dataIndex: 'es_up',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>es_down</strong>,
      key: 'es_down',
      dataIndex: 'es_down',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>es_up_padj</strong>,
      key: 'es_up_padj',
      dataIndex: 'es_up_padj',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>es_down_padj</strong>,
      key: 'es_down_padj',
      dataIndex: 'es_down_padj',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>wtcs</strong>,
      key: 'wtcs',
      dataIndex: 'wtcs',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>xsum</strong>,
      key: 'xsum',
      dataIndex: 'xsum',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>css</strong>,
      key: 'css',
      dataIndex: 'css',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>css_pvalue</strong>,
      key: 'css_pvalue',
      dataIndex: 'css_pvalue',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>spearman</strong>,
      key: 'spearman',
      dataIndex: 'spearman',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>xspearman</strong>,
      key: 'xspearman',
      dataIndex: 'xspearman',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>pearson</strong>,
      key: 'pearson',
      dataIndex: 'pearson',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>xpearson</strong>,
      key: 'xpearson',
      dataIndex: 'xpearson',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>cosine</strong>,
      key: 'cosine',
      dataIndex: 'cosine',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>xcos</strong>,
      key: 'xcos',
      dataIndex: 'xcos',
      ellipsis: true,
      search: false,
      sorter:true,
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
                <a href="/datasetoverview">
                  <strong style={{ fontFamily: 'sans-serif' }}>
                    GWAS Datasets
                  </strong>
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">
                  <strong style={{ fontFamily: 'sans-serif' }}>
                    CMap Drug Candidates
                  </strong>
                </a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Divider />
        <Row justify={'center'}>
          <Col md={24}>
            <ProTable
              columns={columns}
              bordered={true}
              options={false}
              dataSource={cmapresult}
              loading={loading}
              scroll={{ x: 2200 }}
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
            />
          </Col>
        </Row>
    </div>
  );
}
