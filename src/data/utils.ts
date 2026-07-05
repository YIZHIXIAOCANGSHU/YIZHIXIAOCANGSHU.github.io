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

export function entryHref(kind: Entry['collection'], id: string) {
  return `/${kind}/${id}`;
}

export function collectionLabel(kind: Entry['collection']) {
  return {
    competitions: '个人成果',
    lab: '实验室成果',
    coursework: '课程成果',
  }[kind];
}
