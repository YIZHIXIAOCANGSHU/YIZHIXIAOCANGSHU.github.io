import type { CollectionEntry } from 'astro:content';

export type Entry =
  | CollectionEntry<'competitions'>
  | CollectionEntry<'lab'>
  | CollectionEntry<'coursework'>;

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function sortByDate<T extends Entry>(entries: T[]) {
  return [...entries].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const competitionPriority: Record<string, number> = {
  'rc-legged': 1,
  'smart-car': 2,
  'mcm-modeling-visualization': 3,
  'rmbc-basic-training': 4,
};

const courseworkPriority: Record<string, number> = {
  autocontrol: 1,
  'microcircuit-report': 2,
  'engineering-numerical-analysis': 3,
  'ecg-system': 4,
  'stirling-engine': 5,
  'product-manufacturing': 6,
  'robotics-writing-arm': 7,
  'infrared-tracking-radar': 8,
  'low-noise-omni-base': 9,
  'meeting-robot': 10,
  'electric-boat': 11,
  'inventory-system': 12,
  'face-recognition': 13,
  'droplet-levitation': 14,
  'ship-manufacturing': 15,
  'biomimetic-fish': 16,
  'jumping-interaction-device': 17,
  'ergonomics-smart-classroom': 18,
};

function sortWithPriority<T extends Entry>(entries: T[], priorities: Record<string, number>) {
  return [...entries].sort((a, b) => {
    const priorityA = priorities[a.id] ?? 99;
    const priorityB = priorities[b.id] ?? 99;

    if (priorityA !== priorityB) return priorityA - priorityB;
    return b.data.date.getTime() - a.data.date.getTime();
  });
}

export function sortCompetitions<T extends CollectionEntry<'competitions'>>(entries: T[]) {
  return sortWithPriority(entries, competitionPriority);
}

export function sortCoursework<T extends CollectionEntry<'coursework'>>(entries: T[]) {
  return sortWithPriority(entries, courseworkPriority);
}

export function entryHref(kind: Entry['collection'], id: string) {
  return `/${kind}/${id}`;
}

export function collectionLabel(kind: Entry['collection']) {
  return {
    competitions: '竞赛与个人项目',
    lab: '实验室项目',
    coursework: '课程项目',
  }[kind];
}
