---
layout: archive
title: "简历"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}
{% include toc %}

## 联系方式
| 邮箱: 2752722697@qq.com | 电话: 13776417332 |
> 发邮件就好，电话不一定能接到

<!-- 原有内容保持不变 -->
## 教育背景
* 机器人工程学士，CQU，2023-2027年

## 比赛经历
* Robomasters 2023-2025年
  * 结构设计
* 智能车比赛 2024-2025年

## 项目经历
* 点足机器人复刻 2023-2025年

## 技能
*

<!-- 综合时间轴：显示个人作品和课程作业 -->
<h2>综合时间轴</h2>
{% assign all_items = "" | split: "" %}
{% for item in site.portfolio %}
  {% assign all_items = all_items | push: item %}
{% endfor %}
{% for item in site.posts %}
  {% assign all_items = all_items | push: item %}
{% endfor %}

{% include timeline.html items=all_items %}