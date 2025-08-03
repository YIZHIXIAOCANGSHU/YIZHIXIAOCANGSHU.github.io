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
> 邮件优先，电话非紧急勿扰

## 教育背景
* 机器人工程学士，CQU，2023-2027

## 项目与比赛
* 点足机器人复刻（2023-2025）
* Robomasters（2023-2025）：结构设计
* 智能车比赛（2024-2025）

## 技能
* 机器人结构设计

<!-- 综合时间轴：显示个人作品和课程作业 -->
<h2>时间轴</h2>
{% assign all_items = "" | split: "" %}
{% for item in site.portfolio %}
  {% assign all_items = all_items | push: item %}
{% endfor %}
{% for item in site.posts %}
  {% assign all_items = all_items | push: item %}
{% endfor %}

{% include horizontal-timeline.html items=all_items %}

