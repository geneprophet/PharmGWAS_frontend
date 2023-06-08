import request, { extend } from 'umi-request';
import { message } from 'antd';
// @ts-ignore
const errorHandler = function (error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.status);
    console.log(error.data);
    if (error.response.status > 400) {
      message.error(error.data.message ? error.data.message : error.data);
    }
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    console.log(error.message);
    message.error('Network error');
  }

  throw error; // If throw. The error will continue to be thrown.
  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};
export const extendRequest = extend({ errorHandler });

export const getRemoteSVG = async () => {
  //https://ngdc.cncb.ac.cn/cedr/img/workflow.svg
  //https://ngdc.cncb.ac.cn/cedr/img/Veins_Medical_Diagram_clip_art.svg
  return extendRequest('https://ngdc.cncb.ac.cn/cedr/img/workflow.svg', {
    method: 'get',
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};
