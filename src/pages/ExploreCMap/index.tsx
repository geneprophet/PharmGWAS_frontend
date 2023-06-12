import React, { useEffect, useState } from "react";
import styles from './index.less';
import { Breadcrumb, Col, Divider, Row } from "antd";
import { URL_PREFIX ,uniqueArray} from '@/common/constants';
//http://127.0.0.1:8000/pharmgwas/explore/CARDIoGRAMplusC4D__28209224__Coronary_Artery_Disease/Artery_Coronary/abiraterone
export default function Page(props:any) {
  const [dataset,setDataset] = useState(undefined);
  const [tissue,setTissue] = useState(undefined);
  const [cmapname,setCmapname] = useState(undefined);

  useEffect(() => {
    console.log(props.match.params);
    setDataset(props.match.params.dataset);
    setTissue(props.match.params.tissue);
    setCmapname(props.match.params.cmapname);
  }, [props]);

  return (
    <div>
      <h1 className={styles.title}>Page Explore/{dataset}/{tissue}/{cmapname}</h1>
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
              <a href="">
                <strong style={{ fontFamily: 'sans-serif' }}>
                  {dataset}
                </strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
    </div>
  );
}
