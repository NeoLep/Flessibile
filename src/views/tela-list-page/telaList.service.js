import { $request } from "../../requests";
import { baseURL, LocalApiList } from "../../api/local.api";

export function getTelaListService(params) {
  const request = {
    url: baseURL + LocalApiList.getTelaList.url,
    method: LocalApiList.getTelaList.method,
    params
  };
  return new Promise((resolve, reject) => {
    $request(request)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function deleteTelaListService(params) {
  const request = {
    url: baseURL + LocalApiList.deleteTela.url,
    method: LocalApiList.deleteTela.method,
    params
  };
  return new Promise((resolve, reject) => {
    $request(request)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
