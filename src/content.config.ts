import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const entrySchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string().optional(),
  cover: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  links: z
    .array(
      z.object({
        label: z.string(),
        url: z.string(),
      }),
    )
    .default([]),
});

const competitions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/competitions' }),
  schema: entrySchema,
});

const lab = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lab' }),
  schema: entrySchema,
});

const coursework = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/coursework' }),
  schema: entrySchema,
});

export const collections = { competitions, lab, coursework };
