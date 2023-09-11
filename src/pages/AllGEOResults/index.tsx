import React, { useEffect, useState } from "react";
import styles from './index.less';
import { Breadcrumb, Col, Divider, Row, Select, Space, Table, Typography } from "antd";
import { URL_PREFIX ,uniqueArray} from '@/common/constants';
import {
  AnalysisIcon
} from "@/components/Icons/index";
import { Parser } from 'json2csv';
const { Title, Text, Paragraph } = Typography;
import { ProTable } from "@ant-design/pro-table";
import { getRemoteGEOResult, getRemoteGEOResultLike } from "@/pages/DatasetResult/service";
export default function Page() {
  const [georesult, setGeoresult] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);
  useEffect(() => {
      getRemoteGEOResult({
        pageSize:pagesize,
        pageIndex:pageindex,
        dataset:undefined,
        trait:undefined,
        tissue:undefined,
        accession:undefined,
        sig_index:undefined,
        sort_field: "id",
        sort_direction: "ascend",
      }).then((res)=>{
        setLoading(false);
        setGeoresult(res.data);
        setTotal(res.meta.total);
      });
  }, []);

  interface SearchKeywords {
    dataset: string | undefined;
    tissue: string | undefined;
    trait:string | undefined;
    accession:string | undefined;
    description:string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  };
  const [keywords, setKeywords] = useState<SearchKeywords>({});
  const [traitnamelist, setTraitnamelist] = useState([]);
  const [tissuenamelist, setTissuenamelist] = useState([]);
  const [accessionnamelist, setAccessionnamelist] = useState([]);

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
          <a href={URL_PREFIX + '/exploregeo/' + record.dataset + "/" + record.tissue + "/" + record.accession}>
            <Space style={{ fontWeight: 'bold' }}>
              {'PGEO'+record.id.toString().padStart(10,'0')}
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
      renderFormItem: () => {
        const options = traitnamelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'traitnameSelect'}
            showSearch={true}
            placeholder={'input and select a Trait'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteGEOResult({
                pageSize: 100,
                pageIndex: 1,
                dataset: undefined,
                trait:undefined,
                tissue:keywords.tissue,
                accession: keywords.accession,
                sig_index: undefined,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.trait);
                  }
                });
                setTraitnamelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteGEOResultLike({
                pageSize: 100,
                pageIndex: 1,
                dataset:undefined,
                trait:value,
                tissue:keywords.tissue,
                accession: keywords.accession,
                sig_index: undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.trait);
                  }
                });
                setTraitnamelist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, trait: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
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
      renderFormItem: () => {
        const options = tissuenamelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'tissuenameSelect'}
            showSearch={true}
            placeholder={'input and select a Tissue'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteGEOResult({
                pageSize: 100,
                pageIndex: 1,
                dataset:undefined,
                trait:keywords.trait,
                tissue: undefined,
                accession: keywords.accession,
                sig_index: undefined,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.tissue);
                  }
                });
                setTissuenamelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteGEOResultLike({
                pageSize: 100,
                pageIndex: 1,
                dataset:undefined,
                trait:keywords.trait,
                tissue:value,
                accession: keywords.accession,
                sig_index: undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.tissue);
                  }
                });
                setTissuenamelist(nameList);
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
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>GEO Accession</strong>,
      key: 'accession',
      dataIndex: 'accession',
      tooltip: 'GEO Signature ID',
      ellipsis: true,
      search: true,
      sorter:true,
      width: 156,
      renderFormItem: () => {
        const options = accessionnamelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'accessionnameSelect'}
            showSearch={true}
            placeholder={'input and select a GEO Signature'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteGEOResult({
                pageSize: 100,
                pageIndex: 1,
                dataset:undefined,
                trait:keywords.trait,
                tissue: keywords.tissue,
                accession: undefined,
                sig_index: undefined,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.accession);
                  }
                });
                setAccessionnamelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteGEOResultLike({
                pageSize: 100,
                pageIndex: 1,
                dataset:undefined,
                trait:keywords.trait,
                tissue:keywords.tissue,
                accession: value,
                sig_index: undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.accession);
                  }
                });
                setAccessionnamelist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, accession: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
      render:(text,record,index) => (
        <a href={'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' + record.accession.split("_")[0]} target={"_blank"}>{record.accession}</a>
      )
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Meta-Score</strong>,
      key: 'meta_score',
      dataIndex: 'meta_score',
      tooltip: 'Meta Score amalgamates the significance derived from all six methods',
      ellipsis: true,
      search: false,
      sorter:true,
      width: 135,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>WTCS</strong>,
      key: 'wtcs',
      dataIndex: 'wtcs',
      tooltip: 'Weighted Connectivity Score',
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
      tooltip: 'Enrichment Score of disease up regulated genes in the drug-induced pre-rank gene list',
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
      title: <strong style={{ fontFamily: 'sans-serif' }}>ES Up P-adj</strong>,
      key: 'es_up_padj',
      dataIndex: 'es_up_padj',
      tooltip: 'p-adjust of ES Up',
      ellipsis: true,
      search: false,
      width:140,
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
      title: <strong style={{ fontFamily: 'sans-serif' }}>ES Down</strong>,
      key: 'es_down',
      dataIndex: 'es_down',
      tooltip: 'Enrichment Score of disease down regulated genes in the drug-induced pre-rank gene list',
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
      title: <strong style={{ fontFamily: 'sans-serif' }}>ES Down P-adj</strong>,
      key: 'es_down_padj',
      dataIndex: 'es_down_padj',
      tooltip: 'p-adjust of ES Down',
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
      tooltip: 'The eXtreme Sum score',
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
      title: <strong style={{ fontFamily: 'sans-serif' }}>XSum P</strong>,
      key: 'xsum_pvalue',
      dataIndex: 'xsum_pvalue',
      tooltip: 'The p value of XSum',
      ellipsis: true,
      search: false,
      sorter:true,
      render:(text,record,index) => {
        if(Math.abs(record.xsum_pvalue) == 0){
          return <span>&lt;0.0001</span>
        }else if (Math.abs(record.xsum_pvalue) < 0.01){
          return record.xsum_pvalue.toExponential(4)
        }else {
          return record.xsum_pvalue.toFixed(4)
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>CSS</strong>,
      key: 'css',
      dataIndex: 'css',
      ellipsis: true,
      tooltip: 'Connection Strength Score',
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
      tooltip: 'p value of CSS',
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
      tooltip: 'Spearman correlation coefficients using all common genes of the drug and the disease induced expression profiles',
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
      tooltip: 'Spearman correlation coefficients using a fixed number of eXtreme genes',
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
      tooltip: 'Pearson correlation coefficients using all common genes of the drug and the disease induced expression profiles',
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
      tooltip: 'Pearson correlation coefficients using a fixed number of eXtreme genes',
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
      tooltip: 'Cosine correlation distance using all common genes of the drug and the disease induced expression profiles',
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
      tooltip: 'Cosine correlation distance using a fixed number of eXtreme genes',
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
              <a href="">
                <strong style={{ fontFamily: 'sans-serif' }}>
                  GEO Results
                </strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Title level={2}>
          All GEO Results Overview
        </Title>
      </Row>
      <Row>
        <Col md={24}>
          <ProTable
            columns={columns}
            bordered={true}
            options={false}
            dataSource={georesult}
            loading={loading}
            scroll={{ x: 2800 }}
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
              getRemoteGEOResult({
                pageSize: pagesize,
                pageIndex: 1,
                dataset:  undefined,
                trait:keywords.trait,
                tissue:  keywords.tissue,
                accession:keywords.accession,
                sig_index:  undefined,
                sort_field: 'id',
                sort_direction: 'ascend',
              }).then((res) => {
                setGeoresult(res.data);
                setLoading(false);
                setTotal(res.meta.total);
              });
            }}
            onReset={()=>{
              setLoading(true);
              getRemoteGEOResult({
                pageSize: pagesize,
                pageIndex: 1,
                dataset:  undefined,
                trait:undefined,
                tissue:  undefined,
                accession:undefined,
                sig_index:  undefined,
                sort_field: 'id',
                sort_direction: 'ascend',
              }).then((res) => {
                setGeoresult(res.data);
                setLoading(false);
                setTotal(res.meta.total);
                setKeywords({});
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
              getRemoteGEOResult({
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                dataset:undefined,
                trait:keywords.trait,
                tissue:keywords.tissue,
                accession:keywords.accession,
                sig_index:undefined,
                sort_field: sorter.field,
                sort_direction: sorter.order,
              }).then((res) => {
                setGeoresult(res.data);
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
                        'accession',
                        'sig_index',
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
                        'GEO_Results.csv',
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
    </div>
  );
}
