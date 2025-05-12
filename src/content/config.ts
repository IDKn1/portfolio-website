import { defineCollection, z } from "astro:content";

const collaborators = z.array(
  z.object({
    name: z.string(),
    url: z.string().url(),
  })
);

const project_link = z.object({
  name: z.string(),
  url: z.string().url(),
});
const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    cover: z.string(),
    scope: z.array(z.enum(["branding", "campaign", "web design"])),
    collaborators: collaborators.optional(),
    project_link: project_link.optional(),
  }),
});

export const collections = {
  projects,
};
