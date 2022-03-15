import axios from "axios";

export function $request(request) {
  if (!request) return console.error("requestParams is Missing");
  if (!request.method) console.error("method is Missing");
  if (!request.url) return console.error("url is Missing");
  return new Promise((resolve, reject) => {
    axios({
      method: request.method || "GET",
      url: request.url,
      data: request.params
    }).then(res => {
      if (res && res.status === 200) resolve(res.data);
      else reject(res);
    });
  });
}
export default function BaseRequest(app_proto) {
  app_proto.config.globalProperties.$request = $request;
}
