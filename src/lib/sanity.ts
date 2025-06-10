import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-12-01',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

// Image URL builder
const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// Common GROQ queries
export const queries = {
  // Get all blog posts
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "categories": categories[]->title,
    "author": author->{name, image}
  }`,

  // Get single post by slug
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    body,
    mainImage,
    excerpt,
    "categories": categories[]->title,
    "author": author->{name, image, bio}
  }`,

  // Get all projects
  allProjects: `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    status,
    impactNumbers
  }`,

  // Get team members
  teamMembers: `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    position,
    bio,
    image,
    social
  }`,

  // Get testimonials
  testimonials: `*[_type == "testimonial"] | order(publishedAt desc) {
    _id,
    name,
    content,
    location,
    image,
    isAnonymous
  }`,

  // Get site settings
  siteSettings: `*[_type == "siteSettings"][0] {
    title,
    description,
    keywords,
    logo,
    contactInfo,
    socialMedia,
    emergencyContacts
  }`
};

// Helper function to fetch data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sanityFetch<T = any>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
  tags?: string[];
}): Promise<T> {
  return await client.fetch(query, params, {
    next: {
      tags,
    },
  });
} 