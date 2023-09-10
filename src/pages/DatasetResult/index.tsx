import React, { useEffect, useState } from "react";
import styles from './index.less';
import {
  getRemoteCMapResult,
  getRemoteCMapResultLike,
  getRemoteDeTSResult,
  getRemoteGEOResult, getRemoteGEOResultLike
} from "@/pages/DatasetResult/service";
import { Breadcrumb, Col, Divider, Row, Select, Space, Table,Descriptions,Typography} from "antd";
const { Title, Text, Paragraph } = Typography;
import { URL_PREFIX ,uniqueArray} from '@/common/constants';
import {
  AnalysisIcon,DetailIcon
} from "@/components/Icons/index";
import { ProTable } from "@ant-design/pro-table";
import { Parser } from 'json2csv';
import { getRemoteDataset } from "@/pages/DatasetOverview/service";
import { getRemoteGEO } from "@/pages/GEOOverview/service";
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
    accession:string | undefined;
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

  const [selectitems2, setSelectitems2] = useState([]);
  const [selectitemsrowkey2, setSelectitemsrowkey2] = useState([]);

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
        sort_field: 'id',
        sort_direction: 'ascend',
      }).then((res) => {
        setLoading(false);
        setCmapresult(res.data);
        setTotal(res.meta.total);
      });
    }
  },[dataset]);

  const [georesults, setGeoresults] = useState(undefined);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [total2, setTotal2] = useState(0);
  const [pagesize2, setPagesize2] = useState(10);
  const [pageindex2, setPageindex2] = useState(1);
  useEffect(()=>{
    if(dataset){
      getRemoteGEOResult({
        pageSize: pagesize2,
        pageIndex: pageindex2,
        dataset:  dataset.dataset,
        trait:undefined,
        tissue:  undefined,
        accession:undefined,
        sig_index:  undefined,
        sort_field: 'id',
        sort_direction: 'ascend',
      }).then((res) => {
        setLoading2(false);
        setGeoresults(res.data);
        setTotal2(res.meta.total);
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


  const columns1 =[
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
            showSearch={true}
            placeholder={'input and select a Tissue'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteCMapResult({
                pageSize: 100,
                pageIndex: 1,
                dataset:keywords.dataset,
                datasetid:keywords.datasetid,
                tissue:undefined,
                cmap_name: keywords.cmap_name,
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
                setTissuelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteCMapResultLike({
                pageSize: 100,
                pageIndex: 1,
                dataset:keywords.dataset,
                datasetid:keywords.datasetid,
                tissue:value,
                cmap_name: keywords.cmap_name,
                sig_index: undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.tissue);
                  }
                });
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
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>CMap Name</strong>,
      key: 'cmap_name',
      dataIndex: 'cmap_name',
      tooltip: 'The internal (CMap-designated) name of a perturbagen, e.g. compound',
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
              const remoteKeywords = await getRemoteCMapResult({
                pageSize: 100,
                pageIndex: 1,
                dataset:keywords.dataset,
                datasetid:keywords.datasetid,
                tissue:keywords.tissue,
                cmap_name: undefined,
                sig_index: undefined,
                sort_field:undefined,
                sort_direction:undefined,
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
                sig_index: undefined,
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
      render: (text: string, record: any) => {
        if (record.inchi_key.length == 0 ){
          return (
            <span>
          <a href={"https://pubchem.ncbi.nlm.nih.gov/#query=" + record.cmap_name} target={'_blank'}>
            <Space style={{ fontWeight: 'bold' }}>
              {record.cmap_name}
              <DetailIcon />
            </Space>
          </a>
          </span>
          )
        }else {
          return (
            <span>
          <a href={"https://pubchem.ncbi.nlm.nih.gov/#query=" + record.inchi_key} target={'_blank'}>
            <Space style={{ fontWeight: 'bold' }}>
              {record.cmap_name}
              <DetailIcon />
            </Space>
          </a>
          </span>
          )
        }
      }
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Meta Score</strong>,
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
      sorter:true,
      width: 140,
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
      tooltip: 'Connection Strength Score',
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
      tooltip: 'Cosine correlation distance using all common genes of the drug and the disease induced expression profiles',
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
      tooltip: 'Cosine correlation distance using a fixed number of eXtreme genes',
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

  const [accessionlist, setAccessionlist] = useState([]);
  const columns2 =[
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
          <a href={URL_PREFIX + '/exploregeo/' + record.dataset + "/" + record.tissue + "/" + record.accession} target={'_blank'}>
            <Space style={{ fontWeight: 'bold' }}>
              {'PGEO'+record.id.toString().padStart(10,'0')}
              <AnalysisIcon />
            </Space>
          </a>
        </span>
      ),
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
        const options = tissuelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'tissue2Select'}
            showSearch={false}
            placeholder={'select a Tissue'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteCMapResult({
                pageSize: 100,
                pageIndex: 1,
                dataset:keywords.dataset,
                datasetid:keywords.datasetid,
                tissue:undefined,
                cmap_name: keywords.cmap_name,
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
                setTissuelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteCMapResultLike({
                pageSize: 100,
                pageIndex: 1,
                dataset:keywords.dataset,
                datasetid:keywords.datasetid,
                tissue:value,
                cmap_name: keywords.cmap_name,
                sig_index: undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.tissue);
                  }
                });
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
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>GEO Accession</strong>,
      key: 'accession',
      dataIndex: 'accession',
      ellipsis: true,
      search: true,
      width: 150,
      sorter:true,
      renderFormItem: () => {
        const options = accessionlist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'accessionSelect'}
            showSearch={true}
            placeholder={'input and select a GEO Accession'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteGEOResult({
                pageSize: 100,
                pageIndex: 1,
                dataset:keywords.dataset,
                trait:undefined,
                tissue:keywords.tissue,
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
                setAccessionlist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteGEOResultLike({
                pageSize: 100,
                pageIndex: 1,
                dataset:keywords.dataset,
                trait:undefined,
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
                setAccessionlist(nameList);
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
      title: <strong style={{ fontFamily: 'sans-serif' }}>Meta Score</strong>,
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
      sorter:true,
      width: 135,
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
      tooltip: 'Connection Strength Score',
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
      ellipsis: true,
      tooltip: 'Pearson correlation coefficients using a fixed number of eXtreme genes',
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
      search: false,
      tooltip: 'Cosine correlation distance using a fixed number of eXtreme genes',
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
                <a href={URL_PREFIX + "/datasetoverview/all"}>
                  <strong style={{ fontFamily: 'sans-serif' }}>
                    GWAS Datasets
                  </strong>
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">
                  <strong style={{ fontFamily: 'sans-serif' }}>
                    {dataset?.dataset}
                  </strong>
                </a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Divider />
        <Row justify={'center'}>
          <Title level={2}>
            Dataset Name: <span style={{ color: '#F15412' }}>{dataset?.dataset}</span>
          </Title>
        </Row>
        <Row>
          <Col md={11}>
            <Descriptions title={"Dataset Meta Information"} bordered={true} >
              <Descriptions.Item label="Trait" span={2}>{dataset?.trait}</Descriptions.Item>
              <Descriptions.Item label="Dataset Source">{dataset?.source}</Descriptions.Item>
              <Descriptions.Item label="PMID"  span={2} ><a href={"https://pubmed.ncbi.nlm.nih.gov/"+dataset?.pmid} target={"_blank"}>{dataset?.pmid}</a></Descriptions.Item>
              <Descriptions.Item label="Sample Size"  span={2}>{dataset?.total}</Descriptions.Item>
              <Descriptions.Item label="Number of Cases" span={2}>{dataset?.n_case}</Descriptions.Item>
              <Descriptions.Item label="Number of Controls"  span={2}>{dataset?.n_control}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col md={1}>
            <Divider type={"vertical"}/>
          </Col>
          <Col md={11}>
            <Descriptions title={"Trait-relevant Tissues Identified by deTS"} bordered={true} >
              <Descriptions.Item label="TOP 1">{detsresult.top_1?.replace("_"," ")}</Descriptions.Item>
              <Descriptions.Item label="Raw P-value 1" span={2}>{detsresult.pvalue_1 < 0.001 ? detsresult.pvalue_1?.toExponential(4) : detsresult.pvalue_1?.toFixed(4)}</Descriptions.Item>
              <Descriptions.Item label="TOP 2">{detsresult.top_2?.replace("_"," ")}</Descriptions.Item>
              <Descriptions.Item label="Raw P-value 2" span={2}>{detsresult.pvalue_2 < 0.001 ? detsresult.pvalue_2?.toExponential(4) : detsresult.pvalue_2?.toFixed(4)}</Descriptions.Item>
              <Descriptions.Item label="TOP 3">{detsresult.top_3?.replace("_"," ")}</Descriptions.Item>
              <Descriptions.Item label="Raw P-value 3" span={2}>{detsresult.pvalue_3 < 0.001 ? detsresult.pvalue_3?.toExponential(4) : detsresult.pvalue_3?.toFixed(4)}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Divider/>
        <Row justify={'center'}>
          <Title level={2}>
            CMap Result Overview
          </Title>
          <Col md={24}>
            <ProTable
              columns={columns1}
              bordered={true}
              options={false}
              dataSource={cmapresult}
              loading={loading}
              scroll={{ x: 2500 }}
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
                  sig_index:  undefined,
                  sort_field: 'id',
                  sort_direction: 'ascend',
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
                  sort_field: 'id',
                  sort_direction: 'ascend',
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
                  sig_index:undefined,
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
                          'sig_index',
                          'cmap_name',
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
            GEO Result Overview
          </Title>
          <Col md={24}>
            <ProTable
              columns={columns2}
              bordered={true}
              options={false}
              dataSource={georesults}
              loading={loading2}
              scroll={{ x: 2500 }}
              rowKey={(record: any) => {
                return record.id.toString() + 'table2';
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
                pageSize: pagesize2,
                total: total2,
                pageSizeOptions: [10, 20, 50, 100],
                showQuickJumper: true,
                showSizeChanger: true,
              }}
              onSubmit={() => {
                setLoading2(true);
                getRemoteGEOResult({
                  pageSize: pagesize,
                  pageIndex: 1,
                  dataset:  keywords.dataset,
                  trait:undefined,
                  tissue:  keywords.tissue,
                  accession:keywords.accession,
                  sig_index:  undefined,
                  sort_field: 'id',
                  sort_direction: 'ascend',
                }).then((res) => {
                  setGeoresults(res.data);
                  setLoading2(false);
                  setTotal2(res.meta.total);
                });
              }}
              onReset={()=>{
                setLoading2(true);
                getRemoteGEOResult({
                  pageSize: 10,
                  pageIndex: 1,
                  dataset:  keywords.dataset,
                  trait:  undefined,
                  tissue:  undefined,
                  accession:undefined,
                  sig_index: undefined,
                  sort_field: 'id',
                  sort_direction: 'ascend',
                }).then((res) => {
                  setGeoresults(res.data);
                  setLoading2(false);
                  setTotal2(res.meta.total);
                  setKeywords({ ...keywords, tissue: undefined });
                  setKeywords({ ...keywords, accession: undefined });
                });
              }}
              onChange={(pagination, filters, sorter, extra) => {
                // console.log(pagination);
                // console.log(sorter);
                setPageindex2(pagination.current);
                setPagesize2(pagination.pageSize);
                setKeywords({ ...keywords, sort_field: sorter.field });
                setKeywords({ ...keywords, sort_direction: sorter.order });
                setLoading2(true);
                getRemoteGEOResult({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  dataset:keywords.dataset,
                  trait:undefined,
                  tissue:keywords.tissue,
                  accession:keywords.accession,
                  sig_index:undefined,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setGeoresults(res.data);
                  setLoading2(false);
                  setTotal2(res.meta.total);
                });
              }}
              rowSelection={{
                fixed: true,
                onSelect: (record, selected, selectedRows, nativeEvent) => {
                  if (selected) {
                    let a = Array.from(new Set(selectitems2.concat(selectedRows)));
                    let b = a.filter((res) => res != undefined);
                    setSelectitems2(b);
                    let c = b.map((value) => value.id + 'table2');
                    setSelectitemsrowkey2(c);
                  } else {
                    let b = selectitems2.filter((x) => x.id != record.id);
                    setSelectitems2(b);
                    let c = b.map((value) => value.id + 'table2');
                    setSelectitemsrowkey2(c);
                  }
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                  if (selected) {
                    let a = uniqueArray(selectitems2.concat(changeRows), 'id');
                    let b = a.filter((res) => res != undefined);
                    setSelectitems2(b);
                    let c = b.map((value) => value.id + 'table2');
                    setSelectitemsrowkey2(c);
                  } else {
                    let a = new Set();
                    changeRows.forEach((value) => {
                      a.add(value.id);
                    });
                    let b = selectitems2.filter((x) => !a.has(x.id));
                    setSelectitems2(b);
                    let c = b.map((value) => value.id + 'table2');
                    setSelectitemsrowkey2(c);
                  }
                },
                selectedRowKeys: selectitemsrowkey2,
              }}
              tableAlertRender={({
                                   selectedRowKeys,
                                   selectedRows,
                                   onCleanSelected,
                                 }) => {
                const onCancelselected = () => {
                  setSelectitems2([]);
                  setSelectitemsrowkey2([]);
                };
                return (
                  <Space size={24}>
                  <span>
                    {selectitems2.length} items selected
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
                          'sig_index',
                          'accession',
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
                        const csv = json2csvParser.parse(selectitems2);
                        element.setAttribute(
                          'href',
                          'data:text/csv;charset=utf-8,' +
                          encodeURIComponent(csv),
                        );
                        element.setAttribute(
                          'download',
                          'Run_with_GEO_Results.csv',
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
