import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);
export default function Page(props: any) {
  const [state, setState] = useState({
    chartOptions: {
      credits: {
        enabled: false,
      },
      chart: {
        type: 'column',
        height: '500px',
      },
      title: {
        text: '月平均降雨量',
      },
      xAxis: {
        categories: [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月',
        ],
        crosshair: true,
        title: {
          text: 'Cell Type',
        },
        labels: {
          allowOverlap: false,
          autoRotationLimit: 40,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: '降雨量 (mm)',
        },
      },
      series: [
        {
          name: '东京',
          data: [
            49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
            95.6, 54.4,
          ],
        },
      ],
      tooltip: {
        // head + 每个 point + footer 拼接成完整的 table
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },

      plotOptions: {
        column: {
          borderWidth: 0,
        },
      },
      legend: {
        enabled: false,
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
    },
  });

  useEffect(() => {
    if (props.data) {
      console.log(props.data);
      setState({
        chartOptions: {
          credits: {
            enabled: false,
          },
          chart: {
            type: 'column',
            height: '580px',
          },
          title: {
            text: 'The overview of results',
          },
          xAxis: {
            categories: props.data.category,
            crosshair: true,
            title: {
              text: 'Cell Type',
            },
            labels: {
              allowOverlap: true,
              autoRotationLimit: 40,
            },
          },
          yAxis: {
            min: 0,
            title: {
              text: '-log10(FDR)',
            },
          },
          legend: {
            enabled: false,
          },
          series: [
            {
              name: props.data.trait,
              data: props.data.p,
            },
          ],
          tooltip: {
            // head + 每个 point + footer 拼接成完整的 table
            headerFormat:
              '<span style="font-size:10px;">Cell Type: {point.key}</span><table>',
            pointFormat:
              '<tr><td style="color:{series.color};padding:0">-log10(FDR): </td>' +
              '<td style="padding:2px"><b>{point.y:.4f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
          },
          plotOptions: {
            column: {
              borderWidth: 0,
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
            filename: 'S-LDSC', //导出的文件名
            type: 'image/png', //导出的文件类型
            width: 800, //导出的文件宽度
          },
        },
      });
    }
  }, [props]);

  return (
    <HighchartsReact highcharts={Highcharts} options={state.chartOptions} />
  );
}
