# 论文阅读地图

这是部署在 `jiyang070524-prog.github.io` 的个人论文主页。首页按“硬件结构 → 实现方法 → 软件与学习”三层组织八个方向；一篇论文可以同时属于多个方向。论文详情页保留原文入口和一张短评便签。示例论文均为**待读**，站点没有代替站长写阅读评价。

## 写一条短评

每篇论文对应 `_papers/` 下的一个 Markdown 文件。在 GitHub 仓库中打开文件，点击铅笔编辑：

```yaml
review: 这里写读完后的简短判断；可以是一两句话。
```

提交后首页和论文详情页会自动显示“已短评”。`review` 留空时显示“待读”。如果想记更长的内容，可以写在第二个 `---` 之后，显示在论文详情页下方。

## 新增论文

复制 `_papers/` 里的一个文件，改成新的英文文件名，例如 `14-new-paper.md`。逐项修改：

- `title`、`year`、`authors`：论文信息。
- `source`：论文原文或作者、机构发布的页面。
- `topics`：一个或多个方向 ID，见 `_data/topics.yml`，例如 `[memory, compute]`。
- `why`：为什么把它加入阅读路线。这是选题提示，不是读后短评。
- `order`：索引顺序；不要与已有论文重复。
- `review`：保持空字符串，读完再填写。

主页会自动收录 `_papers/` 中的论文。要调整方向名称、层级、路径文字，编辑 `_data/topics.yml`。目前的交叉路径说明在 `index.html` 的 `map-links` 段落中。

## 原有内容

原来的 `_posts/`、`notebook/` 和上传图片仍在仓库，页面从“旧笔记与其他记录”进入。新论文使用 `_papers/`，不会改动这些笔记。

## 发布

仓库 `main` 分支根目录由 GitHub Pages 的 Jekyll 构建；提交即触发更新。站点地址：<https://jiyang070524-prog.github.io/>。本地若已安装 Jekyll，可执行 `jekyll build --destination preview` 检查输出。`preview/` 是本地生成目录，不应提交。
