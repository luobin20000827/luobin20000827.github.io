---
title: 用 sqlglot 做 SQL 自动审查的几个坑
description: 写 SQL review agent 时，sqlglot 解析/校验踩到的坑和绕法。
pubDate: 2026-10-02
tags: ["python", "sql", "tooling"]
---

在做一个 SQL 自动审查的小 agent，用 `sqlglot` 解析 SQL，踩了几个坑，记一下：

- **没有 `exp.Error` / `exp.Truncate`。** 想做语法检查就用 `parse(sql, raise_on_error=True)` 配 `try/except`，别去猜不存在的表达式类型。
- **按 `.key` 分类语句比 `isinstance` 稳。** 比如 `TRUNCATE TABLE` 的 key 是 `"truncatetable"`，直接判断字符串省事。
- **它会"好心"帮你修正格式。** `select *` 被规范化成 `SELECT *` 且不报错，想检测原始格式问题得用 `tokenize()` 看 token 间距。
- **WARN 模式多条语句缺分号时只解析第一条，后面的静默丢掉。** 用正则先数原文里有几个 SQL 起始关键词（SELECT/INSERT/UPDATE…）来兜底。
- **`ParseError` 的消息带 ANSI 转义码。** 展示给用户前要 `re.sub(r'\x1b\[[0-9;]*m', '', msg)` 清洗。

```python
import sqlglot
try:
    sqlglot.parse(sql, read="mysql")
except sqlglot.errors.ParseError as e:
    print(clean(e))  # 去掉 ANSI 码再展示
```

> 结论：sqlglot 当解析器很好用，但别把它当格式化检查器——它默认会帮你"改好"。
