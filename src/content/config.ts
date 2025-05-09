import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    cover: z.string(),
  }),
});

export const collections = {
  projects,
};
