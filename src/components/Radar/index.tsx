import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';
export default function Index(props: any) {
  const chartRef: any = useRef(); //拿到DOM容器
  // 每当props改变的时候就会实时重新渲染
  useEffect(() => {
    // console.log(props.data);
    if (props.data) {
      const chart = echarts.init(chartRef.current); //echart初始化容器
      let option = {
        // title: {
        //   text: 'Basic Radar Chart'
        // },
        // legend: {
        //   data: ['Allocated Budget', 'Actual Spending']
        // },
        toolbox: {
          feature: {
            saveAsImage: {
              show: true,
              name:"Overview of the Six Evaluation Methods",
              title: 'Download plot as png' },
          },
        },
        radar: {
          // shape: 'circle',
          axisName: {
            // formatter: '[{value}]',
            color: '#428BD4',
            fontWeight: 'bolder',
            fontFamily: 'sans-serif',
            fontSize: '20'
          },
          indicator: [
            { name: 'WTCS', max: 1 },
            { name: 'XSum', max: 25 },
            { name: 'CSS', max: 0.2 },
            { name: '-log10(CSS P-value)', max: 2.7 },
            { name: 'Spearman', max: 0.3 },
            { name: 'Pearson', max: 0.3 },
            { name: 'Cosine', max: 0.3 }
          ],
          splitNumber:4,
          scale:false,
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [-props.data.wtcs, -props.data.xsum, -props.data.css, -Math.log10(props.data.css_pvalue), -props.data.spearman,-props.data.pearson, -props.data.cosine],
                name: 'Actual Spending',
                areaStyle: {
                  color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                    {
                      color: 'rgba(255, 145, 124, 0.1)',
                      offset: 0
                    },
                    {
                      color: 'rgba(255, 145, 124, 0.9)',
                      offset: 1
                    }
                  ])
                },
                label: {
                  show: true,
                  formatter: function (params) {
                    return -params.value;
                  }
                }
              }
            ]
          }
        ]
      };

      chart.setOption(option);
    }
  }, [props]);

  return (
    <div
      ref={chartRef}
      className={styles.charts}
      style={{ height: '500px', width: '100%' }}
    ></div>
  );
}
