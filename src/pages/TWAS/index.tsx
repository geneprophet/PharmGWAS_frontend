import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { getRemoteTwas, getRemoteTwaslike } from '@/pages/TWAS/service';
import { Breadcrumb, Col, Divider, Row, Select, Space, Typography } from 'antd';
const { Title, Text, Paragraph } = Typography;
import { URL_PREFIX } from '@/common/constants';
import { ProTable } from '@ant-design/pro-table';
import { Parser } from 'json2csv';
export default function Page(props: any) {
  const [trait, setTrait] = useState(undefined);
  interface SearchKeyword {
    trait: string | undefined;
    tissue: string | undefined;
    gene: string | undefined;
  }

  useEffect(() => {
    console.log(props.match.params.name);
    setTrait(props.match.params.name);
  }, [props]);

  const [twas, setTwas] = useState();
  const [loading, setLoading] = useState<boolean>(true);

  const [keyword, setKeyword] = useState<SearchKeyword>({});
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (trait) {
      getRemoteTwas({
        pageSize: pagesize,
        pageIndex: pageindex,
        trait: trait,
        tissue: undefined,
        gene: undefined,
      }).then((res) => {
        console.log(res.data);
        setTwas(res.data);
        setTotal(res.meta.total);
        setLoading(false);
      });
    }
  }, [trait]);

  const [tissuelist, setTissuelist] = useState([]);
  const [genelist, setGenelist] = useState([]);
  const [selectitems, setSelectitems] = useState([]);
  const [selectitemsrowkey, setSelectitemsrowkey] = useState([]);
  const uniqueArray = (arr, attr) => {
    const res = new Map();
    return arr.filter((item) => {
      const attrItem = item[attr];
      return !res.has(attrItem) && res.set(attrItem, 1);
    });
  };
  const columns = [
    // {
    //   title: <strong style={{ fontFamily: 'sans-serif' }}>Trait</strong>,
    //   key: 'trait',
    //   dataIndex: 'trait',
    //   ellipsis: true,
    //   width: 400,
    //   fixed: 'left',
    //   search:false,
    // },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Tissue</strong>,
      key: 'tissue',
      dataIndex: 'tissue',
      ellipsis: true,
      width: 200,
      fixed: 'left',
      search: true,
      renderFormItem: () => {
        const options = tissuelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'nameSelecttissue'}
            showSearch={true}
            placeholder={'input and select a tissue'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteTwas({
                pageSize: 100,
                pageIndex: 0,
                trait: trait,
                tissue: undefined,
                gene: keyword.gene,
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
              const remoteKeywords = await getRemoteTwaslike({
                pageSize: 100,
                pageIndex: 0,
                trait: trait,
                tissue: value,
                gene: keyword.gene,
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
              setKeyword({ ...keyword, tissue: value });
            }}
          >
            {options}
          </Select>
        );
      },
    },
    // {
    //   title: <strong style={{ fontFamily: 'sans-serif' }}>gene</strong>,
    //   key: 'gene',
    //   dataIndex: 'gene',
    //   ellipsis: true,
    //   width: 180,
    //   fixed: 'left',
    //   search: false,
    // },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>Gene</strong>,
      key: 'gene_name',
      dataIndex: 'gene_name',
      ellipsis: true,
      fixed: 'left',
      search: true,
      width: 100,
      renderFormItem: () => {
        const options = genelist.map((item) => (
          <Select.Option key={item} value={item} type={item}>
            {item}
          </Select.Option>
        ));
        return (
          <Select
            key={'nameSelectgene'}
            showSearch={true}
            placeholder={'input and select a gene'}
            filterOption={false}
            onFocus={async () => {
              const remoteKeywords = await getRemoteTwas({
                pageSize: 100,
                pageIndex: 0,
                trait: trait,
                tissue: keyword.tissue,
                gene: undefined,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.gene_name);
                  }
                });
                setGenelist(nameList);
              }
            }}
            onSearch={async (value: string) => {
              const remoteKeywords = await getRemoteTwaslike({
                pageSize: 100,
                pageIndex: 0,
                trait: trait,
                tissue: keyword.tissue,
                gene: value,
              });
              if (remoteKeywords) {
                const nameList = new Set();
                remoteKeywords.data.forEach(function (v) {
                  if (v) {
                    nameList.add(v.gene_name);
                  }
                });
                setGenelist(nameList);
              }
            }}
            onChange={(value) => {
              setKeyword({ ...keyword, gene: value });
            }}
          >
            {options}
          </Select>
        );
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>JTI Beta</strong>,
      key: 'jti_effect_size',
      dataIndex: 'jti_effect_size',
      ellipsis: true,
      width: 80,
      search: false,
      render: (text, record, index) => {
        if (record.jti_effect_size < 0.01 && record.jti_effect_size > 0) {
          return parseFloat(record.jti_effect_size).toExponential(4);
        } else if (
          record.jti_effect_size > -0.01 &&
          record.jti_effect_size < 0
        ) {
          return parseFloat(record.jti_effect_size).toExponential(4);
        } else {
          if (record.jti_effect_size) {
            return record.jti_effect_size.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>JTI Z</strong>,
      key: 'jti_zscore',
      dataIndex: 'jti_zscore',
      ellipsis: true,
      width: 80,
      search: false,
      render: (text, record, index) => {
        if (record.jti_zscore < 0.01 && record.jti_zscore > 0) {
          return parseFloat(record.jti_zscore).toExponential(4);
        } else if (record.jti_zscore > -0.01 && record.jti_zscore < 0) {
          return parseFloat(record.jti_zscore).toExponential(4);
        } else {
          if (record.jti_zscore) {
            return record.jti_zscore.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>JTI P</strong>,
      key: 'jti_pvalue',
      dataIndex: 'jti_pvalue',
      ellipsis: true,
      width: 80,
      search: false,
      render: (text, record, index) => {
        if (record.jti_pvalue < 0.01 && record.jti_pvalue > 0) {
          return parseFloat(record.jti_pvalue).toExponential(4);
        } else if (record.jti_pvalue > -0.01 && record.jti_pvalue < 0) {
          return parseFloat(record.jti_pvalue).toExponential(4);
        } else {
          if (record.jti_pvalue) {
            return record.jti_pvalue.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>JTI FDR</strong>,
      key: 'jti_fdr',
      dataIndex: 'jti_fdr',
      ellipsis: true,
      width: 80,
      search: false,
      render: (text, record, index) => {
        if (record.jti_fdr < 0.01 && record.jti_fdr > 0) {
          return parseFloat(record.jti_fdr).toExponential(4);
        } else if (record.jti_fdr > -0.01 && record.jti_fdr < 0) {
          return parseFloat(record.jti_fdr).toExponential(4);
        } else {
          if (record.jti_fdr) {
            return record.jti_fdr.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>UTMOST Beta</strong>,
      key: 'utmost_effect_size',
      dataIndex: 'utmost_effect_size',
      ellipsis: true,
      width: 120,
      search: false,
      render: (text, record, index) => {
        if (record.utmost_effect_size < 0.01 && record.utmost_effect_size > 0) {
          return parseFloat(record.utmost_effect_size).toExponential(4);
        } else if (
          record.utmost_effect_size > -0.01 &&
          record.utmost_effect_size < 0
        ) {
          return parseFloat(record.utmost_effect_size).toExponential(4);
        } else {
          if (record.utmost_effect_size) {
            return record.utmost_effect_size.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>UTMOST Z</strong>,
      key: 'utmost_zscore',
      dataIndex: 'utmost_zscore',
      ellipsis: true,
      width: 120,
      search: false,
      render: (text, record, index) => {
        if (record.utmost_zscore < 0.01 && record.utmost_zscore > 0) {
          return parseFloat(record.utmost_zscore).toExponential(4);
        } else if (record.utmost_zscore > -0.01 && record.utmost_zscore < 0) {
          return parseFloat(record.utmost_zscore).toExponential(4);
        } else {
          if (record.utmost_zscore) {
            return record.utmost_zscore.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>UTMOST P</strong>,
      key: 'utmost_pvalue',
      dataIndex: 'utmost_pvalue',
      ellipsis: true,
      width: 120,
      search: false,
      render: (text, record, index) => {
        if (record.utmost_pvalue < 0.01 && record.utmost_pvalue > 0) {
          return parseFloat(record.utmost_pvalue).toExponential(4);
        } else if (record.utmost_pvalue > -0.01 && record.utmost_pvalue < 0) {
          return parseFloat(record.utmost_pvalue).toExponential(4);
        } else {
          if (record.utmost_pvalue) {
            return record.utmost_pvalue.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: <strong style={{ fontFamily: 'sans-serif' }}>UTMOST FDR</strong>,
      key: 'utmost_fdr',
      dataIndex: 'utmost_fdr',
      ellipsis: true,
      width: 120,
      search: false,
      render: (text, record, index) => {
        if (record.utmost_fdr < 0.01 && record.utmost_fdr > 0) {
          return parseFloat(record.utmost_fdr).toExponential(4);
        } else if (record.utmost_fdr > -0.01 && record.utmost_fdr < 0) {
          return parseFloat(record.utmost_fdr).toExponential(4);
        } else {
          if (record.utmost_fdr) {
            return record.utmost_fdr.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>
          PrediXcan eQTL Beta
        </strong>
      ),
      key: 'predixcan_eqtl_effect_size',
      dataIndex: 'predixcan_eqtl_effect_size',
      ellipsis: true,
      width: 170,
      search: false,
      render: (text, record, index) => {
        if (
          record.predixcan_eqtl_effect_size < 0.01 &&
          record.predixcan_eqtl_effect_size > 0
        ) {
          return parseFloat(record.predixcan_eqtl_effect_size).toExponential(4);
        } else if (
          record.predixcan_eqtl_effect_size > -0.01 &&
          record.predixcan_eqtl_effect_size < 0
        ) {
          return parseFloat(record.predixcan_eqtl_effect_size).toExponential(4);
        } else {
          if (record.predixcan_eqtl_effect_size) {
            return record.predixcan_eqtl_effect_size.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>PrediXcan eQTL Z</strong>
      ),
      key: 'predixcan_eqtl_zscore',
      dataIndex: 'predixcan_eqtl_zscore',
      ellipsis: true,
      width: 150,
      search: false,
      render: (text, record, index) => {
        if (
          record.predixcan_eqtl_zscore < 0.01 &&
          record.predixcan_eqtl_zscore > 0
        ) {
          return parseFloat(record.predixcan_eqtl_zscore).toExponential(4);
        } else if (
          record.predixcan_eqtl_zscore > -0.01 &&
          record.predixcan_eqtl_zscore < 0
        ) {
          return parseFloat(record.predixcan_eqtl_zscore).toExponential(4);
        } else {
          if (record.predixcan_eqtl_zscore) {
            return record.predixcan_eqtl_zscore.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>PrediXcan eQTL P</strong>
      ),
      key: 'predixcan_eqtl_pvalue',
      dataIndex: 'predixcan_eqtl_pvalue',
      ellipsis: true,
      // width: 400,
      width: 150,
      search: false,
      render: (text, record, index) => {
        if (
          record.predixcan_eqtl_pvalue < 0.01 &&
          record.predixcan_eqtl_pvalue > 0
        ) {
          return parseFloat(record.predixcan_eqtl_pvalue).toExponential(4);
        } else if (
          record.predixcan_eqtl_pvalue > -0.01 &&
          record.predixcan_eqtl_pvalue < 0
        ) {
          return parseFloat(record.predixcan_eqtl_pvalue).toExponential(4);
        } else {
          if (record.predixcan_eqtl_pvalue) {
            return record.predixcan_eqtl_pvalue.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>PrediXcan eQTL FDR</strong>
      ),
      key: 'predixcan_eqtl_fdr',
      dataIndex: 'predixcan_eqtl_fdr',
      ellipsis: true,
      // width: 400,
      width: 170,
      search: false,
      render: (text, record, index) => {
        if (record.predixcan_eqtl_fdr < 0.01 && record.predixcan_eqtl_fdr > 0) {
          return parseFloat(record.predixcan_eqtl_fdr).toExponential(4);
        } else if (
          record.predixcan_eqtl_fdr > -0.01 &&
          record.predixcan_eqtl_fdr < 0
        ) {
          return parseFloat(record.predixcan_eqtl_fdr).toExponential(4);
        } else {
          if (record.predixcan_eqtl_fdr) {
            return record.predixcan_eqtl_fdr.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>
          PrediXcan sQTL Beta
        </strong>
      ),
      key: 'predixcan_sqtl_effect_size',
      dataIndex: 'predixcan_sqtl_effect_size',
      ellipsis: true,
      // width: 400,
      width: 170,
      search: false,
      render: (text, record, index) => {
        if (
          record.predixcan_sqtl_effect_size < 0.01 &&
          record.predixcan_sqtl_effect_size > 0
        ) {
          return parseFloat(record.predixcan_sqtl_effect_size).toExponential(4);
        } else if (
          record.predixcan_sqtl_effect_size > -0.01 &&
          record.predixcan_sqtl_effect_size < 0
        ) {
          return parseFloat(record.predixcan_sqtl_effect_size).toExponential(4);
        } else {
          if (record.predixcan_sqtl_effect_size) {
            return record.predixcan_sqtl_effect_size.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>PrediXcan sQTL Z</strong>
      ),
      key: 'predixcan_sqtl_zscore',
      dataIndex: 'predixcan_sqtl_zscore',
      ellipsis: true,
      // width: 400,
      width: 150,
      search: false,
      render: (text, record, index) => {
        if (
          record.predixcan_sqtl_zscore < 0.01 &&
          record.predixcan_sqtl_zscore > 0
        ) {
          return parseFloat(record.predixcan_sqtl_zscore).toExponential(4);
        } else if (
          record.predixcan_sqtl_zscore > -0.01 &&
          record.predixcan_sqtl_zscore < 0
        ) {
          return parseFloat(record.predixcan_sqtl_zscore).toExponential(4);
        } else {
          if (record.predixcan_sqtl_zscore) {
            return record.predixcan_sqtl_zscore.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>PrediXcan sQTL P</strong>
      ),
      key: 'predixcan_sqtl_pvalue',
      dataIndex: 'predixcan_sqtl_pvalue',
      ellipsis: true,
      // width: 400,
      width: 150,
      search: false,
      render: (text, record, index) => {
        if (
          record.predixcan_sqtl_pvalue < 0.01 &&
          record.predixcan_sqtl_pvalue > 0
        ) {
          return parseFloat(record.predixcan_sqtl_pvalue).toExponential(4);
        } else if (
          record.predixcan_sqtl_pvalue > -0.01 &&
          record.predixcan_sqtl_pvalue < 0
        ) {
          return parseFloat(record.predixcan_sqtl_pvalue).toExponential(4);
        } else {
          if (record.predixcan_sqtl_pvalue) {
            return record.predixcan_sqtl_pvalue.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
    {
      title: (
        <strong style={{ fontFamily: 'sans-serif' }}>PrediXcan sQTL FDR</strong>
      ),
      key: 'predixcan_sqtl_fdr',
      dataIndex: 'predixcan_sqtl_fdr',
      ellipsis: true,
      search: false,
      width: 170,
      render: (text, record, index) => {
        if (record.predixcan_sqtl_fdr < 0.01 && record.predixcan_sqtl_fdr > 0) {
          return parseFloat(record.predixcan_sqtl_fdr).toExponential(4);
        } else if (
          record.predixcan_sqtl_fdr > -0.01 &&
          record.predixcan_sqtl_fdr < 0
        ) {
          return parseFloat(record.predixcan_sqtl_fdr).toExponential(4);
        } else {
          if (record.predixcan_sqtl_fdr) {
            return record.predixcan_sqtl_fdr.toFixed(4);
          } else {
            return null;
          }
        }
      },
    },
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
              <a href={URL_PREFIX + '/traitoverview'}>
                <strong style={{ fontFamily: 'sans-serif' }}>
                  Trait Overview
                </strong>
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href={URL_PREFIX + '/trait/' + trait}>
                <strong style={{ fontFamily: 'sans-serif' }}>{trait}</strong>
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">
                <strong style={{ fontFamily: 'sans-serif' }}>TWAS</strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Title level={2}>
          The TWAS results for <span style={{ color: '#F15412' }}>{trait}</span>
        </Title>
      </Row>
      <Divider />
      <Row>
        <Col md={24}>
          <ProTable
            dataSource={twas}
            loading={loading}
            columns={columns}
            scroll={{ x: 2200 }}
            bordered={true}
            options={false}
            rowKey={(record: any) => {
              return record.id.toString() + 'table';
            }}
            pagination={{
              pageSize: 10,
              total: total,
              showQuickJumper: true,
              showSizeChanger: false,
              onChange: (page) => {
                setPageindex(page - 1);
                setLoading(true);
                console.log(page);
                getRemoteTwas({
                  pageSize: pagesize,
                  pageIndex: page - 1,
                  trait: trait,
                  tissue: keyword.tissue,
                  gene: keyword.gene,
                }).then((res) => {
                  // console.log(res);
                  setTwas(res.data);
                  setTotal(res.meta.total);
                  setLoading(false);
                });
              },
            }}
            search={{
              defaultCollapsed: false,
              labelWidth: 100,
              searchText: 'Search',
              resetText: 'Reset',
              collapseRender: false,
              collapsed: false,
            }}
            onSubmit={async () => {
              setLoading(true);
              const res = await getRemoteTwas({
                pageSize: 10,
                pageIndex: 0,
                trait: trait,
                tissue: keyword.tissue,
                gene: keyword.gene,
              });
              if (res.data) {
                setLoading(false);
                setTwas(res.data);
                setTotal(res.meta.total);
              }
            }}
            onReset={async () => {
              setLoading(true);
              const res = await getRemoteTwas({
                pageSize: 10,
                pageIndex: 0,
                trait: trait,
                tissue: undefined,
                gene: undefined,
              });
              if (res.data) {
                setTwas(res.data);
                setLoading(false);
                setTotal(res.meta.total);
                setKeyword({});
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
                        'trait',
                        'tissue',
                        'gene',
                        'gene_name',
                        'jti_effect_size',
                        'jti_zscore',
                        'jti_pvalue',
                        'jti_fdr',
                        'utmost_effect_size',
                        'utmost_zscore',
                        'utmost_pvalue',
                        'utmost_fdr',
                        'predixcan_eqtl_effect_size',
                        'predixcan_eqtl_zscore',
                        'predixcan_eqtl_pvalue',
                        'predixcan_eqtl_fdr',
                        'predixcan_sqtl_effect_size',
                        'predixcan_sqtl_zscore',
                        'predixcan_sqtl_pvalue',
                        'predixcan_sqtl_fdr',
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
                        'Brain_Catalog_TWAS.csv',
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
