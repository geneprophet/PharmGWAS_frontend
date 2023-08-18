import React, { useEffect, useState } from "react";
import styles from './index.less';
import { getRemoteGEO, getRemoteGEOLike } from "@/pages/GEOOverview/service";
import { Breadcrumb, Col, Divider, Row, Select, Space } from "antd";
import { URL_PREFIX ,uniqueArray} from '@/common/constants';
import { ProTable } from "@ant-design/pro-table";
import { Parser } from 'json2csv';
import {
  AnalysisIcon
} from "../../components/Icons/index";
export default function Page(props: any) {
  const [geosignatures, setGeosignatures] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);
  interface SearchKeywords {
    accession: string | undefined;
    series_id: string | undefined;
    description: string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  };
  const [keywords, setKeywords] = useState<SearchKeywords>({});
  const [name, setName] = useState(undefined);
  useEffect(() => {
    console.log(props.match.params.name);
    setName(props.match.params.name);
  }, [props]);
  useEffect(()=>{
    if (name){
      if (name=="all"){
        setName(undefined);
        getRemoteGEO({
          pageSize: pagesize,
          pageIndex: pageindex,
          accession:  undefined,
          series_id:  undefined,
          description:  undefined,
          sort_field: undefined,
          sort_direction: undefined
        }).then((res) => {
          setLoading(false);
          setGeosignatures(res.data);
          setTotal(res.meta.total);
        });
      }else{
        getRemoteGEOLike({
          pageSize: pagesize,
          pageIndex: pageindex,
          keyword:name,
          accession:  undefined,
          series_id:  undefined,
          description:  undefined,
          sort_field: undefined,
          sort_direction: undefined
        }).then((res) => {
          setLoading(false);
          setGeosignatures(res.data);
          setTotal(res.meta.total);
        });
      }
    }
  },[name]);

  const [seriesidlist, setSeriesidlist] = useState([]);
  const [descriptionlist, setDescriptionlist] = useState([]);
  const [selectitems, setSelectitems] = useState([]);
  const [selectitemsrowkey, setSelectitemsrowkey] = useState([]);

  const columns =[
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Signature ID</strong>,
      key: 'accession',
      dataIndex: 'accession',
      width:200,
      // tooltip: 'A unique identifier for a perturbagen',
      ellipsis: true,
      search: false,
      sorter:true,
      render: (text: string, record: any) => (
        <span>
          <a href={URL_PREFIX + '/georesult/' + record.accession}>
            <Space style={{ fontWeight: 'bold' }}>
              {record.accession}
              <AnalysisIcon />
            </Space>
          </a>
        </span>
      ),
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>GEO Series</strong>,
      key: 'series_id',
      dataIndex: 'series_id',
      // tooltip: 'A unique identifier for a perturbagen',
      ellipsis: true,
      width:200,
      search: true,
      sorter:true,
      renderFormItem: () => {
        const options = seriesidlist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'seriesSelect'}
            showSearch={true}
            placeholder={'input and select a GEO Series'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteGEO({
                pageSize: 100,
                pageIndex: 1,
                accession: keywords.accession,
                series_id:undefined,
                description: keywords.description,
                sort_field: undefined,
                sort_direction: undefined
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.series_id);
                  }
                });
                setSeriesidlist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteGEOLike({
                pageSize: 100,
                pageIndex: 1,
                keyword:name,
                accession: keywords.accession,
                series_id: value,
                description: keywords.description,
                sort_field: undefined,
                sort_direction: undefined
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.series_id);
                  }
                });
                setSeriesidlist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, series_id: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
      render: (text: string, record: any) => (
        <span>
          <a href={'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' + record.series_id} target={'_blank'}>
            {record.series_id}
          </a>
        </span>
      ),
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Description</strong>,
      key: 'description',
      dataIndex: 'description',
      // tooltip: 'A unique identifier for a perturbagen',
      ellipsis: true,
      search: true,
      width:600,
      sorter:true,
      renderFormItem: () => {
        const options = descriptionlist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'descriptionSelect'}
            showSearch={true}
            placeholder={'input and select a Description'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteGEO({
                pageSize: 100,
                pageIndex: 1,
                accession: keywords.accession,
                series_id:keywords.series_id,
                description: undefined,
                sort_field: undefined,
                sort_direction: undefined
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.description);
                  }
                });
                setDescriptionlist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteGEOLike({
                pageSize: 100,
                pageIndex: 1,
                keyword:name,
                accession: keywords.accession,
                series_id: keywords.series_id,
                description: value,
                sort_field: undefined,
                sort_direction: undefined
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.description);
                  }
                });
                setDescriptionlist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, description: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Cases</strong>,
      key: 'pert_num',
      dataIndex: 'pert_num',
      // tooltip: 'A unique identifier for a perturbagen',
      ellipsis: true,
      search: false,
      width:120,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>#Controls</strong>,
      key: 'ctrl_num',
      dataIndex: 'ctrl_num',
      // tooltip: 'A unique identifier for a perturbagen',
      ellipsis: true,
      search: false,
      sorter:true,
      width:120,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Case Samples</strong>,
      key: 'pert_gsm',
      dataIndex: 'pert_gsm',
      // tooltip: 'A unique identifier for a perturbagen',
      ellipsis: true,
      search: false,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Control Samples</strong>,
      key: 'ctrl_gsm',
      dataIndex: 'ctrl_gsm',
      // tooltip: 'A unique identifier for a perturbagen',
      ellipsis: true,
      search: false,
    },
    // {
    //   title: <strong style={{ fontFamily: 'sans-serif' }}>extrap_score</strong>,
    //   key: 'extrap_score',
    //   dataIndex: 'extrap_score',
    //   // tooltip: 'A unique identifier for a perturbagen',
    //   ellipsis: true,
    //   search: false,
    //   sorter:true,
    // },
  ];

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
                  GEO Signatures
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
            dataSource={geosignatures}
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
              pageSize: pagesize,
              total: total,
              pageSizeOptions: [10, 20, 50, 100],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onSubmit={() => {
              setLoading(true);
              getRemoteGEO({
                pageSize: pagesize,
                pageIndex: 1,
                accession:  keywords.accession,
                series_id:  keywords.series_id,
                description:  keywords.description,
                sort_field: undefined,
                sort_direction: undefined,
              }).then((res) => {
                setGeosignatures(res.data);
                setLoading(false);
                setTotal(res.meta.total);
              });
            }}
            onReset={()=>{
              setLoading(true);
              getRemoteGEO({
                pageSize: 10,
                pageIndex: 1,
                accession:  undefined,
                series_id:  undefined,
                description:  undefined,
                sort_field: undefined,
                sort_direction: undefined,
              }).then((res) => {
                setGeosignatures(res.data);
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
              if (name){
                getRemoteGEOLike({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  keyword:name,
                  accession:  keywords.accession,
                  series_id:  keywords.series_id,
                  description:  keywords.description,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setGeosignatures(res.data);
                  setLoading(false);
                  setTotal(res.meta.total);
                });
              }else {
                getRemoteGEO({
                  pageSize: pagination.pageSize,
                  pageIndex: pagination.current,
                  accession:  keywords.accession,
                  series_id:  keywords.series_id,
                  description:  keywords.description,
                  sort_field: sorter.field,
                  sort_direction: sorter.order,
                }).then((res) => {
                  setGeosignatures(res.data);
                  setLoading(false);
                  setTotal(res.meta.total);
                });
              }

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
                        'accession',
                        'series_id',
                        'description',
                        'pert_num',
                        'ctrl_num',
                        'pert_gsm',
                        'ctrl_gsm',
                        'extrap_score'
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
                        'GEO_Signatures.csv',
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
