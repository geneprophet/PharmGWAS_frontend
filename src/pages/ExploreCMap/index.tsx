import React, { useEffect, useState } from "react";
import styles from './index.less';
import { Breadcrumb, Col, Descriptions, Divider, List, Row, Typography, Image, Spin, Space, Anchor } from "antd";
import { URL_PREFIX ,uniqueArray,IMG_PREFIX} from '@/common/constants';
import { getRemoteDataset } from "@/pages/DatasetOverview/service";
import { getRemoteCMapResult } from "@/pages/DatasetResult/service";
import { getRemoteCMap } from "@/pages/CMapOverview/service";
import notapplied from '@/assets/notapplied.png';
import Radar from "@/components/Radar";
import Bar from '@/components/Bar';
import Venn from '@/components/Venn';
import {
  getRemoteCmapZscoreDown,
  getRemoteCmapZscoreUp, getRemoteCompound,
  getRemoteSpredixcanDown,
  getRemoteSpredixcanUP
} from "@/pages/ExploreCMap/service";
import classnames from "classnames";
const { Title, Text, Paragraph } = Typography;
const { Link } = Anchor;
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
        setLoading(false);
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
        keyword:undefined,
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

  const [spredixcanup, setSpredixcanup] = useState([]);
  const [spredixcandown, setSpredixcandown] = useState([]);
  useEffect(()=>{
    if (dataset){
      getRemoteSpredixcanUP({
        pageSize: 100,
        pageIndex: 1,
        dataset:  keywords.dataset,
        tissue:keywords.tissue,
        sort_field: undefined,
        sort_direction: undefined
      }).then((res)=>{
        setSpredixcanup(res.data);
      })
    }
  },[dataset]);
  useEffect(()=>{
    if (dataset){
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
  },[dataset]);

  const [bardata1, setBardata1] = useState({});
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

  const [cmapzscoreup, setCmapzscoreup] = useState([]);
  const [cmapzscoredown, setCmapzscoredown] = useState([]);

  useEffect(()=>{
    if (cmapsignatures){
      getRemoteCmapZscoreUp({
        pageSize: 100,
        pageIndex: 1,
        sig_id: undefined,
        sig_index: cmapsignatures.sig_index,
        sort_field:undefined,
        sort_direction:undefined
      }).then((res)=>{
        setCmapzscoreup(res.data);
      })
    }
  },[cmapsignatures]);
  useEffect(()=>{
    if (cmapsignatures){
      getRemoteCmapZscoreDown({
        pageSize: 100,
        pageIndex: 1,
        sig_id: undefined,
        sig_index: cmapsignatures.sig_index,
        sort_field:undefined,
        sort_direction:undefined
      }).then((res)=>{
        setCmapzscoredown(res.data);
      })
    }
  },[cmapsignatures]);

  const [bardata2, setBardata2] = useState({});
  useEffect(()=>{
    if (cmapzscoreup.length > 0 && cmapzscoredown.length > 0){
      const gene_name_list_up = [];
      const zscore_list_up = [];
      const gene_name_list_down = [];
      const zscore_list_down = [];
      cmapzscoreup.map((item) =>{
        gene_name_list_up.push(item.gene_name);
        zscore_list_up.push(item.modz);
      });
      cmapzscoredown.map((item) =>{
        gene_name_list_down.push(item.gene_name);
        zscore_list_down.push(item.modz);
      });
      const min = Math.min(...zscore_list_down);
      const max = Math.max(...zscore_list_up);
      setBardata2({
        title:"Drug-inducted Up/Down regulated genes",
        yAxis:"CMap Moderated Z-score",
        min:min,
        max:max,
        gene_name_list_up:gene_name_list_up,
        zscore_list_up:zscore_list_up,
        gene_name_list_down:gene_name_list_down,
        zscore_list_down:zscore_list_down,
      });
    }
  },[cmapzscoreup,cmapzscoredown]);

  const [venndata1,setVenndata1] = useState({});
  useEffect(()=>{
      if(spredixcanup.length > 0 && cmapzscoredown.length > 0){
        const gene_name_list1 = new Set();
        spredixcanup.map((item) =>{
          gene_name_list1.add(item.gene_name);
        });
        const gene_name_list2 = new Set();
        cmapzscoredown.map((item) =>{
          gene_name_list2.add(item.gene_name);
        });
        let intersect = new Set([...gene_name_list1].filter(x => gene_name_list2.has(x)));
        let str = "Overlapping  Genes: "
        intersect.forEach((x)=>{
          str=str+x+", ";
        });
        setVenndata1({
          title:"S-PrediXcan Up Genes Intersect with CMap Down Genes",
          subtitle:str,
          series: [{
            type: 'venn',
            name: '',
            data: [{
              sets: ['S-PrediXcan Up Genes'],
              value: 50,
              color: '#BE5A83',
            }, {
              sets: ['CMap Down Genes'],
              value: 50,
              color: '#6C9BCF',
            },{
              sets: ['S-PrediXcan Up Genes', 'CMap Down Genes'],
              value: intersect.size,
              name: 'Intersection',
              color: "#A0C49D"
            }]
          }],
        });
      }
  },[spredixcanup,cmapzscoredown]);
  const [venndata2,setVenndata2] = useState({});
  useEffect(()=>{
    if(cmapzscoreup.length > 0 && spredixcandown.length > 0){
      const gene_name_list1 = new Set();
      cmapzscoreup.map((item) =>{
        gene_name_list1.add(item.gene_name);
      });
      const gene_name_list2 = new Set();
      spredixcandown.map((item) =>{
        gene_name_list2.add(item.gene_name);
      });
      let intersect = new Set([...gene_name_list1].filter(x => gene_name_list2.has(x)));
      let str = "Overlapping Genes: "
      intersect.forEach((x)=>{
        str=str+x+", ";
      });
      setVenndata2({
        title:"S-PrediXcan Down Genes Intersect with CMap Up Genes",
        subtitle:str,
        series: [{
          type: 'venn',
          name: '',
          data: [{
            sets: ['S-PrediXcan Down Genes'],
            value: 50,
            color: '#6C9BCF',
          }, {
            sets: ['CMap Up Genes'],
            value: 50,
            color: '#BE5A83',
          },{
            sets: ['S-PrediXcan Down Genes', 'CMap Up Genes'],
            value: intersect.size,
            name: 'Intersection',
            color: "#A0C49D"
          }]
        }],
      });
    }
  },[spredixcandown,cmapzscoreup]);

  const [listdata, setListdata] = useState([]);

  useEffect(()=>{
    if (cmapresult){
      let a = [];
      a.push(cmapresult.wtcs);
      a.push(cmapresult.xsum);
      a.push(cmapresult.xsum_pvalue);
      a.push(cmapresult.css);
      a.push(cmapresult.css_pvalue);
      a.push(cmapresult.spearman);
      a.push(cmapresult.pearson);
      a.push(cmapresult.cosine);
      a.push(cmapresult.meta_score);
      // console.log(a);
      setListdata(a);
    }
  },[cmapresult])
  const [current, setCurrent] = useState('');
  const onChange = (link: string) => {
    // console.log('Anchor:OnChange', link);
    setCurrent(link);
  };
  const [targetOffset, setTargetOffset] = useState<number | undefined>(
    undefined,
  );
  useEffect(() => {
    setTargetOffset(window.innerHeight / 10);
  }, []);

  const [compound, setCompound] = useState(undefined);
  useEffect(()=>{
    if (cmapresult){
      if (cmapresult.cmap_name == "lisofylline"){
        getRemoteCompound({input:'name',value:cmapresult.cmap_name,operation:'description'}).then((res)=>{
          console.log(res);
          setCompound(res.InformationList.Information[1].Description);
        }).catch((res)=>{
          setCompound("Sorry, can not retrieve the description from PubChem successfully");
        })
      }else if (cmapresult.inchi_key != ""){
        getRemoteCompound({input:'inchikey',value:cmapresult.inchi_key,operation:'description'}).then((res)=>{
          console.log(res);
          setCompound(res.InformationList.Information[1].Description);
        }).catch((res)=>{
          setCompound("Sorry, can not retrieve the description from PubChem successfully");
        })
      }else {
        getRemoteCompound({input:'name',value:cmapresult.cmap_name,operation:'description'}).then((res)=>{
          console.log(res);
          setCompound(res.InformationList.Information[1].Description);
        }).catch((res)=>{
          setCompound("Sorry, can not retrieve the description from PubChem successfully");
        })
      }
    }
  },[cmapresult]);

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
              <a href={URL_PREFIX +"/datasetoverview/all"}>
                <strong style={{ fontFamily: 'sans-serif' }}>
                  GWAS Datasets
                </strong>
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href={URL_PREFIX + "/datasetresult/" + dataset?.dataset}>
                <strong style={{ fontFamily: 'sans-serif' }}>
                  {dataset?.dataset}
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
      <Row style={{display:loading ? "flex" : "none"}} justify={'center'}>
        <Col md={2}>
          <Spin size={"large"}/>
        </Col>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Title level={2}>
          CMap Result ID: <span style={{ color: '#F15412' }}>{'PCMAP'+cmapresult?.id.toString().padStart(10,'0')}</span>
        </Title>
      </Row>
      <Divider/>
      <Row justify={'space-around'}>
        <Col xs={3} sm={3} md={3}>
          <Anchor affix={true} targetOffset={targetOffset} onChange={onChange}>
            <Link href="#meta" title="1. Meta"></Link>
            <Link href="#overview" title="2. Overview"></Link>
            <Link href="#gsea" title="3. GSEA Plots"></Link>
            <Link href="#intersection" title="4. Reverse Intersection"></Link>
            <Link href="#zscores" title="5. Z-scores"></Link>
          </Anchor>
        </Col>
        <Col
            xs={21}
            sm={21}
            md={20}
            lg={21}
          >
          <div id={"meta"}>
            <Row justify={'center'} >
              <Col md={24}>
                <Descriptions title={"Meta Information (For more details, click on the CMap Name or InChiKey)"} bordered={true} >
                  <Descriptions.Item label="Trait Name">{dataset?.trait}</Descriptions.Item>
                  <Descriptions.Item label="Dataset Name">{dataset?.dataset}</Descriptions.Item>
                  <Descriptions.Item label="Tissue">{cmapresult?.tissue.replace("_"," ")}</Descriptions.Item>
                  <Descriptions.Item label="CMap Name"><a href={"https://pubchem.ncbi.nlm.nih.gov/#query="+cmapsignatures?.cmap_name} target={"_blank"}>{cmapsignatures?.cmap_name}</a></Descriptions.Item>
                  <Descriptions.Item label="CMap Signature ID">{cmapsignatures?.sig_id}</Descriptions.Item>
                  <Descriptions.Item label="InChiKey"><a href={"https://pubchem.ncbi.nlm.nih.gov/#query="+cmapsignatures?.inchi_key} target={"_blank"}>{cmapsignatures?.inchi_key}</a></Descriptions.Item>
                  <Descriptions.Item label="Cell Line">{cmapsignatures?.cell_iname}</Descriptions.Item>
                  <Descriptions.Item label="Dose">{cmapsignatures?.pert_idose}</Descriptions.Item>
                  <Descriptions.Item label="Time">{cmapsignatures?.pert_itime}</Descriptions.Item>
                  <Descriptions.Item label="Compound Summary">{compound}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </div>
          <Divider/>
          <div id={'overview'}>
            <Row justify={"center"}>
              {/*<Col md={5} style={{display:"none"}}>*/}
              {/*  <List*/}
              {/*    header={<Title level={4}>Detail</Title>}*/}
              {/*    // footer={<div>Footer</div>}*/}
              {/*    bordered*/}
              {/*    dataSource={listdata}*/}
              {/*    renderItem={(item) => (*/}
              {/*      <List.Item>*/}
              {/*        <Typography.Text mark>[ITEM]</Typography.Text> {item}*/}
              {/*      </List.Item>*/}
              {/*    )}*/}
              {/*  />*/}
              {/*</Col>*/}
              <Col md={24}>
                <Row justify={'center'}>
                  <Title level={2} >
                    Overview of the reuslts from six connectivity methods
                  </Title>
                </Row>
                <Row justify={'center'}>
                  <Col md={12}>
                    <Radar data={cmapresult} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <Divider/>
          <div id={'gsea'}>
            <Row justify={'center'}>
              <Title level={2}>
                GSEA of disease up and down regulated genes in the pre-ranked gene list of CMap signature
              </Title>
            </Row>
            <Row justify={'center'}>
              <Col md={12} style={{textAlign:'center'}}>
                <Title level={4}>S-PrediXcan Up regulated genes (ES:{cmapresult?.es_up.toFixed(4)}, p-adjust:{cmapresult?.es_up_padj.toExponential(4)})</Title>
                <Image
                  preview={false}
                  fallback={notapplied}
                  src={IMG_PREFIX + keywords?.dataset + '/' +  keywords?.tissue + '/gsea/' + 'signature_' + keywords?.sig_index + '__spredixcan_up_gene.jpg'}
                />
              </Col>
              <Col md={12} style={{textAlign:'center'}}>
                <Title level={4}>S-PrediXcan Down regulated genes (ES: {cmapresult?.es_down.toFixed(4)}, p-adjust: {cmapresult?.es_down_padj.toExponential(4)})</Title>
                <Image
                  // width={200}
                  preview={false}
                  fallback={notapplied}
                  src={IMG_PREFIX + keywords?.dataset + '/' +  keywords?.tissue + '/gsea/' + 'signature_' + keywords?.sig_index + '__spredixcan_down_gene.jpg'}
                />
              </Col>
            </Row>
          </div>
          <Divider/>
          <div id={'intersection'}>
            <Row justify={'center'} >
              <Title level={2} style={{ marginTop: '15px'}}>
                Reverse intersection analysis of up and down regulated genes of disease and drug
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
          </div>
          <Divider/>
          <div id={'zscores'}>
            <Row justify={'center'}>
              <Title level={2}>
                Z-scores of up and down regulated genes of disease and drug
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
          </div>
        </Col>
      </Row>

      <Divider/>
    </div>
  );
}
