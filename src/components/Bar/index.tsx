import React, { useEffect, useState } from 'react';
import styles from './index.less';
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
        type: 'bar',
        height: 400,
      },
      title: {
        text: '2015'
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
        filename: 'test', //导出的文件名
        type: 'image/png', //导出的文件类型
        width: 500, //导出的文件宽度
      },
      legend: {
        verticalAlign: 'top',
      },
      xAxis: [{
        categories: ['0-4', '5-9', '10-14', '15-19',
          '20-24', '25-29', '30-34', '35-39', '40-44',
          '45-49', '50-54', '55-59', '60-64', '65-69',
          '70-74', '75-79', '80-84', '85-89', '90-94',
          '95-99', '100 + '],
        reversed: false,
        labels: {
          step: 1,
          formatter: function () {
            return (
              '<a href="https://cn.bing.com/search?q=' + this.value + '" target="_blank" onclick="">' +
              this.value +
              '</a>'
            );
          },
          style:{
            color:"#0c64b6",
            fontSize:'12px'
          }
        }
      }, {
        opposite: true,
        reversed: false,
        linkedTo: 0,
        categories: ['1', '2', '3', '4',
          '5', '6', '7', '8', '9',
          'a10', 'a11', '12', '13', '14',
          '15', '16', '17', '18', '19',
          '20', '21'],
        labels: {
          step: 1,
          formatter: function () {
            return (
              '<a href="https://cn.bing.com/search?q=' + this.value + '" target="_blank" onclick="">' +
              this.value +
              '</a>'
            );
          },
          style:{
            color:"#0c64b6",
            fontSize:'12px'
          }
        }
      }],
      yAxis: {
        title: {
          text: null
        },
        labels: {
          formatter: function () {
            return (Math.abs(this.value) / 1000000) + 'M';
          }
        },
        min: -4000000,
        max: 4000000
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      tooltip: {
        formatter: function () {
          if (this.series.name == "man"){
            return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
              'people: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
          }else {
            return '<b>' + this.series.name + ', age ' + this.point.x + '</b><br/>' +
              'people: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
          }
        }
      },
      series: [{
        name: 'man',
        data: [-1746181, -1884428, -2089758, -2222362, -2537431, -2507081, -2443179,
          -2664537, -3556505, -3680231, -3143062, -2721122, -2229181, -2227768,
          -2176300, -1329968, -836804, -354784, -90569, -28367, -3878],
        color: '#4942E4',
      }, {
        name: 'women',
        data: [1656154, 1787564, 1981671, 2108575, 2403438, 2366003, 2301402, 2519874,
          3360596, 3493473, 3050775, 2759560, 2304444, 2426504, 2568938, 1785638,
          1447162, 1005011, 330870, 130632, 21208],
        color: '#FF0060',
      }],
    }
  });

  useEffect(() => {
    if (props.data) {
      setState({chartOptions: {
          credits: {
            enabled: false,
          },
          chart: {
            type: 'bar',
            height: 800,
          },
          title: {
            text: props.data.title,
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
            width: 600, //导出的文件宽度
          },
          legend: {
            verticalAlign: 'top',
          },
          xAxis: [{
            categories: props.data.gene_name_list_down,
            reversed: true,
            labels: {
              step: 1,
              formatter: function () {
                return (
                  '<a href="https://www.ncbi.nlm.nih.gov/gene/?term=' + this.value + '" target="_blank" onclick="">' +
                  this.value +
                  '</a>'
                );
              },
              style:{
                color:"#0c64b6",
                fontSize:'12px'
              }
            }
          }, {
            opposite: true,
            reversed: false,
            linkedTo: 0,
            categories: props.data.gene_name_list_up,
            labels: {
              step: 1,
              formatter: function () {
                return (
                  '<a href="https://www.ncbi.nlm.nih.gov/gene/?term=' + this.value + '" target="_blank" onclick="">' +
                  this.value +
                  '</a>'
                );
              },
              style:{
                color:"#0c64b6",
                fontSize:'12px'
              }
            }
          }],
          yAxis: {
            title: {
              text: props.data.yAxis
            },
            labels: {
              formatter: function () {
                return (Math.abs(this.value));
              }
            },
            min: props.data.min,
            max: props.data.max
          },
          plotOptions: {
            series: {
              stacking: 'normal'
            }
          },
          tooltip: {
            formatter: function () {
              if (this.series.name == "Down"){
                return '<b>' + this.series.name + ' Regulated Gene: ' + this.point.category + '</b><br/>' +
                  'Z-Score: ' + Highcharts.numberFormat(this.point.y, 4);
              }else {
                return '<b>' + this.series.name + ' Regulated Gene: ' + props.data.gene_name_list_up[this.point.x] + '</b><br/>' +
                  'Z-Score: ' + Highcharts.numberFormat(this.point.y, 4);
              }
            }
          },
          series: [{
            name: 'Down',
            data: props.data.zscore_list_down,
            color: '#6C9BCF',
          }, {
            name: 'Up',
            data: props.data.zscore_list_up,
            color: '#BE5A83',
          }],
        }});
    }
  }, [props]);
  return (
    <HighchartsReact highcharts={Highcharts} options={state.chartOptions} />
  );
}
