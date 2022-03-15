import { $request } from "../../requests";
import { baseURL, LocalApiList } from "../../api/local.api";

export function saveTemplateToLocal(params) {
  const request = {
    url: baseURL + LocalApiList.saveToLocal.url,
    method: LocalApiList.saveToLocal.method,
    params
  };
  console.log(request);
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
