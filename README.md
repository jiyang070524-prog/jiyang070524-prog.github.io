# 个人主页

一个适合 GitHub Pages 的中文个人主页，包含笔记列表、文章阅读页和移动端布局。使用 GitHub 内置的 Jekyll 构建，无需数据库或额外服务。

## 发布

1. 创建公开仓库 `jiyang070524-prog.github.io`，把本目录内的文件放进仓库根目录（不要再套一层 personal-homepage）。
2. 打开仓库 **Settings → Pages**，在 **Build and deployment → Source** 选择 **Deploy from a branch**。
3. Branch 选择 **main**，目录选择 **/(root)**，点击 **Save**。
4. 等待 GitHub Actions 中 Pages 构建完成，然后访问 https://jiyang070524-prog.github.io/ 。

## 修改个人介绍

在 `_config.yml` 修改 `author`、`title`、`description`。首页更多介绍在 `index.html` 的“关于这里”部分。当前名字 Yang 是临时使用的，可替换为你的昵称。

## 新增笔记

在 GitHub 仓库页面点击 **Add file → Create new file**，文件名写为 `_posts/2026-09-26-my-note.md`，粘贴以下内容后点击 **Commit changes**：

```markdown
---
title: 我的第一篇笔记
description: 一句话介绍这篇笔记。
category: 学习
---

## 今天学到了什么

这里写正文，支持 Markdown。
```

文件名必须是 `年-月-日-英文短名.md`，日期不能在未来。首页会按日期自动排列，不需要手动维护列表。英文短名决定文章网址，建议不同笔记使用不同短名。

## 上传图片或 PDF

使用 **Add file → Upload files** 把附件上传到 `assets/uploads/`，在笔记正文中引用：

```markdown
![图片说明]({{ '/assets/uploads/photo.png' | relative_url }})

[查看 PDF]({{ '/assets/uploads/note.pdf' | relative_url }})
```

首页的“从这里开始”是一篇示例笔记，可以修改或删除。网站及仓库内容均公开。
