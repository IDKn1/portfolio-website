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

// Define baseCard as an object schema
const baseCard = {
  title: z.string(),
  order: z.number(),
  cover: z.string(),
  project_color: z.string(),
  collection: z.string(),
};

const work = defineCollection({
  schema: z.object({
    ...baseCard,
    scope: z.array(z.enum(["branding", "campaign", "web design"])),
    collaborators: collaborators.optional(),
    project_link: project_link.optional(),
  }),
});

const misc = defineCollection({
  schema: z.object({
    ...baseCard,
    scope: z.array(z.enum(["test"])),
  }),
});

export const collections = {
  work,
  misc,
};
