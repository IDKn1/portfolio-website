import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    cover: z.string(),
    scope: z.array(z.enum(["branding", "campaign", "website"])),
  }),
});

export const collections = {
  projects,
};
