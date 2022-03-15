const Koa = require("koa");
const app = new Koa();
const router = require("koa-router")();
const path = require("path");
const bodyParser = require("koa-bodyparser");
const fs = require("fs"); // 引入fs模块

const assetsURL = path.resolve(__dirname, "../src/assets");

router.get("/", async ctx => {
  let result = await timer();
  if (result) {
    ctx.body = {
      message: "Local Template Work Done!",
      src: assetsURL,
      result
    };
  }
});

router.get("/getTelaTemplateList", async ctx => {
  const telaTemplateJSON = require(assetsURL + "/TelaTemplate.json");
  ctx.body = {
    code: telaTemplateJSON ? 200 : 404,
    data: telaTemplateJSON
  };
});

router.post("/saveTelaTemplate", async ctx => {
  const getTelaTemplate = ctx.request.body;
  const telaTemplateJSON = require(assetsURL + "/TelaTemplate.json");

  if (getTelaTemplate.id) {
    for (let key in telaTemplateJSON) {
      if (telaTemplateJSON[key]["id"] === getTelaTemplate["id"]) {
        telaTemplateJSON[key] = getTelaTemplate;
        break;
      }
    }
  } else {
    getTelaTemplate.id =
      telaTemplateJSON[telaTemplateJSON.length - 1]["id"] + 1;
    telaTemplateJSON.push(getTelaTemplate);
  }

  let body = await writeFileOperation(
    assetsURL + "/TelaTemplate.json",
    JSON.stringify(telaTemplateJSON, null, "\t")
  );
  if (body) {
    ctx.body = {
      message: "Writen Done",
      ...body
    };
  }
});

router.delete("/deleteTelaTemplate", async ctx => {
  const telaTemplateJSON = require(assetsURL + "/TelaTemplate.json");
  const { id } = ctx.request.body;

  for (let key in telaTemplateJSON) {
    if (telaTemplateJSON[key]["id"] === Number(id)) {
      telaTemplateJSON.splice(key, 1);
      break;
    }
  }
  let body = await writeFileOperation(
    assetsURL + "/TelaTemplate.json",
    JSON.stringify(telaTemplateJSON, null, "\t")
  );
  if (body) {
    ctx.body = {
      message: "Delete Done",
      ...body
    };
  }
});

app.use(bodyParser());
app.use(router.routes());
app.listen(3001);

const timer = () => {
  return new Promise(res => {
    setTimeout(() => {
      res("ok timer");
    }, 1500);
  });
};

const writeFileOperation = (url, data) => {
  return new Promise((resolve, reject) => {
    //创建可写流 fs.WriteStream 类的对象，继承自 <stream.Writable>
    const writer = fs.createWriteStream(url, {
      //默认值为w， 通过调用writer.write方法写入数据的时候，会直接覆盖文件所有的内容，
      // 即会把文件之前的内容全部再删除，写入新的数据
      flags: "w"
    });

    //写入数据到流
    writer.write(data);
    writer.end();

    writer.on("close", () => {
      const res = {
        operation: "文件已被关闭",
        log: `总共写入了${writer.bytesWritten}个字节`,
        path: `写入的文件路径是${writer.path}`
      };
      resolve(res);
    });
  });
};
