import request, { extend } from 'umi-request';
import { message } from 'antd';
// @ts-ignore
import { API_PREFIX } from '@/common/constants';
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

export const getRemoteCMap = async ({
                                         pageSize,
                                         pageIndex,
                                      pert_id,
                                      sig_id,
                                      sig_index,
                                      cmap_name,
                                      cell_iname,
                                      pert_idose,
                                      pert_itime,
                                         sort_field,
                                         sort_direction
                                       }: {
  pageSize: number | undefined;
  pageIndex: number | undefined;
  pert_id: string | undefined;
  sig_id: string | undefined;
  sig_index: string | undefined;
  cmap_name: string | undefined;
  cell_iname: string | undefined;
  pert_idose: string | undefined;
  pert_itime: string | undefined;
  sort_field: string | undefined;
  sort_direction: string | undefined;
}) => {
  return extendRequest(API_PREFIX + '/cmapsignature', {
    method: 'get',
    params: {
      pageSize: pageSize,
      pageIndex: pageIndex,
      pert_id: pert_id,
      sig_id: sig_id,
      sig_index:sig_index,
      cmap_name: cmap_name,
      cell_iname: cell_iname,
      pert_idose: pert_idose,
      pert_itime: pert_itime,
      sort_field:sort_field,
      sort_direction:sort_direction
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};
export const getRemoteCMapLike = async ({
                                             pageSize,
                                             pageIndex,
                                          pert_id,
                                          sig_id,
                                          cmap_name,
                                          cell_iname,
                                          pert_idose,
                                          pert_itime,
                                           }: {
  pageSize: number | undefined;
  pageIndex: number | undefined;
  pert_id: string | undefined;
  sig_id: string | undefined;
  cmap_name: string | undefined;
  cell_iname: string | undefined;
  pert_idose: string | undefined;
  pert_itime: string | undefined;
}) => {
  return extendRequest(API_PREFIX + '/cmapsignaturelike', {
    method: 'get',
    params: {
      pageSize: pageSize,
      pageIndex: pageIndex,
      pert_id: pert_id,
      sig_id: sig_id,
      cmap_name: cmap_name,
      cell_iname: cell_iname,
      pert_idose: pert_idose,
      pert_itime: pert_itime,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};
