import axios from 'axios';
import React from 'react';

const client = axios.create();

// //글로벌 설정

// //API 주소
// client.defaults.baseURL = "https://localhost:8080/"
// //헤더 설정
// client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4'

client.defaults.headers.post['Content-Type'] =
  'application/json; charset=UTF-8'; //json으로 던지기 위해서..

// client.defaults.headers.common['Authorization'] =
//   localStorage.getItem('velogToken');     //여기서 문제가 발생했네.. 초기값으록 고정됐나보다.

client.interceptors.request.use((request) => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

// //인터셉터 설정
// client.defaults.responseType.use(\
//     response=>{
//         //요청 성공 시 특정 작업 수행
//         return response;
//     },
//     error=>{
//         //요청 실패 시 특정 작업 수행
//         return Promise.reject(error);
//     }
// })

export default client;
