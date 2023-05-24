import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
export default function Page(props: any) {
  const unpack = (rows, key) => {
    return rows.map(function (row) {
      return row[key];
    });
  };
  const [data, setData] = useState([]);

  const [layout, setLayout] = useState({});

  useEffect(() => {
    if (props.data) {
      if (props.data.type == 'dataset') {
        setData([
          {
            type: 'violin',
            x: unpack(props.data.rows, 'biomarker'),
            y: unpack(props.data.rows, 'value'),
            points: 'suspectedoutliers',
            box: {
              visible: true,
            },
            line: {
              color: 'green',
            },
            meanline: {
              visible: true,
            },
            transforms: [
              {
                type: 'groupby',
                groups: unpack(props.data.rows, 'biomarker'),
                styles: [
                  { target: 'PD_L1', value: { line: { color: '#E9D5DA' } } },
                  { target: 'PD_1', value: { line: { color: '#827397' } } },
                  { target: 'PD_L2', value: { line: { color: '#4D4C7D' } } },
                  { target: 'CX3CL1', value: { line: { color: '#EDE6DB' } } },
                  { target: 'CTLA4', value: { line: { color: '#417D7A' } } },
                  {
                    target: 'CYT_score',
                    value: { line: { color: '#1D5C63' } },
                  },
                  { target: 'HLA_DRA', value: { line: { color: '#B4E197' } } },
                  {
                    target: 'IFN_gamma',
                    value: { line: { color: '#DEB6AB' } },
                  },
                  {
                    target: 'Expanded_immune_gene_signature',
                    value: { line: { color: '#A64B2A' } },
                  },
                  {
                    target: 'T_cell_inflamed_GEP_score',
                    value: { line: { color: '#CC704B' } },
                  },
                  {
                    target: 'Immunophenoscore',
                    value: { line: { color: '#E0D8B0' } },
                  },
                  {
                    target: 'IMPRES_score',
                    value: { line: { color: '#B4FF9F' } },
                  },
                  {
                    target: 'CRMA_score',
                    value: { line: { color: '#069A8E' } },
                  },
                  {
                    target: 'EMT_Stroma_core_signature',
                    value: { line: { color: '#99C4C8' } },
                  },
                  { target: 'F_TBRS', value: { line: { color: '#68A7AD' } } },
                  { target: 'TMEscore', value: { line: { color: '#0AA1DD' } } },
                  {
                    target: 'The_immune_resistance_program',
                    value: { line: { color: '#7FB5FF' } },
                  },
                  {
                    target: 'RiskScore',
                    value: { line: { color: '#F9CEEE' } },
                  },
                  {
                    target: 'TLS_score',
                    value: { line: { color: '#A0BCC2' } },
                  },
                  { target: 'CXCL9', value: { line: { color: '#8FBDD3' } } },
                  {
                    target: 'MPS_score',
                    value: { line: { color: '#78938A' } },
                  },
                  { target: 'TIDE', value: { line: { color: '#92BA92' } } },
                  {
                    target: 'Renal_101_Immuno_signature',
                    value: { line: { color: '#525E75' } },
                  },
                  { target: 'HRH1', value: { line: { color: '#CEAB93' } } },
                  {
                    target: 'IIS_score',
                    value: { line: { color: '#AD8B73' } },
                  },
                  {
                    target: 'TIS_score',
                    value: { line: { color: '#E3CAA5' } },
                  },
                  {
                    target: 'APM_score',
                    value: { line: { color: '#7882A4' } },
                  },
                  {
                    target: 'IPRES_score',
                    value: { line: { color: '#C0A080' } },
                  },
                  {
                    target: 'C_ECM_score',
                    value: { line: { color: '#C3DBD9' } },
                  },
                  { target: 'MFP', value: { line: { color: '#C8F2EF' } } },
                  { target: 'PASS_PRE', value: { line: { color: '#6867AC' } } },
                  { target: 'PASS_ON', value: { line: { color: '#A267AC' } } },
                  {
                    target: 'IMS_score',
                    value: { line: { color: '#9D5353' } },
                  },
                  {
                    target: 'MIAS_score',
                    value: { line: { color: '#CE7BB0' } },
                  },
                  {
                    target: 'CD8T_CIBERSORTx',
                    value: { line: { color: '#DACC96' } },
                  },
                  {
                    target: 'CD8T_MCPcounter',
                    value: { line: { color: '#B4FF9F' } },
                  },
                  {
                    target: 'CD8T_xCell',
                    value: { line: { color: '#069A8E' } },
                  },
                  {
                    target: 'Immunoscore_CIBERSORTx',
                    value: { line: { color: '#A1E3D8' } },
                  },
                  { target: 'Ecotype', value: { line: { color: '#6FDFDF' } } },
                  {
                    target: 'IFN_gamma_ssGSEA',
                    value: { line: { color: '#417D7A' } },
                  },
                  {
                    target: 'Expanded_immune_gene_ssGSEA',
                    value: { line: { color: '#1D5C63' } },
                  },
                  {
                    target: 'T_cell_inflamed_GEP_ssGSEA',
                    value: { line: { color: '#827397' } },
                  },
                  {
                    target: 'CRMA_ssGSEA',
                    value: { line: { color: '#E9D5DA' } },
                  },
                  {
                    target: 'EMT_Stroma_core_ssGSEA',
                    value: { line: { color: '#4D4C7D' } },
                  },
                  {
                    target: 'F_TBRS_ssGSEA',
                    value: { line: { color: '#066163' } },
                  },
                  {
                    target: 'RiskScore_ssGSEA',
                    value: { line: { color: '#CC704B' } },
                  },
                  {
                    target: 'TLS_score_ssGSEA',
                    value: { line: { color: '#525E75' } },
                  },
                  {
                    target: 'Renal_101_Immuno_ssGSEA',
                    value: { line: { color: '#78938A' } },
                  },
                ],
              },
            ],
          },
        ]);
        setLayout({
          title: props.data.title,
          showlegend: false,
          // jitter:1,
          font: {
            size: 16,
          },
          yaxis: {
            zeroline: false,
            title: 'Z score',
            // showline: true,
            // showgrid:false,
          },
          xaxis: {
            title: 'Biomarkers',
            automargin: true,
            // visible:false,
            // showline:true,
            type: 'category',
            showspikes: true,
            ticklabeloverflow: 'hide past domain',
            tickangle: -45,
          },
          autosize: true,
          height: 600,
          // width: 1200,
        });
      } else if (props.data.type == 'biomarker') {
        setData([
          {
            type: 'violin',
            x: unpack(props.data.rows, 'dataset'),
            y: unpack(props.data.rows, 'value'),
            points: 'suspectedoutliers',
            box: {
              visible: true,
            },
            line: {
              color: 'green',
            },
            meanline: {
              visible: true,
            },
            transforms: [
              {
                type: 'groupby',
                groups: unpack(props.data.rows, 'dataset'),
                styles: [
                  {
                    target: 'Motzer_2020',
                    value: { line: { color: '#E9D5DA' } },
                  },
                  {
                    target: 'Mariathasan_2018',
                    value: { line: { color: '#827397' } },
                  },
                  {
                    target: 'Braun_2020',
                    value: { line: { color: '#4D4C7D' } },
                  },
                  { target: 'Liu_2019', value: { line: { color: '#EDE6DB' } } },
                  {
                    target: 'Riaz_2017',
                    value: { line: { color: '#417D7A' } },
                  },
                  {
                    target: 'Gide_2019',
                    value: { line: { color: '#B4E197' } },
                  },
                  {
                    target: 'Lee_2020',
                    value: { line: { color: '#DEB6AB' } },
                  },
                  {
                    target: 'Kim_2018',
                    value: { line: { color: '#A64B2A' } },
                  },
                  {
                    target: 'VanAllen_2015',
                    value: { line: { color: '#CC704B' } },
                  },
                  {
                    target: 'Miao_2018',
                    value: { line: { color: '#E0D8B0' } },
                  },
                  {
                    target: 'Jung_2019',
                    value: { line: { color: '#B4FF9F' } },
                  },
                  {
                    target: 'MGH_PRE_2021',
                    value: { line: { color: '#069A8E' } },
                  },
                  {
                    target: 'MGH_ON_2021',
                    value: { line: { color: '#99C4C8' } },
                  },
                  {
                    target: 'Hugo_2016',
                    value: { line: { color: '#68A7AD' } },
                  },
                  {
                    target: 'Snyder_2017',
                    value: { line: { color: '#0AA1DD' } },
                  },
                  {
                    target: 'Nathanson_2017',
                    value: { line: { color: '#7FB5FF' } },
                  },
                  {
                    target: 'Gide_PRE_2019',
                    value: { line: { color: '#F9CEEE' } },
                  },
                  {
                    target: 'Gide_ON_2019',
                    value: { line: { color: '#A0BCC2' } },
                  },
                  {
                    target: 'Riaz_PRE_2017',
                    value: { line: { color: '#8FBDD3' } },
                  },
                  {
                    target: 'Riaz_ON_2017',
                    value: { line: { color: '#78938A' } },
                  },
                  {
                    target: 'Lee_PRE_2020',
                    value: { line: { color: '#92BA92' } },
                  },
                  {
                    target: 'Lee_ON_2020',
                    value: { line: { color: '#525E75' } },
                  },
                  {
                    target: 'Gide_MONO_2019',
                    value: { line: { color: '#CEAB93' } },
                  },
                  {
                    target: 'Gide_COMBINE_2019',
                    value: { line: { color: '#AD8B73' } },
                  },
                  {
                    target: 'Riaz_NAIVE_2017',
                    value: { line: { color: '#E3CAA5' } },
                  },
                  {
                    target: 'Riaz_EXPOSURE_2017',
                    value: { line: { color: '#7882A4' } },
                  },
                  {
                    target: 'Liu_NAIVE_2019',
                    value: { line: { color: '#C0A080' } },
                  },
                  {
                    target: 'Liu_EXPOSURE_2019',
                    value: { line: { color: '#C3DBD9' } },
                  },
                ],
              },
            ],
          },
        ]);
        setLayout({
          title: props.data.title,
          showlegend: false,
          // jitter:1,
          font: {
            size: 16,
          },
          yaxis: {
            zeroline: false,
            title: 'Z score',
            // showline: true,
            // showgrid:false,
          },
          xaxis: {
            title: 'Datasets',
            automargin: true,
            // visible:false,
            // showline:true,
            type: 'category',
            showspikes: true,
            ticklabeloverflow: 'hide past domain',
            tickangle: -45,
          },
          autosize: true,
          height: 600,
          // width: 1200,
        });
      }
    }
  }, [props]);
  return (
    <Plot
      data={data}
      layout={layout}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
