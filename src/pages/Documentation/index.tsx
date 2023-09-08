import React, { useEffect, useState } from "react";
import styles from './index.less';
import { Breadcrumb, Col, Table,Divider,Image, Row,Typography ,Anchor} from "antd";
// @ts-ignore
import { URL_PREFIX } from '@/common/constants';
import classnames from 'classnames';
const { Title, Text, Paragraph } = Typography;
const { Link } = Anchor;
import overview from '@/assets/overview.png';
import wtcs from '@/assets/wtcs.png';
import css from '@/assets/css.png';
import xsum from '@/assets/xsum.png';
import usage_1 from '@/assets/usage_1.png';
import usage_2 from '@/assets/usage_2.png';
import usage_3 from '@/assets/usage_3.png';
import usage_4 from '@/assets/usage_4.png';
import usage_5 from '@/assets/usage_5.png';
import usage_6 from '@/assets/usage_6.png';
import usage_7 from '@/assets/usage_7.png';
import usage_8 from '@/assets/usage_8.png';
import usage_9 from '@/assets/usage_9.png';
import usage_10 from '@/assets/usage_10.png';
import usage_11 from '@/assets/usage_11.png';
export default function Page() {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(
    undefined,
  );
  useEffect(() => {
    setTargetOffset(window.innerHeight / 10);
  }, []);
  const [current, setCurrent] = useState('');
  const onChange = (link: string) => {
    console.log('Anchor:OnChange', link);
    setCurrent(link);
    // console.log(current);
  };
  const dataSource = [
    {
      key: '1',
      source: 'GWAS Catalog',
      fullsource: 'GWAS Catalog',
      url: 'https://www.ebi.ac.uk/gwas/home',
    },
    {
      key: '2',
      source: 'UKBB',
      fullsource: 'UK BioBank',
      url: 'http://www.nealelab.is/uk-biobank',
    },
    {
      key: '3',
      source: 'CARDIoGRAMplusC4D',
      fullsource: 'Coronary ARtery DIsease Genome wide Replication and Meta-analysis (CARDIoGRAM) plus The Coronary Artery Disease (C4D) Genetics',
      url: 'http://www.cardiogramplusc4d.org/data-downloads/',
    },
    {
      key: '4',
      source: 'CDKP/ISGC',
      fullsource: 'Cerebrovascular Disease Knowledge portal/International Stroke Genetics Consortium',
      url: 'https://cd.hugeamp.org/downloads.html',
    },
    {
      key: '5',
      source: 'CMDKP',
      fullsource: 'Common Metabolic Diseases Knowledge portal',
      url: 'https://hugeamp.org/downloads.html',
    },
    {
      key: '6',
      source: 'CVDKP',
      fullsource: 'Cardiovascular Disease Knowledge portal',
      url: 'https://cvd.hugeamp.org/downloads.html',
    },
    {
      key: '7',
      source: 'RGC',
      fullsource: 'Reproductive Genetics Consortium',
      url: 'http://www.reprogen.org/data_download.html',
    },
    {
      key: '8',
      source: 'PGC',
      fullsource: 'Psychiatric Genomic Consortium',
      url: 'https://www.med.unc.edu/pgc/results-and-downloads',
    },
    {
      key: '9',
      source: 'Sleep Disorder KP',
      fullsource: 'Sleep Disorder Knowledge portal',
      url: 'https://sleep.hugeamp.org/downloads.html',
    },
  ];

  const columns = [
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'Full Source Name',
      dataIndex: 'fullsource',
      key: 'fullsource',
      width:600,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (text: string, record: any) => (
        <a href={record.url} target={'_blank'}>
          {record.url}
        </a>
      )
    },
  ];

  // @ts-ignore
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
                <strong style={{ fontFamily: 'sans-serif' }}>Documentation</strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col xs={4} sm={4} md={4}>
          <Anchor targetOffset={targetOffset} onChange={onChange}>
            <Link href="#introduction" title="1. Introduction"></Link>
            <Link href="#overview" title="2. Overview"></Link>
            <Link href="#collection" title="3. Data Collection"></Link>
            <Link href="#analysis" title="4. Data Analysis"></Link>
            <Link href="#methods" title="5. Methods Used by PharmGWAS">
              <Link
                href="#methods_magma"
                title={
                  <div>
                    <p>5.1 MAGMA</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#methods'),
                })}
              />
              <Link
                href="#methods_dets"
                title={
                  <div>
                    <p>5.2 deTS</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#methods'),
                })}
              />
              <Link
                href="#methods_twas"
                title={
                  <div>
                    <p>5.3 TWAS</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#methods'),
                })}
              />
              <Link
                href="#methods_connectivity"
                title={
                  <div>
                    <p>5.4 Connectivity Methods</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#methods'),
                })}
              />
            </Link>
            <Link href="#usage" title={'6. Database Usage'}>
              <Link
                href="#usage_home"
                title={
                  <div>
                    <p>6.1 Home Page</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#usage'),
                })}
              />
              <Link
                href="#usage_dataset"
                title={
                  <div>
                    <p>6.2 Browse - GWAS Datasets</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#usage'),
                })}
              />
              <Link
                href="#usage_cmap"
                title={
                  <div>
                    <p>6.3 Browse - CMap Signatures</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#usage'),
                })}
              />
              <Link
                href="#usage_geo"
                title={
                  <div>
                    <p>6.4 Browse - GEO Signatures</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#usage'),
                })}
              />
              <Link
                href="#usage_explore"
                title={
                  <div>
                    <p>6.5 CMap and GEO Results</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#usage'),
                })}
              />
              <Link
                href="#usage_detail"
                title={
                  <div>
                    <p>6.6 Detail Page for Disease-Drug Pair</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#usage'),
                })}
              />
            </Link>
            <Link href="#faq" title="7. FAQ"></Link>
          </Anchor>
        </Col>
        <Col
          xs={19}
          sm={19}
          md={19}
          push={1}
          style={{
            fontFamily: 'Trebuchet MS',
            fontSize: '1.1em',
            textAlign: 'justify',
            display: 'inline-block',
          }}
        >
          <div id={'introduction'}>
            <Title level={1}>1. Introduction</Title>
            <Paragraph>
              Development of novel drugs is a daunting and time- and cost-consuming process, which has been obscure in translating scientific discoveries into clinical practices from time to time. To tackle this challenge, drug repurposing has been proposed an attractive alternative approach to identify new clinical indications for existing compounds, such that these drugs can be deployed clinically with greater speed and less expense compared with the de novo drug discovery pipeline. Recently, advances in genome-wide association studies (GWAS) have proven useful for drug repurposing as GWAS reveals important biological insights into complex traits that can assist to identify compounds suitable for repurposing. Although the majority of common variants of GWAS signals have small individual effects on traits, the combined polygenic effect of many such variants is considerably larger and constitutes a significant portion of overall trait heritability.
            </Paragraph>
            <Paragraph>
              Following the concept proposed by the Connectivity Map project, GWAS data can be used to impute the genetically regulated expression (GReX) profile and to compare with the drug-induced gene expression profiles. In this way, the negative correlations between the two profiles indicate that the corresponding drug can reverse the gene expression pattern and can thus serve as a candidate to the corresponding samples. Such analysis strategies have been successfully applied in psychiatric disorders, blood traits, among others, but there is still a lack of systematic and comprehensive knowledgebase for genetically-informed drug repurposing for a wide range of complex diseases.
            </Paragraph>
          </div>
          <div id={'overview'}>
            <Title level={1}>2. Overview</Title>
            <Paragraph>
              PharmGWAS aims to translate GWAS signals into clinical practice. Currently, PharmGWAS contains 1,929 GWAS datasets curated from GWAS Catalog, UKBB, and several large consortiums. Moreover, 720,216 compound-perturbed gene expression signatures were collected from CMap2.0 and an additional 4,269 perturbed signatures were collected from GEO. We implemented our standard pipeline to infer candidate disease-drug pairs for each GWAS dataset. The outline of PharmGWAS is illustrated in Figure 1. Currently, PharmGWAS deposits a total of 732,947 genetically-informed disease-drug pairs derived from CMap signatures and 7,280 pairs from GEO signatures. To the best of our knowledge, PharmGWAS is the first systematic and comprehensive database to identify drug repurposing candidates for nearly all available disease traits.
              {/*PharmGWAS is a knowledgebase for genetically-informed drug repurposing for thousands of complex diseases. It utilizes proof-of-concept approaches to identify drug repurposing candidates by integrating GWAS-imputed transcriptome profiles and drug perturbation data. In the current release, we have collected 1,929 GWAS datasets, 720,216 small compound signatures from the Expanded CMap LINCS Resource 2020 (hereafter referred to as CMap), and 4,269 perturbation signatures from GEO. We implemented six connectivity methods to infer candidate drugs for each complex disease based on their GReX imputed from GWAS results. These methods resulted in 811,457 disease-drug pairs from the CMap and 8,695 from the GEO resources. PharmGWAS thus provides a valuable reference resource for the discovery of new drugs, design of combinatory treatments, and identification of drug resistance and drug side effects.*/}
            </Paragraph>
            <Row justify={'center'}>
                <Image src={overview} preview={false} width={'75%'} />
            </Row>
            <Row justify={'center'}><Text strong={true}>PharmGWAS Overview</Text></Row>
          </div>
          <div id={'collection'}>
            <Title level={1}>3. Data Collection</Title>
            <Paragraph>
              All GWAS datasets used in PharmGWAS were collected from three major sources, which are the GWAS Catalog, UK BioBank (UKBB) and some large consortiums dedicated to diverse diseases (see below).
            </Paragraph>
            <Table dataSource={dataSource} columns={columns} bordered={true} pagination={false} />
            <p/>
            <Paragraph>
              The drug-induced gene expression profiles were retrieved from two sources: the Expanded CMap LINCS Resource 2020 (hereafter referred to as CMap2.0) and the SigCom LINCS resource. For CMap2.0, we downloaded the level 5 data of small molecule compounds along with the metadata including information of compounds, dosage, time, genes, and cell lines. SigCom LINCS is a webserver that provides service to process and analyze over a million gene expression signatures. We downloaded the level 5 data from the SigCom LINCS resource (file name: Automatic Human GEO RNA-seq Signatures; access date: May 29, 2023), which included 4269 signatures that could also be used for connectivity analyses.
              {/*The drug-induced gene expression profiles were retrieved from two sources: the Expanded CMap LINCS Resource 2020 (https://clue.io/data/CMap2020#LINCS2020) and GEO RNA-Seq Signatures downloaded from SigCom LINCS (https://maayanlab.cloud/sigcom-lincs/#/Download).*/}
            </Paragraph>
          </div>
          <div id={'analysis'}>
            <Title level={1}>4. Data Analysis</Title>
            <Paragraph>We constructed a standard pipeline to infer genetically-informed drugs. First, because gene expression data could be quite tissue-specific, we defined disease-associated genes based on the GWAS data and conducted tissue-specific enrichment analysis (TSEA) to identify disease-relevant tissues for TWAS analyses. Second, we conducted TWAS in the predicted tissues and obtained the imputed GReX. Third, we conducted connectivity analyses to infer drug candidates by integrating GWAS-informed signature (GReX) and drug-induced signatures. Finally, we defined candidate disease-drug pairs by combining the results of the six connectivity methods.</Paragraph>
            <Paragraph>The analysis pipeline of GWAS-based drug repurposing contains five major steps. </Paragraph>
            <Paragraph>(1)	To prioritize disease-associated genes by using MAGMA, a gene analysis tool with GWAS summary statistics as input.  </Paragraph>
            <Paragraph>(2)	To infer disease-relevant tissues by the Tissue-Specific Enrichment Analysis (TSEA) using deTS and the disease-associated genes from step (1).  </Paragraph>
            <Paragraph>(3)	To impute GReX in disease-relevant tissues from step (2) using the TWAS method. In this work, we used S-PrediXcan to calculate the gene expression signatures. </Paragraph>
            <Paragraph>(4)	To infer candidate drugs/compounds by implementing the six connectivity methods. These methods identify drugs that show reverse correlation patterns between the disease GReX signatures and the drug-induced signatures, and thus, the drugs are considered effective in targeting on the expression profile. </Paragraph>
            <Paragraph>(5)	Lastly, to define candidate drugs with filter criteria and statistical significance ({'WTCS < 0 and CSS < 0 and CSS P < 0.05 and XSum < 0 and Spearman < 0 and Pearson < 0 and Cosine < 0 '}). </Paragraph>
          </div>
          <div id={'methods'}>
            <Title level={1}>5. Methods Used by PharmGWAS</Title>
            <div id={'methods_magma'}>
              <Title level={2}>
                5.1 MAGMA
              </Title>
              <Paragraph>
                Multi-marker Analysis of GenoMic Annotation (MAGMA v1.10) extracted each SNP p-value from GWAS summary statistics to detect significant association genes combing with linkage disequilibrium (LD) structure.
              </Paragraph>
              <Paragraph>
                URL: <a href={"https://ctg.cncr.nl/software/magma"} target={'_blank'}>https://ctg.cncr.nl/software/magma</a>
              </Paragraph>
            </div>
            <div id={'methods_dets'}>
              <Title level={2}>
                5.2 deTS
              </Title>
              <Paragraph>
                Tissue-Specific Enrichment Analysis (TSEA) was performed by deTS using the output candidate genes from MAGMA as input and top 3 disease-specific tissues were identified by deTS.
              </Paragraph>
              <Paragraph>
                URL: <a href={"https://github.com/bsml320/deTS"} target={'_blank'}>https://github.com/bsml320/deTS</a>
              </Paragraph>
            </div>
            <div id={'methods_twas'}>
              <Title level={2}>
                5.3 TWAS
              </Title>
              <Paragraph>
                Disease-related gene expression signatures were imputed by TWAS method: S-MultiXcan.
              </Paragraph>
              <Paragraph>
                URL: <a href={"https://github.com/hakyimlab/MetaXcan"} target={'_blank'}>https://github.com/hakyimlab/MetaXcan</a>
              </Paragraph>
            </div>
            <div id={'methods_connectivity'}>
              <Title level={2}>
                5.4	Connectivity Methods
              </Title>
              <Paragraph>
                We selected nine connectivity methods according to the following benchmark and review studies:
              </Paragraph>
              <Paragraph>
                <a href={"https://www.ncbi.nlm.nih.gov/pubmed/25606058"} target={"_blank"}>Systematic evaluation of connectivity map for disease indications</a>
              </Paragraph>
              <Paragraph>
                <a href={"https://www.ncbi.nlm.nih.gov/pubmed/31774912"} target={"_blank"}>A comprehensive evaluation of connectivity methods for L1000 data</a>
              </Paragraph>
              <Paragraph>
                <a href={"https://www.ncbi.nlm.nih.gov/pubmed/34013329"} target={"_blank"}>Reconciling multiple connectivity scores for drug repurposing</a>
              </Paragraph>
              <Paragraph>
                <a href={"https://www.ncbi.nlm.nih.gov/pubmed/32484516"} target={"_blank"}>Scoring functions for drug-effect similarity</a>
              </Paragraph>
              <Text style={{ fontSize: 'x-large' }}>5.4.1 WTCS</Text>
              <Paragraph>
                  WTCS: Weighted Connectivity Score
              </Paragraph>
              <Image src={wtcs} preview={false} width={"50%"}/>
              <Paragraph>Where ES is the enrichment score of Gene Set Enrichment Analysis (GSEA).</Paragraph>
              <Text style={{ fontSize: 'x-large' }}>5.4.2 CSS</Text>
              <Paragraph>
                CSS: Connection Strength Score
              </Paragraph>
              <Image src={css} preview={false} width={"50%"}/>
              <Paragraph></Paragraph>
              <Text style={{ fontSize: 'x-large' }}>5.4.3 XSum</Text>
              <Paragraph>
                XSum: The eXtreme Sum score
              </Paragraph>
              <Image src={xsum} preview={false} width={"50%"}/>
              <Paragraph></Paragraph>
              <Text style={{ fontSize: 'x-large' }}>5.4.4 Spearman, Pearson and Cosine</Text>
              <Paragraph>
                Spearman/Pearson correlation coefficients and Cosine correlation using all common genes of the drug and the disease induced expression profiles.
              </Paragraph>
              <Text style={{ fontSize: 'x-large' }}>5.4.5 XSpearman, XPearson and XCosine</Text>
              <Paragraph>
                The three metrics (Spearman, Pearson and Cosine correlation) can also be adapted to just use a fixed number of ‘extreme’ genes that are most upregulated or downregulated by the disease. XPearson is the extreme Pearson correlation; XSpearman is the extreme Spearman rank correlation; XCosine is the extreme Cosine correlation.
              </Paragraph>
            </div>
          </div>
          <div id={'usage'}>
            <Title level={1}>
              6	Database Usage
            </Title>
            <div id={'usage_home'}>
              <Title level={2}>
                6.1 Home Page
              </Title>
              <Paragraph>
                The search function available in the homepage supports keyword-based quick queries for multiple forms of items, such as names of diseases, CMap signatures, or GEO signatures. Moreover, the home page provides summarizes the main resources in the database, including the number of datasets, signatures, connectivity methods and results disease-drug pairs.
              </Paragraph>
              <Image src={usage_1} preview={false}/>
            </div>
            <div id={'usage_dataset'}>
              <Title level={2}>
                6.2 Browse - GWAS Datasets
              </Title>
              <Paragraph>
                This page contains 1,929 GWAS datasets that can be easily accessed using the advanced search and filter options. By clicking the Dataset ID, you can browse the detailed information about the dataset and its corresponding results for drug repurposing.
              </Paragraph>
              <Image src={usage_2} preview={false}/>
              <Paragraph>
                The detailed page for individual dataset including four major components: Dataset Meta Information, deTS Calculated Causal Tissues, drug candidates derived from CMap signatures (CMap Results Overview) and GEO signatures (GEO Results Overview). The advanced search and filter function were also provided in this page. By clicking the Association ID, you can link to the Detail Page of the corresponding result item. By clicking on the "CMap Name" column, users can access the details of the corresponding compound in PubChem, such as chemical and physical properties, clinical trials, consolidated references, patents, and so on.
              </Paragraph>
              <Image src={usage_3} preview={false}/>
            </div>
            <div id={'usage_cmap'}>
              <Title level={2}>
                6.3 Browse - CMap Signatures
              </Title>
              <Paragraph>
                The CMap Signarues page contains 720,216 small molecule compound CMap signatures that can be easily accessed using the advanced search and filter options. By clicking the Signature ID, you can browse the detailed information about the signature and its corresponding results with all GWAS datasets for drug repurposing. By clicking on the "CMap Name" column, users can access the details of the corresponding compound in PubChem, such as chemical and physical properties, clinical trials, consolidated references, patents, and so on.
              </Paragraph>
              <Image src={usage_4} preview={false}/>
              <Paragraph>
                The detailed page for single signature including two major components: Signature Meta Information and the overview of the drug repurposing results based on this signature. By clicking on the Association ID, you can link to the Explore Page of the corresponding result item.
              </Paragraph>
              <Image src={usage_5} preview={false}/>
            </div>
            <div id={'usage_geo'}>
              <Title level={2}>
                6.4 Browse - GEO Signatures
              </Title>
              <Paragraph>
                This page contains the 4269 perturbation signatures from GEO, which were download from SigCom LINCS. These signatures can be easily accessed using the advanced search and filter options. By clicking the Signature ID, you can browse the detailed information about the signature and its corresponding results with all GWAS datasets for drug repurposing.
              </Paragraph>
              <Image src={usage_6} preview={false}/>
              <Paragraph>
                The CMap Signarues page contains 720,216 small molecule compound CMap signatures that can be easily accessed using the advanced search and filter options. By clicking the Signature ID, you can browse the detailed information about the signature and its corresponding results with all GWAS datasets for drug repurposing.
              </Paragraph>
              <Image src={usage_7} preview={false}/>
            </div>
            <div id={'usage_explore'}>
              <Title level={2}>
                6.5 CMap and GEO Results
              </Title>
              <Paragraph>
                The modules for “CMap Results” and “GEO Results” provide an opportunity to directly search for disease-drug pairs across datasets and signatures. An advanced search function has also been provided. Users can jump to the detail page of disease-drug pairs by clicking on the “Association ID” in the CMap Results and GEO Results pages.
                {/*The CMap Results page and GEO Results page contains the overall disease-drug pairs derived from corresponding kind signatures. You can easily explore these results by advance search and filter function. By clicking the Association ID, you will led to the detailed page for each association.*/}
              </Paragraph>
              <Image src={usage_8} preview={false}/>
            </div>
            <div id={'usage_detail'}>
              <Title level={2}>
                6.6 Detail Page for Disease-Drug Pair
              </Title>
              <Paragraph>
                The “detail page” about individual disease-drug pairs contains five sections. First, meta-information about the corresponding disease and drug is shown at the top of the page. Second, we use a radargram to provide an overview of the results from six connectivity methods. The larger the area enclosed by the results of the six methods, the more reliable the drug candidate is. Third, to assess whether the disease-upregulated genes appear toward the bottom of drug-induced profiles and disease-downregulated genes appear toward the top of drug-induced profiles, the GSEA plots of disease upregulated and downregulated genes in the pre-ranked list of drug signature are provided. Next, the reverse intersection analysis of disease-upregulated genes with drug-downregulated genes are illustrated in Venn diagrams, and similarly for disease-downregulated genes with drug-upregulated genes. Finally, the corresponding Z scores of upregulated and downregulated genes in disease and drug signatures are displayed in the histograms.
                {/*The page for single association contains the comprehensive details about the corresponding drug-disease pair, including four major components: Meta Information of the disease and drug, the overview of the six connectivity methods of evaluation, the GSEA results for the S-PrediXcan signatures in the pre-ranked gene list of CMap/GEO signature, the reverse intersection analysis using the extreme genes of the two kinds of signatures (Disease: S-PrediXcan and Drug: CMap or GEO), and the bar plot about the detail gene list of the extreme genes with its corresponding Z-scores.*/}
              </Paragraph>
              <Image src={usage_9} preview={false}/>
              <Image src={usage_10} preview={false}/>
              <Image src={usage_11} preview={false}/>
            </div>
          </div>
          <div id={'faq'}>
            <Title level={1}>
              7	Frequently Asked Questions (FAQ)
            </Title>
            <div>
              <Title level={2}>
                7.1 How to select a GWAS dataset ?
              </Title>
              <Paragraph>
                We recommend considering sample size, year, and other factors when selecting GWAS datasets for phenotypes of interest. High-quality GWAS datasets will provide more reliable results.
              </Paragraph>
            </div>
            <Divider/>
            <div>
              <Title level={2}>
                7.2 How to interpret the results ?
              </Title>
              <Paragraph>
                We recommend to consider the effects of tissues when interpreting the results because the genetically regulated expression profiles (GReX) are imputed based on tissue-specific models. In addition, we also integrate various annotation information about the compounds from PubChem to help users in interpreting the results. By clicking on the "CMap Name" or "InchiKey" will lead to the detail page about the compound in PubChem.
              </Paragraph>
            </div>
            <Divider/>
            <div>
              <Title level={2}>
                7.3 How to download the results in PharmGWAS ?
              </Title>
              <Paragraph>
                The download function is embedded in the web page so that users can first select the items and then the download button is displayed on the top of the table. Unfortunately, PharmGWAS does not currently support downloading all results at once!
              </Paragraph>
            </div>
            <Divider/>
            <div>
              <Title level={2}>
                7.4 How to cite ?
              </Title>
              <Paragraph>
                Coming soon...
              </Paragraph>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
