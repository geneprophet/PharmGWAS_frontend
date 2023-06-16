import React, { useEffect, useState } from "react";
import styles from './index.less';
import { getRemoteCMap, getRemoteCMapLike } from "@/pages/CMapOverview/service";
import { Breadcrumb, Col, Divider, Row, Select, Space, Table } from "antd";
import {
  AnalysisIcon
} from "../../components/Icons/index";
import { URL_PREFIX ,uniqueArray} from '@/common/constants';
import { ProTable } from "@ant-design/pro-table";
import { Parser } from 'json2csv';
export default function Page(props: any) {
  const [name, setName] = useState(undefined);
  useEffect(() => {
    console.log(props.match.params.name);
    setName(props.match.params.name);
  }, [props]);

  const [cmapsignatures, setCmapsignatures] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  interface SearchKeywords {
    pert_id: string | undefined;
    sig_id: string | undefined;
    cmap_name: string | undefined;
    cell_iname: string | undefined;
    pert_idose: string | undefined;
    pert_itime: string | undefined;
    sort_field: string | undefined;
    sort_direction: string | undefined;
  };
  const [keywords, setKeywords] = useState<SearchKeywords>({});
  useEffect(()=>{
    if(name){
      if (name == "all"){
        setName(undefined);
        getRemoteCMap({
          pageSize: pagesize,
          pageIndex: pageindex,
          keyword: undefined,
          pert_id:  undefined,
          sig_id:  undefined,
          sig_index:  undefined,
          cmap_name:  undefined,
          cell_iname: undefined,
          pert_idose:  undefined,
          pert_itime:  undefined,
          sort_field: undefined,
          sort_direction: undefined
        }).then((res) => {
          setLoading(false);
          setCmapsignatures(res.data);
          setTotal(res.meta.total);
        });
      }else {
        getRemoteCMap({
          pageSize: pagesize,
          pageIndex: pageindex,
          keyword: name,
          pert_id:  undefined,
          sig_id:  undefined,
          sig_index:  undefined,
          cmap_name:  undefined,
          cell_iname: undefined,
          pert_idose:  undefined,
          pert_itime:  undefined,
          sort_field: undefined,
          sort_direction: undefined
        }).then((res) => {
          setLoading(false);
          setCmapsignatures(res.data);
          setTotal(res.meta.total);
        });
      }

    }

  },[name]);

  const [pertidlist, setPertidlist] = useState([]);
  const [sigidlist, setSigidlist] = useState([]);
  const [cmapnamelist, setCmapnamelist] = useState([]);
  const [cellinamelist, setCellinamelist] = useState([]);
  const [pertidoselist, setPertidoselist] = useState([]);
  const [pertitimelist, setPertitimelist] = useState([]);

  const [selectitems, setSelectitems] = useState([]);
  const [selectitemsrowkey, setSelectitemsrowkey] = useState([]);

  const columns =[
    Table.SELECTION_COLUMN,
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Signature ID</strong>,
      key: 'sig_id',
      dataIndex: 'sig_id',
      ellipsis: true,
      width: 350,
      search: false,
      sorter:true,
      tooltip:'Unique identifier for the signature',
      render: (text: string, record: any) => (
        <span>
          <a href={URL_PREFIX + '/cmapresult/' + record.sig_index} target={'_blank'}>
            <Space style={{ fontWeight: 'bold' }}>
              {record.sig_id}
              <AnalysisIcon />
            </Space>
          </a>
        </span>
      ),
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Perturbagen ID</strong>,
      key: 'pert_id',
      dataIndex: 'pert_id',
      tooltip: 'A unique identifier for a perturbagen that refers to the perturbagen in general, not to any particular batch or sample',
      ellipsis: true,
      search: false,
      sorter:true,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>CMap Name</strong>,
      key: 'cmap_name',
      dataIndex: 'cmap_name',
      tooltip:'The internal (CMap-designated) name of a perturbagen, e.g. compound',
      ellipsis: true,
      search: true,
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
              const remoteKeywords = await getRemoteCMap({
                pageSize: 100,
                pageIndex: 1,
                keyword: name,
                pert_id: keywords.pert_id,
                sig_id:keywords.sig_id,
                sig_index:undefined,
                cmap_name: undefined,
                cell_iname: keywords.cell_iname,
                pert_idose:keywords.pert_idose,
                pert_itime:keywords.pert_itime,
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
              const remoteKeywords = await getRemoteCMapLike({
                pageSize: 100,
                pageIndex: 1,
                keyword: name,
                pert_id: keywords.pert_id,
                sig_id:keywords.sig_id,
                cmap_name: value,
                cell_iname: keywords.cell_iname,
                pert_idose:keywords.pert_idose,
                pert_itime:keywords.pert_itime,
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
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Cell Line</strong>,
      key: 'cell_iname',
      dataIndex: 'cell_iname',
      tooltip:'Curated name for the cell line',
      ellipsis: true,
      sorter:true,
      search: true,
      renderFormItem: () => {
        const options = cellinamelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'celllineSelect'}
            showSearch={true}
            placeholder={'input and select a Cell Line'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteCMap({
                pageSize: 100,
                pageIndex: 1,
                keyword: name,
                pert_id: keywords.pert_id,
                sig_id:keywords.sig_id,
                sig_index:undefined,
                cmap_name: keywords.cmap_name,
                cell_iname: undefined,
                pert_idose:keywords.pert_idose,
                pert_itime:keywords.pert_itime,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.cell_iname);
                  }
                });
                setCellinamelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteCMapLike({
                pageSize: 100,
                pageIndex: 1,
                keyword: name,
                pert_id: keywords.pert_id,
                sig_id:keywords.sig_id,
                cmap_name: keywords.cmap_name,
                cell_iname: value,
                pert_idose:keywords.pert_idose,
                pert_itime:keywords.pert_itime,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.cell_iname);
                  }
                });
                setCellinamelist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, cell_iname: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Dose</strong>,
      key: 'pert_idose',
      dataIndex: 'pert_idose',
      tooltip: 'Precise dose used in the experiment',
      ellipsis: true,
      search: true,
      sorter:true,
      renderFormItem: () => {
        const options = pertidoselist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'doseSelect'}
            showSearch={true}
            placeholder={'input and select a Dose'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteCMap({
                pageSize: 100,
                pageIndex: 1,
                keyword: name,
                pert_id: keywords.pert_id,
                sig_id:keywords.sig_id,
                sig_index:undefined,
                cmap_name: keywords.cmap_name,
                cell_iname: keywords.cell_iname,
                pert_idose:undefined,
                pert_itime:keywords.pert_itime,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.pert_idose);
                  }
                });
                setPertidoselist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteCMapLike({
                pageSize: 100,
                pageIndex: 1,
                keyword: name,
                pert_id: keywords.pert_id,
                sig_id:keywords.sig_id,
                cmap_name: keywords.cmap_name,
                cell_iname: keywords.cell_iname,
                pert_idose:value,
                pert_itime:keywords.pert_itime,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.pert_idose);
                  }
                });
                setPertidoselist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, pert_idose: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Time</strong>,
      key: 'pert_itime',
      dataIndex: 'pert_itime',
      tooltip: 'The length of time that a perturbagen was applied to the cells',
      ellipsis: true,
      search: true,
      renderFormItem: () => {
        const options = pertitimelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'timeSelect'}
            showSearch={true}
            placeholder={'input and select a Time'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteCMap({
                pageSize: 100,
                pageIndex: 1,
                keyword:name,
                pert_id: keywords.pert_id,
                sig_id:keywords.sig_id,
                sig_index:undefined,
                cmap_name: keywords.cmap_name,
                cell_iname: keywords.cell_iname,
                pert_idose:keywords.pert_idose,
                pert_itime:undefined,
                sort_field:undefined,
                sort_direction:undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.pert_itime);
                  }
                });
                setPertitimelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteCMapLike({
                pageSize: 100,
                pageIndex: 1,
                keyword:name,
                pert_id: keywords.pert_id,
                sig_id:keywords.sig_id,
                cmap_name: keywords.cmap_name,
                cell_iname: keywords.cell_iname,
                pert_idose:keywords.pert_idose,
                pert_itime:value,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.pert_itime);
                  }
                });
                setPertitimelist(nameList);
              }
            }}
            onChange={(value) => {
              setKeywords({ ...keywords, pert_itime: value });
              // console.log(value)
            }}
          >
            {options}
          </Select>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Target</strong>,
      key: 'target',
      dataIndex: 'target',
      tooltip: 'The symbol of the gene that the compound targets',
      ellipsis: true,
      sorter:true,
      search: false,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>MOA</strong>,
      key: 'moa',
      dataIndex: 'moa',
      tooltip: 'A curated phrase representing the compound\'s mechanism of action',
      ellipsis: true,
      sorter:true,
      search: false,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Canonical SMILES</strong>,
      key: 'canonical_smiles',
      dataIndex: 'canonical_smiles',
      tooltip: 'Canonical SMILES structure',
      ellipsis: true,
      search: false,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>InChiKey</strong>,
      key: 'inchi_key',
      dataIndex: 'inchi_key',
      tooltip: 'InChIKey - hashed version of the InChi identifier',
      ellipsis: true,
      search: false,
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Compound Aliases</strong>,
      key: 'compound_aliases',
      dataIndex: 'compound_aliases',
      tooltip: 'Alternative name for the compound',
      ellipsis: true,
      search: false,
    }
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
                  CMap Signatures
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
            dataSource={cmapsignatures}
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
              getRemoteCMap({
                pageSize: pagesize,
                pageIndex: 1,
                keyword: name,
                pert_id:  keywords.pert_id,
                sig_id:  keywords.sig_id,
                sig_index:  undefined,
                cmap_name:  keywords.cmap_name,
                cell_iname: keywords.cell_iname,
                pert_idose:  keywords.pert_idose,
                pert_itime:  keywords.pert_itime,
                sort_field: undefined,
                sort_direction: undefined,
              }).then((res) => {
                setCmapsignatures(res.data);
                setLoading(false);
                setTotal(res.meta.total);
              });
            }}
            onReset={()=>{
              setLoading(true);
              getRemoteCMap({
                pageSize: 10,
                pageIndex: 1,
                keyword:name,
                pert_id:  undefined,
                sig_id: undefined,
                sig_index: undefined,
                cmap_name:  undefined,
                cell_iname: undefined,
                pert_idose:  undefined,
                pert_itime:  undefined,
                sort_field: undefined,
                sort_direction: undefined,
              }).then((res) => {
                setCmapsignatures(res.data);
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
              getRemoteCMap({
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                keyword:name,
                pert_id:  keywords.pert_id,
                sig_id:  keywords.sig_id,
                sig_index:  undefined,
                cmap_name:  keywords.cmap_name,
                cell_iname: keywords.cell_iname,
                pert_idose:  keywords.pert_idose,
                pert_itime:  keywords.pert_itime,
                sort_field: sorter.field,
                sort_direction: sorter.order,
              }).then((res) => {
                setCmapsignatures(res.data);
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
                        'sig_id',
                        'pert_id',
                        'sig_index',
                        'cmap_name',
                        'cell_iname',
                        'pert_idose',
                        'pert_itime',
                        'target',
                        'moa',
                        'canonical_smiles',
                        'inchi_key',
                        'compound_aliases',
                        'bead_batch',
                        'nearest_dose',
                        'pert_dose',
                        'pert_dose_unit',
                        'pert_time',
                        'pert_time_unit',
                        'cell_mfc_name',
                        'pert_mfc_id',
                        'nsample',
                        'cc_q75',
                        'ss_ngene',
                        'tas',
                        'pct_self_rank_q25',
                        'wt',
                        'median_recall_rank_spearman',
                        'median_recall_rank_wtcs_50',
                        'median_recall_score_spearman',
                        'median_recall_score_wtcs_50',
                        'batch_effect_tstat',
                        'is_hiq',
                        'qc_pass',
                        'pert_type',
                        'det_wells',
                        'det_plates',
                        'distil_ids',
                        'build_name',
                        'project_code',
                        'is_exemplar_sig',
                        'is_ncs_sig',
                        'is_null_sig',
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
                        'CMap_Signatures.csv',
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
