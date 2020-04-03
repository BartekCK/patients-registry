import {getData} from './storage/storage';

export const get = url =>
  new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });

let token = getData('@token')
  .then(res => {
    return (token = res);
  })
  .catch(err => console.log(err));

const apiCall = (url, method, body, resolve, reject) => {
  getData('@token')
    .then(res => {
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${res}`,
        },
        body: JSON.stringify(body),
      })
        .then(response => {
          if (response.ok) {
            response
              .json()
              .then(json => resolve(json))
              .catch(err => console.log(err));
          } else {
            reject(response);
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
export const post = (url, body) =>
  new Promise((resolve, reject) => apiCall(url, 'POST', body, resolve, reject));

export const destroy = url =>
  new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      if (response.ok) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });

export const update = (url, body) =>
  new Promise((resolve, reject) => apiCall(url, 'PUT', body, resolve, reject));
