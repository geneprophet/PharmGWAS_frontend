import React, { useEffect, useState } from 'react';
import styles from './index.less';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsPie from 'highcharts/modules/variable-pie';
HighchartsPie(Highcharts);
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
        type: 'pie',
        style: {
          fontFamily: 'Arial',
          fontSize: '20px',
          // fontWeight: 'bold',
        },
      },
      title: {
        text: 'Dataset composition',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color:
                (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                'black',
            },
          },
        },
      },
      series: [
        {
          name: 'Sample Number',
          type: 'pie',
          innerSize: '80%',
          colorByPoint: true,
          data: [],
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
