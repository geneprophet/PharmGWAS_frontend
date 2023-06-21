import React, { useEffect, useState } from "react";
import styles from './index.less';
import { Breadcrumb, Col, Descriptions, Divider, Image, Row, Typography } from "antd";
const { Title, Text, Paragraph } = Typography;
import { URL_PREFIX ,uniqueArray,IMG_PREFIX} from '@/common/constants';
import notapplied from '@/assets/notapplied.png';
import { getRemoteDataset } from "@/pages/DatasetOverview/service";
import { getRemoteCMapResult, getRemoteGEOResult } from "@/pages/DatasetResult/service";
import { getRemoteCMap } from "@/pages/CMapOverview/service";
import { getRemoteGEO } from "@/pages/GEOOverview/service";
import {
  getRemoteCmapZscoreDown,
  getRemoteCmapZscoreUp,
  getRemoteSpredixcanDown,
  getRemoteSpredixcanUP
} from "@/pages/ExploreCMap/service";
import Radar from "@/components/Radar";
import Bar from "@/components/Bar";
import { getRemoteGEOZscoreDown, getRemoteGEOZscoreUp } from "@/pages/ExploreGEO/service";
import Venn from "@/components/Venn";
export default function Page(props:any) {
  interface SearchKeywords {
    dataset: string | undefined;
    tissue: string | undefined;
    accession:string | undefined;
    sig_index:string | undefined;
  };
  const [keywords, setKeywords] = useState<SearchKeywords>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [pageindex, setPageindex] = useState(1);

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
        setKeywords({dataset:props.match.params.dataset,tissue:props.match.params.tissue,accession:props.match.params.accession,sig_index:res.data[0].sig_index})
      });
    }
  },[props]);

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
      });
    }
  }, [props]);

  const [georesult, setGeoresult] = useState(undefined);
  useEffect(()=>{
    if(geosignatures){
      getRemoteGEOResult({
        pageSize: pagesize,
        pageIndex: pageindex,
        dataset: keywords.dataset,
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
  },[geosignatures]);

  const [spredixcanup, setSpredixcanup] = useState([]);
  const [spredixcandown, setSpredixcandown] = useState([]);
  useEffect(()=>{
    if (geosignatures){
      getRemoteSpredixcanUP({
        pageSize: 100,
        pageIndex: 1,
        dataset: keywords.dataset,
        tissue: keywords.tissue,
        sort_field: undefined,
        sort_direction: undefined
      }).then((res)=>{
        setSpredixcanup(res.data);
      })
    }
  },[geosignatures]);
  useEffect(()=>{
    if (geosignatures){
      getRemoteSpredixcanDown({
        pageSize: 100,
        pageIndex: 1,
        dataset:  keywords.dataset,
        tissue:keywords.tissue,
        sort_field: undefined,
        sort_direction: undefined
      }).then((res)=>{
        setSpredixcandown(res.data);
      })
    }
  },[geosignatures]);
  const [bardata1, setBardata1] = useState({});

  const [geozscoreup, setGeozscoreup] = useState([]);
  const [geozscoredown, setGeozscoredown] = useState([]);
  useEffect(()=>{
    if (spredixcanup.length > 0 && spredixcandown.length > 0){
      const gene_name_list_up = [];
      const zscore_list_up = [];
      const gene_name_list_down = [];
      const zscore_list_down = [];
      spredixcanup.map((item) =>{
        gene_name_list_up.push(item.gene_name);
        zscore_list_up.push(item.zscore);
      });
      spredixcandown.map((item) =>{
        gene_name_list_down.push(item.gene_name);
        zscore_list_down.push(item.zscore);
      });
      const min = Math.min(...zscore_list_down);
      const max = Math.max(...zscore_list_up);
      setBardata1({
        title:"S-PrediXcan Up/Down regulated genes",
        yAxis:"S-PrediXcan Z-score",
        min:min,
        max:max,
        gene_name_list_up:gene_name_list_up,
        zscore_list_up:zscore_list_up,
        gene_name_list_down:gene_name_list_down,
        zscore_list_down:zscore_list_down,
      });
    }
  },[spredixcanup,spredixcandown]);
  useEffect(()=>{
    if (geosignatures){
      getRemoteGEOZscoreUp({
        pageSize: 100,
        pageIndex: 1,
        accession: geosignatures.accession,
        sig_index: undefined,
        sort_field:undefined,
        sort_direction:undefined
      }).then((res)=>{
        setGeozscoreup(res.data);
      })
    }
  },[geosignatures]);
  useEffect(()=>{
    if (geosignatures){
      getRemoteGEOZscoreDown({
        pageSize: 100,
        pageIndex: 1,
        accession: geosignatures.accession,
        sig_index:undefined,
        sort_field:undefined,
        sort_direction:undefined
      }).then((res)=>{
        setGeozscoredown(res.data);
      })
    }
  },[geosignatures]);
  const [bardata2, setBardata2] = useState({});
  useEffect(()=>{
    if (geozscoreup.length > 0 && geozscoredown.length > 0){
      const gene_name_list_up = [];
      const zscore_list_up = [];
      const gene_name_list_down = [];
      const zscore_list_down = [];
      geozscoreup.map((item) =>{
        gene_name_list_up.push(item.gene_name);
        zscore_list_up.push(item.zscore);
      });
      geozscoredown.map((item) =>{
        gene_name_list_down.push(item.gene_name);
        zscore_list_down.push(item.zscore);
      });
      const min = Math.min(...zscore_list_down);
      const max = Math.max(...zscore_list_up);
      setBardata2({
        title:"GEO Perturbation Up/Down regulated genes",
        yAxis:"GEO Z-score",
        min:min,
        max:max,
        gene_name_list_up:gene_name_list_up,
        zscore_list_up:zscore_list_up,
        gene_name_list_down:gene_name_list_down,
        zscore_list_down:zscore_list_down,
      });
    }
  },[geozscoreup,geozscoredown]);

  const [venndata1,setVenndata1] = useState({});
  useEffect(()=>{
    if(spredixcanup.length > 0 && geozscoredown.length > 0){
      const gene_name_list1 = new Set();
      spredixcanup.map((item) =>{
        gene_name_list1.add(item.gene_name);
      });
      const gene_name_list2 = new Set();
      geozscoredown.map((item) =>{
        gene_name_list2.add(item.gene_name);
      });
      let intersect = new Set([...gene_name_list1].filter(x => gene_name_list2.has(x)));
      let str = "Intersecting Genes: "
      intersect.forEach((x)=>{
        str=str+x+", ";
      });
      setVenndata1({
        title:"S-PrediXcan Up Genes Intersect with GEO Down Genes",
        subtitle:str,
        series: [{
          type: 'venn',
          name: '',
          data: [{
            sets: ['S-PrediXcan Up Genes'],
            value: 50,
            color: '#BE5A83',
          }, {
            sets: ['GEO Down Genes'],
            value: 50,
            color: '#6C9BCF',
          },{
            sets: ['S-PrediXcan Up Genes', 'GEO Down Genes'],
            value: intersect.size,
            name: 'Intersection',
            color: "#A0C49D"
          }],
        }],
      });
    }
  },[spredixcanup,geozscoredown]);

  const [venndata2,setVenndata2] = useState({});
  useEffect(()=>{
    if(geozscoreup.length > 0 && spredixcandown.length > 0){
      const gene_name_list1 = new Set();
      geozscoreup.map((item) =>{
        gene_name_list1.add(item.gene_name);
      });
      const gene_name_list2 = new Set();
      spredixcandown.map((item) =>{
        gene_name_list2.add(item.gene_name);
      });
      let intersect = new Set([...gene_name_list1].filter(x => gene_name_list2.has(x)));
      let str = "Intersecting Genes: "
      intersect.forEach((x)=>{
        str=str+x+", ";
      });
      setVenndata2({
        title:"S-PrediXcan Down Genes Intersect with GEO Up Genes",
        subtitle:str,
        series: [{
          type: 'venn',
          name: '',
          data: [{
            sets: ['S-PrediXcan Down Genes'],
            value: 50,
            color: '#6C9BCF',
          }, {
            sets: ['GEO Up Genes'],
            value: 50,
            color: '#BE5A83',
          },{
            sets: ['S-PrediXcan Down Genes', 'GEO Up Genes'],
            value: intersect.size,
            name: 'Intersection',
            color: "#A0C49D"
          }],
        }],
      });
    }
  },[spredixcandown,geozscoreup]);

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
      <Divider/>
      <Row justify={'center'} >
        <Title level={2}>
          GEO Result ID: <span style={{ color: '#F15412' }}>{'PGEO'+georesult?.id.toString().padStart(10,'0')}</span>
        </Title>
        <Col md={22}>
          <Descriptions title={"Meta Information"} bordered={true} >
            <Descriptions.Item label="Trait Name">{dataset?.trait}</Descriptions.Item>
            <Descriptions.Item label="Dataset Name">{dataset?.dataset}</Descriptions.Item>
            <Descriptions.Item label="Tissue">{georesult?.tissue.replace("_"," ")}</Descriptions.Item>
            <Descriptions.Item label="GEO Signature">{geosignatures?.accession}</Descriptions.Item>
            <Descriptions.Item label="Signature Description" span={2}>{geosignatures?.description}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Divider/>
      <Row justify={'center'}>
        <Title level={2} >
          Overview  of the Six Evaluation Methods
        </Title>
      </Row>
      <Row justify={'center'}>
        <Col md={12}>
          <Radar data={georesult} />
        </Col>
      </Row>
      <Divider/>
      <Row justify={'center'}>
        <Title level={2}>
          GSEA of disease up/down regulated genes in the pre-ranked list of GEO signature
        </Title>
      </Row>
      <Row justify={'center'}>
        <Col md={12} style={{textAlign:'center'}}>
          <Image
            preview={false}
            fallback={notapplied}
            src={IMG_PREFIX + "GEO/" + keywords?.dataset + '/' +  keywords?.tissue + '/gsea/' + 'signature_' + keywords?.sig_index + '__spredixcan_up_gene.jpg'}
          />
        </Col>
        <Col md={12} style={{textAlign:'center'}}>
          <Image
            // width={200}
            preview={false}
            fallback={notapplied}
            src={IMG_PREFIX + "GEO/" + keywords?.dataset + '/' +  keywords?.tissue + '/gsea/' + 'signature_' + keywords?.sig_index + '__spredixcan_down_gene.jpg'}
          />
        </Col>
      </Row>
      <Divider/>
      <Row justify={'center'}>
        <Title level={2}>
          Reverse Intersection Analysis
        </Title>
      </Row>
      <Row justify={'center'}>
        <Col md={12}>
          <Venn data={venndata1}/>
        </Col>
        <Col md={12}>
          <Venn data={venndata2}/>
        </Col>
      </Row>
      <Divider/>
      <Row justify={'center'}>
        <Title level={2}>
          Details of Extreme Regulated Genes
        </Title>
      </Row>
      <Row justify={'center'}>
        <Col md={12}>
          <Bar data={bardata1}/>
        </Col>
        <Col md={12}>
          <Bar data={bardata2}/>
        </Col>
      </Row>
      <Divider/>
    </div>
  );
}
