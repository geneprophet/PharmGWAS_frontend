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
      if (props.data.xsum_pvalue == 0 || props.data.xsum_pvalue < 0.00001){
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
              { name: 'log10(XSum p-value)', max: 5 },
              { name: 'CSS', max: 0.2 },
              { name: 'log10(CSS p-value)', max: 2.7 },
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
                  value: [-props.data.wtcs.toFixed(3), -props.data.xsum.toFixed(3), 5, -props.data.css.toFixed(3), -Math.log10(props.data.css_pvalue).toFixed(3), -props.data.spearman.toFixed(3),-props.data.pearson.toFixed(3), -props.data.cosine.toFixed(3)],
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
                      if (params.value == 5){
                        return "<-5";
                      }else{
                        return -params.value;
                      }
                    }
                  }
                }
              ]
            }
          ]
        };
        chart.setOption(option);
      }else{
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
              { name: 'log10(XSum p-value)', max: 5 },
              { name: 'CSS', max: 0.2 },
              { name: 'log10(CSS p-value)', max: 2.7 },
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
                  value: [-props.data.wtcs.toFixed(3), -props.data.xsum.toFixed(3), -Math.log10(props.data.xsum_pvalue).toFixed(3), -props.data.css.toFixed(3), -Math.log10(props.data.css_pvalue).toFixed(3), -props.data.spearman.toFixed(3),-props.data.pearson.toFixed(3), -props.data.cosine.toFixed(3)],
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
