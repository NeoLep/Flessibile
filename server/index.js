const Koa = require("koa");
const app = new Koa();
const router = require("koa-router")();
const path = require("path");

const assetsURL = path.resolve(__dirname, "../src/assets");

router.get("/", async ctx => {
  ctx.body = {
    message: "Local Template Work Done!",
    src: assetsURL
  };
});

router.get("/getTelaTemplateList", async ctx => {
  const telaTemplateJSON = require(assetsURL + "/TelaTemplate.json");
  ctx.body = {
    code: telaTemplateJSON ? 200 : 404,
    data: telaTemplateJSON
  };
});
app.use(router.routes());
app.listen(3001);
