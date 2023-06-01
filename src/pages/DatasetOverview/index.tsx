import React, { useEffect, useState } from "react";
import styles from './index.less';
import { getRemoteDataset, getRemoteDatasetLike } from "@/pages/DatasetOverview/service";
import { ApartmentOutlined, SearchOutlined } from '@ant-design/icons';
import { Parser } from 'json2csv';
// @ts-ignore
import { URL_PREFIX } from '@/common/constants';
import {
  Breadcrumb,
  Col,
  Divider,
  Table,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { ProColumns, ProTable } from "@ant-design/pro-table";
import {
  AnalysisIcon
} from "../../components/Icons/index";
export default function Page(props: any) {
  const [keyword, setKeyword] = useState(undefined);
  const [datasets, setDatasets] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  interface SearchKeywords {
    trait: string | undefined;
    pmid: string | undefined;
    dataset: string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  }

  const [keywords, setKeywords] = useState<SearchKeywords>({});
  // useEffect(() => {
  //   console.log(props.match.params.name);
  //   setKeyword(props.match.params.name);
  // }, [props]);

  useEffect(() => {
    if (keyword) {
      getRemoteDataset({
        pageSize: pagesize,
        pageIndex: pageindex,
        keyword: keyword,
        trait:undefined,
        pmid:undefined,
        dataset:undefined,
        sort_field:undefined,
        sort_direction:undefined
      }).then((res) => {
        // console.log(res.data);
        setLoading(false);
        setDatasets(res.data);
        setTotal(res.meta.total);
      });
    }
  }, [keyword]);
  useEffect(()=>{
    getRemoteDataset({
      pageSize: pagesize,
      pageIndex: pageindex,
      keyword: undefined,
      trait:undefined,
      pmid:undefined,
      dataset:undefined,
      sort_field:undefined,
      sort_direction:undefined
    }).then((res) => {
      setLoading(false);
      setDatasets(res.data);
      setTotal(res.meta.total);
    });
  },[]);
  const [datasetnamelist, setDatasetnamelist] = useState([]);
  const [traitlist, setTraitlist] = useState([]);
  const [pmidlist, setPmidlist] = useState([]);

  const [selectitems, setSelectitems] = useState([]);
  const [selectitemsrowkey, setSelectitemsrowkey] = useState([]);
  const columns = [
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Dataset ID</strong>,
      key: 'datasetid',
      dataIndex: 'datasetid',
      ellipsis: true,
      // width: 150,
      search: false,
      render: (text: string, record: any) => (
        <span>
          <a href={URL_PREFIX + '/trait/' + record.datasetid} target={'_blank'}>
            <Space style={{ fontWeight: 'bold' }}>
              {record.datasetid}
              <AnalysisIcon />
            </Space>
          </a>
        </span>
      ),
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Dataset Name</strong>,
      key: 'dataset',
      dataIndex: 'dataset',
      ellipsis: true,
      renderFormItem: () => {
        const options = datasetnamelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'datasetSelect'}
            showSearch={true}
            placeholder={'input and select a dataset'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteDatasetLike({
                pageSize: 100,
                pageIndex: 1,
                trait: keywords.trait,
                pmid: keywords.pmid,
                dataset: undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.dataset);
                  }
                });
                setDatasetnamelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteDatasetLike({
                pageSize: 100,
                pageIndex: 1,
                trait: keywords.trait,
                pmid: keywords.pmid,
                dataset: value,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.dataset);
                  }
                });
                setDatasetnamelist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, dataset: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Dataset Source</strong>,
      key: 'source',
      dataIndex: 'source',
      ellipsis: true,
      search: false,
      render: (text: string, record: any) => (
        <span>
          <a href={record.url} target={'_blank'}>
              {record.source}
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
      renderFormItem: () => {
        const options = traitlist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'traitSelect'}
            showSearch={true}
            placeholder={'input and select a trait'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteDatasetLike({
                pageSize: 100,
                pageIndex: 1,
                trait: undefined,
                pmid: keywords.pmid,
                dataset: keywords.dataset,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.trait);
                  }
                });
                setTraitlist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteDatasetLike({
                pageSize: 100,
                pageIndex: 1,
                trait: value,
                pmid: keywords.pmid,
                dataset: keywords.dataset,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.trait);
                  }
                });
                setTraitlist(nameList);
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
    // {
    //   title: <strong style={{ fontFamily: 'sans-serif' }}>Trait Description</strong>,
    //   key: 'trait_description',
    //   dataIndex: 'trait_description',
    //   ellipsis: true,
    //   search: false,
    // },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Trait Type</strong>,
      key: 'trait_type',
      dataIndex: 'trait_type',
      ellipsis: true,
      search: false,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Sample Size</strong>,
      key: 'total',
      dataIndex: 'total',
      ellipsis: true,
      search: false,
      sorter: true
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Cases</strong>,
      key: 'n_case',
      dataIndex: 'n_case',
      ellipsis: true,
      search: false,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Controls</strong>,
      key: 'n_control',
      dataIndex: 'n_control',
      ellipsis: true,
      search: false,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>PMID</strong>,
      key: 'pmid',
      dataIndex: 'pmid',
      ellipsis: true,
      search: true,
      renderFormItem: () => {
        const options = pmidlist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'pmidSelect'}
            showSearch={true}
            placeholder={'input and select a PMID'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteDatasetLike({
                pageSize: 100,
                pageIndex: 1,
                trait: keywords.trait,
                pmid: undefined,
                dataset: keywords.dataset,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.pmid);
                  }
                });
                setPmidlist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteDatasetLike({
                pageSize: 100,
                pageIndex: 1,
                trait: keywords.trait,
                pmid: value,
                dataset: keywords.dataset,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.pmid);
                  }
                });
                setPmidlist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, pmid: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
      render: (text: string, record) => (
        <span>
          <a
            className={styles.link}
            href={record.pmid.startsWith("http") ? record.pmid :'https://pubmed.ncbi.nlm.nih.gov/' + record.pmid}
            target={'_blank'}
          >
            <Space>
              {record.pmid}
            </Space>
          </a>
        </span>
      ),
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Publish Year</strong>,
      key: 'year',
      dataIndex: 'year',
      ellipsis: true,
      search: false,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>First Author</strong>,
      key: 'first_author',
      dataIndex: 'first_author',
      ellipsis: true,
      search: false,
    }
  ];

  const uniqueArray = (arr, attr) => {
    const res = new Map();
    return arr.filter((item) => {
      const attrItem = item[attr];
      return !res.has(attrItem) && res.set(attrItem, 1);
    });
  };
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
                  GWAS Datasets
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
            dataSource={datasets}
            loading={loading}
            scroll={{ x: 2000 }}
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
              pageSize: 10,
              total: total,
              pageSizeOptions: [5, 10, 20],
              showQuickJumper: true,
              showSizeChanger: false,
              onChange: (page) => {
                setPageindex(page);
                setLoading(true);
                console.log(page);
                getRemoteDataset({
                  pageSize: pagesize,
                  pageIndex: page,
                  keyword: keyword,
                  trait:keywords.trait,
                  pmid:keywords.pmid,
                  dataset:keywords.dataset,
                  sort_field:keywords.sort_field,
                  sort_direction:keywords.sort_direction
                }).then((res) => {
                  // console.log(res);
                  setDatasets(res.data);
                  setTotal(res.meta.total);
                  setLoading(false);
                });
              },
            }}
            onSubmit={() => {
              setLoading(true);
              getRemoteDataset({
                pageSize: 10,
                pageIndex: 1,
                keyword:undefined,
                trait:keywords.trait,
                pmid:keywords.pmid,
                dataset:keywords.dataset,
                sort_field:keywords.sort_field,
                sort_direction:keywords.sort_direction
              }).then((res) => {
                setDatasets(res.data);
                setLoading(false);
                setTotal(res.meta.total);
              });
            }}
            onReset={() => {
              setLoading(true);
              getRemoteDataset({
                pageSize: 10,
                pageIndex: 1,
                keyword:undefined,
                trait:undefined,
                pmid:undefined,
                dataset:undefined,
                sort_field:undefined,
                sort_direction:undefined
              }).then((res) => {
                setDatasets(res.data);
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
              getRemoteDataset({
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                keyword:keyword,
                trait:keywords.trait,
                pmid:keywords.pmid,
                dataset:keywords.dataset,
                sort_field: sorter.field,
                sort_direction: sorter.order,
              }).then((res) => {
                setDatasets(res.data);
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
                        'datasetid',
                        'dataset',
                        'trait',
                        'trait_description',
                        'trait_type',
                        'n_case',
                        'n_control',
                        'total',
                        'pmid',
                        'year',
                        'first_author',
                        'source',
                        'url',
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
                        'GWAS_Datasets.csv',
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
