import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsOrganization from 'highcharts/modules/organization';
import HighchartsSankey from 'highcharts/modules/sankey';
import HighchartsReact from 'highcharts-react-official';
HighchartsSankey(Highcharts);
HighchartsOrganization(Highcharts);

export default function Page(props: any) {
  const [state, setState] = useState({
    chartOptions: {
      credits: {
        enabled: false,
      },
      chart: {
        height: 600,
        width: 1600,
        inverted: true,
      },
      title: {
        text: 'Click to view the details of the analysis results',
        style: { color: '#980104' },
      },
      series: [
        {
          type: 'organization',
          name: 'Highsoft',
          keys: ['from', 'to'],
          data: [
            ['Shareholders', 'Board'],
            ['Board', 'CEO'],
            ['CEO', 'CTO'],
            ['CEO', 'CPO'],
            ['CEO', 'CSO'],
            ['CEO', 'CMO'],
            ['CEO', 'HR'],
            ['CTO', 'Product'],
            ['CTO', 'Web'],
            ['CSO', 'Sales'],
            ['CMO', 'Market'],
          ],
          levels: [
            {
              level: 0,
              color: 'silver',
              dataLabels: {
                color: 'black',
              },
              height: 25,
            },
            {
              level: 1,
              color: 'silver',
              dataLabels: {
                color: 'black',
              },
              height: 25,
            },
            {
              level: 2,
              dataLabels: {
                color: 'black',
              },
              color: '#980104',
            },
            {
              level: 4,
              dataLabels: {
                color: 'black',
              },
              color: '#359154',
            },
          ],
          nodes: [
            {
              id: 'CEO',
              title: 'CEO',
              name: 'Grethe Hjetland',
              url: '',
              image:
                'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132317/Grethe.jpg',
            },
            {
              id: 'HR',
              title: 'HR/CFO',
              name: 'Anne Jorunn Fjærestad',
              color: '#007ad0',
              url: '',
              image:
                'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132314/AnneJorunn.jpg',
              column: 3,
              offset: '75%',
            },
            {
              id: 'CTO',
              title: 'CTO',
              name: 'Christer Vasseng',
              column: 4,
              url: '',
              image:
                'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12140620/Christer.jpg',
              layout: 'hanging',
            },
            {
              id: 'CPO',
              title: 'CPO',
              name: 'Torstein Hønsi',
              column: 4,
              url: '',
              image:
                'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12131849/Torstein1.jpg',
            },
            {
              id: 'CSO',
              title: 'CSO',
              name: 'Anita Nesse',
              column: 4,
              url: '',
              image:
                'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132313/Anita.jpg',
              layout: 'hanging',
            },
            {
              id: 'CMO',
              title: 'CMO',
              name: 'Vidar Brekke',
              column: 4,
              image:
                'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/13105551/Vidar.jpg',
              layout: 'hanging',
            },
            {
              id: 'Product',
              name: '产品研发',
            },
            {
              id: 'Web',
              name: '运维',
              description: '系统维护',
            },
            {
              id: 'Sales',
              name: '销售部',
            },
            {
              id: 'Market',
              name: '市场部',
            },
          ],
          marker: {
            fillColor: '#FFFFFF',
            lineWidth: 40,
            lineColor: null,
            radius: 10,
          },
          lineWidth: 6,
          colorByPoint: false,
          color: '#007ad0',
          dataLabels: {
            color: 'white',
            style: { fontSize: 'larger' },
          },
          borderColor: 'white',
          nodeWidth: 65,
        },
      ],
      tooltip: {
        outside: true,
      },
      exporting: {
        allowHTML: true,
        sourceWidth: 800,
        sourceHeight: 600,
      },
      plotOptions: {
        organization: {
          cursor: 'pointer',
          events: {
            click: function (e) {
              // console.log(e.point.name);
              window.open(
                'https://ngdc.cncb.ac.cn/braincatalog/' + e.point.name,
                '_blank',
              );
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    if (props) {
      setState({
        chartOptions: {
          credits: {
            enabled: false,
          },
          chart: {
            height: 700,
            width: (window.innerWidth/5)*3,
            inverted: true,
          },
          title: {
            text: 'Tips: click on the figures to view the detailed results of corresponding analysis module',
            style: { color: '#980104' },
          },
          series: [
            {
              type: 'organization',
              name: '',
              keys: ['from', 'to'],
              data: props.data,
              levels: [
                {
                  level: 0,
                  color: 'silver',
                  dataLabels: {
                    color: 'black',
                  },
                  height: 25,
                },
                {
                  level: 1,
                  color: 'silver',
                  dataLabels: {
                    color: 'black',
                  },
                  height: 25,
                },
                {
                  level: 2,
                  dataLabels: {
                    color: 'black',
                  },
                  color: '#980104',
                },
                {
                  level: 4,
                  dataLabels: {
                    color: 'black',
                  },
                  color: '#359154',
                },
              ],
              nodes: props.nodes,
              marker: {
                fillColor: '#FFFFFF',
                lineWidth: 40,
                lineColor: null,
                radius: 10,
              },
              lineWidth: 6,
              colorByPoint: false,
              color: '#007ad0',
              dataLabels: {
                color: 'white',
                style: { fontSize: 'larger' },
              },
              borderColor: 'white',
              nodeWidth: 80,
            },
          ],
          tooltip: {
            outside: true,
          },
          exporting: {
            allowHTML: true,
            sourceWidth: 1200,
            sourceHeight: 600,
          },
          plotOptions: {
            organization: {
              cursor: 'pointer',
              events: {
                click: function (e) {
                  // console.log(e.point.name);
                  if (e.point.url) {
                    window.open(
                      'https://ngdc.cncb.ac.cn' + e.point.url,
                      '_blank',
                    );
                  }
                },
              },
            },
          },
        },
      });
    }
  }, [props]);

  return (
    <HighchartsReact highcharts={Highcharts} options={state.chartOptions} />
  );
}
