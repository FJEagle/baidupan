## 声明
该项目只是学习使用 项目中使用的百度的UI以及百度的LOGO只为学习目的,如果侵犯了百度的权益,请百度联系我们删除

## 里面实现了自动更新和手动更新 以及百度云盘的UI
![Image text](https://segmentfault.com/img/bVbh9nA)
![Image text](https://segmentfault.com/img/bVbh9no)
## 联系我们
Email: haotian0607@gmail.com
QQ群: [点击加入](https://shang.qq.com/wpa/qunwpa?idkey=68670d406ff42150f78000829448ebf700c3a92617025155f9864366c3d04654)

## 部署更新
使用 `npm run build` 之后生成的 `exe` 文件和 `latest.yml` 放到配置的更新地址就可以了
在 `package.json` 中修改 `publish` 下的 `url`
修改 `src/main/update.js` 和 `auto_update.js` 里面的更新地址

```
#应用程序更新包地址
autoUpdater.setFeedURL('http://lee.com/app/update1');
```

auto_update.js 为应用程序自检测更新
update为用户主动触发更操作

本来想写到配置文件里面的 但是目前就先这样吧 之后再修改


#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```
