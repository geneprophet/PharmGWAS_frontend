import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
export default function Page(props: any) {
  const [data, setData] = useState([]);

  const [layout, setLayout] = useState();

  useEffect(() => {
    if (props.data) {
      setData([
        {
          z: props.data.z,
          x: props.data.x,
          y: props.data.y,
          type: 'heatmap',
          hoverongaps: false,
          hovertemplate: props.data.hovertemplate,
          colorscale: 'Portland',
          showscale: true,
          colorbar: {
            len: 1,
            orientation: 'v',
            title: {
              side: 'bottom',
              text: props.data.lengentitle,
            },
          },
        },
      ]);
      setLayout({
        // title: props.data.title,
        titlefont: {
          size: 20,
          family: 'Arial',
          color: '#333333',
        },
        xaxis: {
          title: props.data.xtitle,
          automargin: true,
          tickangle: -45,
        },
        yaxis: {
          title: props.data.ytitle,
          automargin: true,
        },
      });
    }
  }, [props]);
  return (
    <Plot
      data={data}
      layout={layout}
      useResizeHandler={false}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
