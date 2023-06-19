import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsVenn from 'highcharts/modules/venn';
HighchartsVenn(Highcharts);
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);
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
        type: 'venn',
        style: {
          fontFamily: 'Arial',
          fontSize: '20px',
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
        text: 'title',
      },
      subtitle: {
        text: "subtitle",
      },
      tooltip: {
        pointFormat: '<b>{point.name} <br/>Size:{point.value}</b>',
      },
      series: [{
        type: 'venn',
        name: '',
        data: [{
          sets: ['S-PrediXcan Up genes'],
          value: 50,
          color: '#BE5A83',
        }, {
          sets: ['CMap Down genes'],
          value: 50,
          color: '#6C9BCF',
        },{
          sets: ['S-PrediXcan Up genes', 'CMap Down genes'],
          value: 1,
          name: 'Intersection',
          color: "#A0C49D"
        }]
      }],
    },
    hoverData: null,
  });

  useEffect(() => {
    if (props.data) {
      setState({
        chartOptions: {
          credits: {
            enabled: false,
          },
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'venn',
            style: {
              fontFamily: 'Arial',
              fontSize: '20px',
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
            filename: props.data.title, //导出的文件名
            type: 'image/png', //导出的文件类型
            width: 800, //导出的文件宽度
          },
          title: {
            text: props.data.title,
          },
          subtitle: {
            text: props.data.subtitle,
          },
          tooltip: {
            pointFormat: '<b>{point.name} <br/>Size:{point.value}</b>',
          },
          series: props.data.series,
        },
        hoverData: null,
      });
    }
  }, [props]);
  return (
    <HighchartsReact highcharts={Highcharts} options={state.chartOptions} />
  );
}
