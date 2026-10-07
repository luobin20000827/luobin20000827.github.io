---
title: GoldenDB 分片键选择踩坑笔记
description: 分布式数据库里，分片键选错，查询就得广播到所有节点。记录几个真实教训。
pubDate: 2026-09-28
tags: ["database", "goldendb"]
---

GoldenDB 是 MySQL 兼容的分布式数据库，SQL 写法基本和单机一致，但**分片键（拆分键）**选得不好，性能会被跨分片查询拖垮。几条经验：

1. **分片键要覆盖高频查询条件。** 主表按 `user_id` 拆分，那所有 `WHERE user_id = ?` 都能路由到单分片。若查询只带 `order_no`，就会变成全分片广播。
2. **避免用低基数列做分片键。** 按 `gender` 拆会严重数据倾斜。
3. **跨分片 JOIN 代价高。** 有关联的表尽量用同一分片键，保证同片关联。
4. **全局唯一 ID 别用自增。** 分布式下要用发号器或雪花 ID。

一个反面例子：

```sql
-- order 表按 user_id 拆分
SELECT * FROM `order` WHERE order_no = '20260928001';
-- order_no 不是分片键 -> 广播到所有分片
```

改成先带上 `user_id`，或给 `order_no` 建一张全局索引表做二次路由，都能避免广播。

> 判断口诀：**WHERE 里有没有分片键，决定了这是一条 SQL 还是 N 条。**
