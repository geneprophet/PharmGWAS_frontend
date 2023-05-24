import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';
export default function Index(props: any) {
  const chartRef: any = useRef(); //拿到DOM容器
  // 每当props改变的时候就会实时重新渲染
  useEffect(() => {
    if (props.data) {
      const chart = echarts.init(chartRef.current); //echart初始化容器
      let option = {
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        toolbox: {
          feature: {
            saveAsImage: { show: true, title: 'Download plot as png' },
          },
        },
        series: [
          {
            type: 'graph',
            symbolSize: 50,
            layout: 'circular',
            circular: {
              // rotateLabel: true
            },
            roam: true,
            label: {
              show: true,
            },
            // edgeSymbol: ['circle', 'arrow'],
            // edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20,
            },
            // data: [
            //   {
            //     name: 'Node 1',
            //     // x: 300,
            //     // y: 300
            //   },
            //   {
            //     name: 'Node 2',
            //     // x: 800,
            //     // y: 300
            //   },
            //   {
            //     name: 'Node 3',
            //     // x: 550,
            //     // y: 100
            //   },
            //   {
            //     name: 'Node 4',
            //     // x: 550,
            //     // y: 500
            //   }
            // ],
            data: props.data.data,
            links: props.data.links,
            lineStyle: {
              opacity: 0.9,
              curveness: 0,
            },
          },
        ],
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
