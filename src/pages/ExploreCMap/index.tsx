import React, { useEffect, useState } from "react";
import styles from './index.less';
import { Breadcrumb, Col, Descriptions, Divider, Row, Typography, Image } from "antd";
import { URL_PREFIX ,uniqueArray,IMG_PREFIX} from '@/common/constants';
import { getRemoteDataset } from "@/pages/DatasetOverview/service";
import { getRemoteCMapResult } from "@/pages/DatasetResult/service";
import { getRemoteCMap } from "@/pages/CMapOverview/service";
import notapplied from '@/assets/notapplied.png';
import Radar from "@/components/Radar";
const { Title, Text, Paragraph } = Typography;
//http://127.0.0.1:8000/pharmgwas/explore/CARDIoGRAMplusC4D__28209224__Coronary_Artery_Disease/Artery_Coronary/abiraterone
export default function Page(props:any) {
  interface SearchKeywords {
    dataset: string | undefined;
    datasetid: number | undefined;
    tissue: string | undefined;
    sig_index:string | undefined;
  };
  const [keywords, setKeywords] = useState<SearchKeywords>({});
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
        setKeywords({dataset:props.match.params.dataset,datasetid:res.data[0].id,tissue:props.match.params.tissue,sig_index:props.match.params.sig_index})
      });
    }
  }, [props]);

  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

  const [cmapresult, setCmapresult] = useState(undefined);
  useEffect(()=>{
    if(dataset){
      getRemoteCMapResult({
        pageSize: pagesize,
        pageIndex: pageindex,
        dataset:  keywords.dataset,
        datasetid:  keywords.datasetid,
        tissue:  keywords.tissue,
        cmap_name:undefined,
        sig_index:  keywords.sig_index,
        sort_field: undefined,
        sort_direction: undefined
      }).then((res) => {
        setCmapresult(res.data[0]);
      });
    }
  },[dataset]);

  const [cmapsignatures, setCmapsignatures] = useState(undefined);
  useEffect(()=>{
    if(props){
      getRemoteCMap({
        pageSize: pagesize,
        pageIndex: pageindex,
        pert_id:  undefined,
        sig_id:  undefined,
        sig_index:  props.match.params.sig_index,
        cmap_name:  undefined,
        cell_iname: undefined,
        pert_idose:  undefined,
        pert_itime:  undefined,
        sort_field: undefined,
        sort_direction: undefined
      }).then((res) => {
        setCmapsignatures(res.data[0]);
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
              <a href="/datasetoverview">
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
                  {'PCMAP'+cmapresult?.id.toString().padStart(10,'0')}
                </strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Title level={2}>
          CMap Result ID: <span style={{ color: '#F15412' }}>{'PCMAP'+cmapresult?.id.toString().padStart(10,'0')}</span>
        </Title>
        <Col md={22}>
          <Descriptions title={"Meta Information"} bordered={true} >
            <Descriptions.Item label="Trait Name">{dataset?.trait}</Descriptions.Item>
            <Descriptions.Item label="Dataset Name">{dataset?.dataset}</Descriptions.Item>
            <Descriptions.Item label="Tissue">{cmapresult?.tissue.replace("_"," ")}</Descriptions.Item>
            <Descriptions.Item label="CMap Name">{cmapsignatures?.cmap_name}</Descriptions.Item>
            <Descriptions.Item label="CMap Signature ID">{cmapsignatures?.sig_id}</Descriptions.Item>
            <Descriptions.Item label="InChiKey">{cmapsignatures?.inchi_key}</Descriptions.Item>
            <Descriptions.Item label="Cell Line">{cmapsignatures?.cell_iname}</Descriptions.Item>
            <Descriptions.Item label="Dose">{cmapsignatures?.pert_idose}</Descriptions.Item>
            <Descriptions.Item label="Time">{cmapsignatures?.pert_itime}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Divider/>
      <Row justify={'center'}>
        <Title level={2}>
          Overview  of the Six Evaluation Methods
        </Title>
      </Row>
      <Row justify={'center'}>
        <Col md={12}>
          <Radar data={cmapresult} />
        </Col>
      </Row>
      <Divider/>
      <Row justify={'center'}>
        <Title level={2}>
          GSEA of disease up/down regulated genes in the pre-ranked list of CMap signature
        </Title>
      </Row>
      <Row justify={'center'}>
        <Col md={12} style={{textAlign:'center'}}>
          <Image
            // width={200}
            preview={false}
            fallback={notapplied}
            src={IMG_PREFIX + keywords?.dataset + '/' +  keywords?.tissue + '/gsea/' + 'signature_' + keywords?.sig_index + '__spredixcan_up_gene.jpg'}
          />
        </Col>
        <Col md={12} style={{textAlign:'center'}}>
          <Image
            // width={200}
            preview={false}
            fallback={notapplied}
            src={IMG_PREFIX + keywords?.dataset + '/' +  keywords?.tissue + '/gsea/' + 'signature_' + keywords?.sig_index + '__spredixcan_down_gene.jpg'}
          />
        </Col>
      </Row>
      <Divider/>

      <Row>

      </Row>
    </div>
  );
}
