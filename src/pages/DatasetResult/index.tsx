import React, { useEffect, useState } from "react";
import styles from './index.less';
import { getRemoteCMapResult, getRemoteCMapResultLike, getRemoteDeTSResult } from "@/pages/DatasetResult/service";
import { Breadcrumb, Col, Divider, Row, Select, Space, Table,Descriptions,Typography} from "antd";
const { Title, Text, Paragraph } = Typography;
import { URL_PREFIX ,uniqueArray} from '@/common/constants';
import {
  AnalysisIcon
} from "@/components/Icons/index";
import { ProTable } from "@ant-design/pro-table";
import { Parser } from 'json2csv';
import { getRemoteDataset } from "@/pages/DatasetOverview/service";
export default function Page(props: any) {
  const [cmapresult, setCmapresult] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  interface SearchKeywords {
    dataset: string | undefined;
    datasetid: number | undefined;
    tissue: string | undefined;
    cmap_name:string | undefined;
    sig_index: string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  };
  const [keywords, setKeywords] = useState<SearchKeywords>({});

  const [name,setName] = useState(undefined);

  useEffect(() => {
    console.log(props.match.params.name);
    setName(props.match.params.name);
    setKeywords({ ...keywords, dataset: props.match.params.name });
  }, [props]);

  const [cmapnamelist, setCmapnamelist] = useState([]);
  const [tissuelist, setTissuelist] = useState([]);

  const [selectitems, setSelectitems] = useState([]);
  const [selectitemsrowkey, setSelectitemsrowkey] = useState([]);

  const [dataset, setDataset] = useState(undefined);
  useEffect(()=>{
    if(name){
      getRemoteDataset({
        pageSize: pagesize,
        pageIndex: pageindex,
        keyword: undefined,
        trait:undefined,
        pmid:undefined,
        dataset:name,
        sort_field:undefined,
        sort_direction:undefined
      }).then((res) => {
        setDataset(res.data[0]);
        setKeywords({ ...keywords, datasetid: res.data[0].id });
      });
    }
  },[name]);

  useEffect(()=>{
    if(dataset){
      getRemoteCMapResult({
        pageSize: pagesize,
        pageIndex: pageindex,
        dataset:  dataset.dataset,
        datasetid: keywords.datasetid,
        tissue:  undefined,
        cmap_name:undefined,
        sig_index:  undefined,
        sort_field: undefined,
        sort_direction: undefined
      }).then((res) => {
        setLoading(false);
        setCmapresult(res.data);
        setTotal(res.meta.total);
      });
    }
  },[dataset]);

  interface deTS {
    dataset: string | undefined;
    top_1: string | undefined;
    pvalue_1:number | undefined;
    top_2: string | undefined;
    pvalue_2:number | undefined;
    top_3: string | undefined;
    pvalue_3:number | undefined;
  };
  const [detsresult, setDetsresult] = useState<deTS>({});
  useEffect(()=>{
    if (name){
      getRemoteDeTSResult({
        pageSize: pagesize,
        pageIndex: pageindex,
        dataset:  name,
        sort_field: undefined,
        sort_direction: undefined
      }).then((res)=>{
        setDetsresult({dataset: res.data[0].dataset,
          top_1: res.data[0].top_1,pvalue_1:res.data[0].pvalue_1,
          top_2: res.data[0].top_2,pvalue_2:res.data[0].pvalue_2,
          top_3: res.data[0].top_3,pvalue_3:res.data[0].pvalue_3,
        });
      })
    }
  },[name]);


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
    // {
    //   title: <strong style={{ fontFamily: 'sans-serif' }}>Dataset</strong>,
    //   key: 'dataset',
    //   dataIndex: 'dataset',
    //   ellipsis: true,
    //   search: false,
    //   width:200,
    //   sorter:true,
    // },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Tissue</strong>,
      key: 'tissue',
      dataIndex: 'tissue',
      ellipsis: true,
      search: true,
      width: 150,
      sorter:true,
      renderFormItem: () => {
        const options = tissuelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'cmapnameSelect'}
            showSearch={false}
            placeholder={'select a Tissue'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteDeTSResult({
                pageSize: 100,
                pageIndex: 1,
                dataset:keywords.dataset,
                sort_field: undefined,
                sort_direction: undefined
              });
              if (remoteKeywords) {
                const nameList = new Set();
                nameList.add(remoteKeywords.data[0].top_1);
                nameList.add(remoteKeywords.data[0].top_2);
                nameList.add(remoteKeywords.data[0].top_3);
                nameList.add("Whole_Blood");
                setTissuelist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, tissue: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
    },
    // {
    //   title: <strong style={{ fontFamily: 'sans-serif' }}>spredixcan_up_gene</strong>,
    //   key: 'spredixcan_up_gene',
    //   dataIndex: 'spredixcan_up_gene',
    //   ellipsis: true,
    //   search: false,
    //   sorter:true,
    // },
    // {
    //   title: <strong style={{ fontFamily: 'sans-serif' }}>spredixcan_down_gene</strong>,
    //   key: 'spredixcan_down_gene',
    //   dataIndex: 'spredixcan_down_gene',
    //   ellipsis: true,
    //   search: false,
    //   sorter:true,
    // },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>CMap Name</strong>,
      key: 'cmap_name',
      dataIndex: 'cmap_name',
      ellipsis: true,
      search: true,
      width: 150,
      sorter:true,
      renderFormItem: () => {
        const options = cmapnamelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'cmapnameSelect'}
            showSearch={true}
            placeholder={'input and select a CMap Name'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteCMapResultLike({
                pageSize: 100,
                pageIndex: 1,
                dataset:keywords.dataset,
                datasetid:keywords.datasetid,
                tissue:keywords.tissue,
                cmap_name: undefined,
                sig_index: keywords.sig_index,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.cmap_name);
                  }
                });
                setCmapnamelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteCMapResultLike({
                pageSize: 100,
                pageIndex: 1,
                dataset:keywords.dataset,
                datasetid:keywords.datasetid,
                tissue:keywords.tissue,
                cmap_name: value,
                sig_index: keywords.sig_index,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.cmap_name);
                  }
                });
                setCmapnamelist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, cmap_name: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
    },
    // {
    //   title: <strong style={{ fontFamily: 'sans-serif' }}>sig_index</strong>,
    //   key: 'sig_index',
    //   dataIndex: 'sig_index',
    //   ellipsis: true,
    //   search: false,
    //   sorter:true,
    // },
    // {
    //   title: <strong style={{ fontFamily: 'sans-serif' }}>cmap_up_gene</strong>,
    //   key: 'cmap_up_gene',
    //   dataIndex: 'cmap_up_gene',
    //   ellipsis: true,
    //   search: false,
    //   sorter:true,
    // },
    // {
    //   title: <strong style={{ fontFamily: 'sans-serif' }}>cmap_down_gene</strong>,
    //   key: 'cmap_down_gene',
    //   dataIndex: 'cmap_down_gene',
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
                <a href="/datasetoverview">
                  <strong style={{ fontFamily: 'sans-serif' }}>
                    GWAS Datasets
                  </strong>
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">
                  <strong style={{ fontFamily: 'sans-serif' }}>
                    {dataset?.datasetid}
                  </strong>
                </a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Divider />
        <Row justify={'center'}>
          <Title level={2}>
            Dataset ID: <span style={{ color: '#F15412' }}>{dataset?.datasetid}</span>
          </Title>
          <Col md={22}>
            <Descriptions title={"Dataset Meta Information"} bordered={true} >
              <Descriptions.Item label="Dataset Name">{dataset?.dataset}</Descriptions.Item>
              <Descriptions.Item label="Trait">{dataset?.trait}</Descriptions.Item>
              <Descriptions.Item label="PMID"><a href={"https://pubmed.ncbi.nlm.nih.gov/"+dataset?.pmid} target={"_blank"}>{dataset?.pmid}</a></Descriptions.Item>
              <Descriptions.Item label="Sample Size">{dataset?.total}</Descriptions.Item>
              <Descriptions.Item label="Number of Cases">{dataset?.n_case}</Descriptions.Item>
              <Descriptions.Item label="Number of Controls">{dataset?.n_control}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Divider/>
        <Row justify={'center'}>
          <Col md={22}>
            <Descriptions title={"deTS Calculated Causal Tissues"} bordered={true} >
              <Descriptions.Item label="TOP 1">{detsresult.top_1?.replace("_"," ")}</Descriptions.Item>
              <Descriptions.Item label="TOP 2">{detsresult.top_2?.replace("_"," ")}</Descriptions.Item>
              <Descriptions.Item label="TOP 3">{detsresult.top_3?.replace("_"," ")}</Descriptions.Item>
              <Descriptions.Item label="P-value 1">{detsresult.pvalue_1 < 0.001 ? detsresult.pvalue_1?.toExponential(4) : detsresult.pvalue_1?.toFixed(4)}</Descriptions.Item>
              <Descriptions.Item label="P-value 2">{detsresult.pvalue_2 < 0.001 ? detsresult.pvalue_2?.toExponential(4) : detsresult.pvalue_2?.toFixed(4)}</Descriptions.Item>
              <Descriptions.Item label="P-value 3">{detsresult.pvalue_3 < 0.001 ? detsresult.pvalue_3?.toExponential(4) : detsresult.pvalue_3?.toFixed(4)}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Divider/>
        <Row justify={'center'}>
          <Title level={2}>
            CMap Results Overview
          </Title>
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
              onSubmit={() => {
                setLoading(true);
                getRemoteCMapResult({
                  pageSize: pagesize,
                  pageIndex: 1,
                  dataset:  keywords.dataset,
                  datasetid:keywords.datasetid,
                  tissue:  keywords.tissue,
                  cmap_name:keywords.cmap_name,
                  sig_index:  keywords.sig_index,
                  sort_field: undefined,
                  sort_direction: undefined,
                }).then((res) => {
                  setCmapresult(res.data);
                  setLoading(false);
                  setTotal(res.meta.total);
                });
              }}
              onReset={()=>{
                setLoading(true);
                getRemoteCMapResult({
                  pageSize: 10,
                  pageIndex: 1,
                  dataset:  keywords.dataset,
                  datasetid:keywords.datasetid,
                  tissue:  undefined,
                  cmap_name:undefined,
                  sig_index: undefined,
                  sort_field: undefined,
                  sort_direction: undefined,
                }).then((res) => {
                  setCmapresult(res.data);
                  setLoading(false);
                  setTotal(res.meta.total);
                  setKeywords({ ...keywords, tissue: undefined });
                  setKeywords({ ...keywords, cmap_name: undefined });
                  setKeywords({ ...keywords, sig_index: undefined });
                });
              }}
              onChange={(pagination, filters, sorter, extra) => {
                // console.log(pagination);
                // console.log(sorter);
                setPageindex(pagination.current);
                setPagesize(pagination.pageSize);
                setKeywords({ ...keywords, sort_field: sorter.field });
                setKeywords({ ...keywords, sort_direction: sorter.order });
                setLoading(true);
                getRemoteCMapResult({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  dataset:keywords.dataset,
                  datasetid:keywords.datasetid,
                  tissue:keywords.tissue,
                  cmap_name:keywords.cmap_name,
                  sig_index:keywords.sig_index,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setCmapresult(res.data);
                  setLoading(false);
                  setTotal(res.meta.total);
                });
              }}
              rowSelection={{
                fixed: true,
                onSelect: (record, selected, selectedRows, nativeEvent) => {
                  if (selected) {
                    let a = Array.from(new Set(selectitems.concat(selectedRows)));
                    let b = a.filter((res) => res != undefined);
                    setSelectitems(b);
                    let c = b.map((value) => value.id + 'table');
                    setSelectitemsrowkey(c);
                  } else {
                    let b = selectitems.filter((x) => x.id != record.id);
                    setSelectitems(b);
                    let c = b.map((value) => value.id + 'table');
                    setSelectitemsrowkey(c);
                  }
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                  if (selected) {
                    let a = uniqueArray(selectitems.concat(changeRows), 'id');
                    let b = a.filter((res) => res != undefined);
                    setSelectitems(b);
                    let c = b.map((value) => value.id + 'table');
                    setSelectitemsrowkey(c);
                  } else {
                    let a = new Set();
                    changeRows.forEach((value) => {
                      a.add(value.id);
                    });
                    let b = selectitems.filter((x) => !a.has(x.id));
                    setSelectitems(b);
                    let c = b.map((value) => value.id + 'table');
                    setSelectitemsrowkey(c);
                  }
                },
                selectedRowKeys: selectitemsrowkey,
              }}
              tableAlertRender={({
                                   selectedRowKeys,
                                   selectedRows,
                                   onCleanSelected,
                                 }) => {
                const onCancelselected = () => {
                  setSelectitems([]);
                  setSelectitemsrowkey([]);
                };
                return (
                  <Space size={24}>
                  <span>
                    {selectitems.length} items selected
                    <span onClick={onCancelselected}>
                      <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                        Clear selected
                      </a>
                    </span>
                  </span>
                  </Space>
                );
              }}
              tableAlertOptionRender={({
                                         selectedRowKeys,
                                         selectedRows,
                                         onCleanSelected,
                                       }) => {
                return (
                  <Space size={20}>
                    <a
                      onClick={() => {
                        let element = document.createElement('a');
                        const fields = [
                          'dataset',
                          'trait',
                          'tissue',
                          'spredixcan_up_gene',
                          'spredixcan_down_gene',
                          'sig_index',
                          'cmap_name',
                          'cmap_up_gene',
                          'cmap_down_gene',
                          'es_up',
                          'es_down',
                          'es_up_padj',
                          'es_down_padj',
                          'wtcs',
                          'xsum',
                          'css',
                          'css_pvalue',
                          'spearman',
                          'xspearman',
                          'pearson',
                          'xpearson',
                          'cosine',
                          'xcos',
                        ];
                        const json2csvParser = new Parser({ fields });
                        const csv = json2csvParser.parse(selectitems);
                        element.setAttribute(
                          'href',
                          'data:text/csv;charset=utf-8,' +
                          encodeURIComponent(csv),
                        );
                        element.setAttribute(
                          'download',
                          'Run_with_CMap_Results.csv',
                        );
                        element.style.display = 'none';
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                        onCleanSelected;
                      }}
                    >
                      Download
                    </a>
                  </Space>
                );
              }}
            />
          </Col>
        </Row>
        <Divider/>
        <Row justify={'center'}>
          <Title level={2}>
            GEO Results Overview
          </Title>

        </Row>
    </div>
  );
}
