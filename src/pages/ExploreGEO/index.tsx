import React, { useEffect, useState } from "react";
import styles from './index.less';
import { Breadcrumb, Col, Row, Typography } from "antd";
const { Title, Text, Paragraph } = Typography;
import { URL_PREFIX ,uniqueArray,IMG_PREFIX} from '@/common/constants';
import notapplied from '@/assets/notapplied.png';
import { getRemoteDataset } from "@/pages/DatasetOverview/service";
import { getRemoteCMapResult, getRemoteGEOResult } from "@/pages/DatasetResult/service";
import { getRemoteCMap } from "@/pages/CMapOverview/service";
import { getRemoteGEO } from "@/pages/GEOOverview/service";
export default function Page(props:any) {
  interface SearchKeywords {
    dataset: string | undefined;
    tissue: string | undefined;
    accession:string | undefined;
  };
  const [keywords, setKeywords] = useState<SearchKeywords>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);
  const [dataset, setDataset] = useState(undefined);
  useEffect(() => {
    if (props){
      getRemoteDataset({
        pageSize: pagesize,
        pageIndex: pageindex,
        keyword: undefined,
        trait:undefined,
        pmid:undefined,
        dataset: props.match.params.dataset,
        sort_field:undefined,
        sort_direction:undefined
      }).then((res) => {
        setDataset(res.data[0]);
        setKeywords({dataset:props.match.params.dataset,tissue:props.match.params.tissue,accession:props.match.params.accession})
      });
    }
  }, [props]);

  const [georesult, setGeoresult] = useState(undefined);
  useEffect(()=>{
    if(dataset){
      getRemoteGEOResult({
        pageSize: pagesize,
        pageIndex: pageindex,
        dataset:  keywords.dataset,
        trait:  undefined,
        tissue:  keywords.tissue,
        accession:keywords.accession,
        sig_index: undefined,
        sort_field: undefined,
        sort_direction: undefined
      }).then((res) => {
        setLoading(false);
        setGeoresult(res.data[0]);
      });
    }
  },[dataset]);

  const [geosignatures, setGeosignatures] = useState(undefined);
  useEffect(()=>{
    if(props){
      getRemoteGEO({
        pageSize: pagesize,
        pageIndex: pageindex,
        accession:  props.match.params.accession,
        series_id:  undefined,
        description:  undefined,
        sort_field: undefined,
        sort_direction: undefined
      }).then((res) => {
        setGeosignatures(res.data[0]);
      });
    }
  },[props]);



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
              <a href="/datasetoverview/all">
                <strong style={{ fontFamily: 'sans-serif' }}>
                  GWAS Datasets
                </strong>
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href={URL_PREFIX + "/datasetresult/" + dataset?.dataset}>
                <strong style={{ fontFamily: 'sans-serif' }}>
                  {dataset?.datasetid}
                </strong>
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">
                <strong style={{ fontFamily: 'sans-serif' }}>
                  {'PGEO'+georesult?.id.toString().padStart(10,'0')}
                </strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
    </div>
  );
}
