import Plot from 'react-plotly.js';
import { useEffect, useState } from 'react';
const DotplotChart = (props: any) => {
  const [remotedata, setRemotedata] = useState([]);
  const [remotelayout, setRemotelayout] = useState(undefined);

  useEffect(() => {
    if (props.data) {
      setRemotedata(props.data);
      setRemotelayout(props.layout);
    }
  }, [props]);

  return (
    <Plot
      data={remotedata}
      layout={remotelayout}
      useResizeHandler={false}
      style={{ width: '100%', height: '100%' }}
    />
  );
};
export default DotplotChart;
