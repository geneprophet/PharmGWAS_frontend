import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsSankey from 'highcharts/modules/sankey';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);
HighchartsSankey(Highcharts);
export default function Page(props: any) {
  const [state, setState] = useState({
    chartOptions: {
      credits: {
        enabled: false,
      },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'sankey',
        // height:"600px",
        style: {
          fontFamily: 'Arial',
          fontSize: '20px',
          // fontWeight: 'bold',
        },
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [
              'viewFullscreen',
              'separator',
              'label',
              'downloadPNG',
              'downloadSVG',
            ],
          },
        },
        filename: 'Two Sample MR', //导出的文件名
        type: 'image/png', //导出的文件类型
        width: 800, //导出的文件宽度
      },
      title: {
        text: 'Exposure => Outcome',
      },
      tooltip: {
        pointFormat: '<b>{point.from} => {point.to} (Beta:{point.weight})</b>',
      },
      plotOptions: {
        sankey: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            position: 'center',
            // overflow:'allow',
            // crop:false,
            // x:10,
            // y:0,
            // inside:false,
          },
        },
      },
      series: [
        {
          keys: ['from', 'to', 'weight'],
          data: [
            ['巴西', '葡萄牙', 5],
            ['巴西', '法国', 1],
            ['巴西', '西班牙', 1],
            ['巴西', '英国', 1],
            ['加拿大', '葡萄牙', 1],
            ['加拿大', '法国', 5],
            ['加拿大', '英国', 1],
            ['墨西哥', '葡萄牙', 1],
            ['墨西哥', '法国', 1],
            ['墨西哥', '西班牙', 5],
            ['墨西哥', '英国', 1],
            ['美国', '葡萄牙', 1],
            ['美国', '法国', 1],
            ['美国', '西班牙', 1],
            ['美国', '英国', 5],
            ['葡萄牙', '安哥拉', 2],
            ['葡萄牙', '塞内加尔', 1],
            ['葡萄牙', '摩洛哥', 1],
            ['葡萄牙', '南非', 3],
            ['法国', '安哥拉', 1],
            ['法国', '塞内加尔', 3],
            ['法国', '马里', 3],
            ['法国', '摩洛哥', 3],
            ['法国', '南非', 1],
            ['西班牙', '塞内加尔', 1],
            ['西班牙', '摩洛哥', 3],
            ['西班牙', '南非', 1],
            ['英国', '安哥拉', 1],
            ['英国', '塞内加尔', 1],
            ['英国', '摩洛哥', 2],
            ['英国', '南非', 7],
            ['南非', '中国', 5],
            ['南非', '印度', 1],
            ['南非', '日本', 3],
            ['安哥拉', '中国', 5],
            ['安哥拉', '印度', 1],
            ['安哥拉', '日本', 3],
            ['塞内加尔', '中国', 5],
            ['塞内加尔', '印度', 1],
            ['塞内加尔', '日本', 3],
            ['马里', '中国', 5],
            ['马里', '印度', 1],
            ['马里', '日本', 3],
            ['摩洛哥', '中国', 5],
            ['摩洛哥', '印度', 1],
            ['摩洛哥', '日本', 3],
          ],
          type: 'sankey',
          name: 'Exposure => Outcome',
        },
      ],
    },
    hoverData: null,
  });

  useEffect(() => {
    if (props.data) {
      setState({ chartOptions: { series: { data: props.data } } });
    }
  }, [props]);
  return (
    <HighchartsReact highcharts={Highcharts} options={state.chartOptions} />
  );
}
