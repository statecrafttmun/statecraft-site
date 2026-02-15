// Database model types based on Prisma schema

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  desc: string;
  status: string;
  registrationLink?: string | null;
  registrationDeadline?: string | null;
  isFeatured: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  fee?: string | null;
}

export interface Publication {
  id: string;
  title: string;
  excerpt: string;
  content?: string | null;
  author: string;
  date: string;
  tags: string[];
  type: string;
  image?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface GalleryImage {
  id: string;
  src: string;
  category: string;
  size: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  imageFocusX?: number | null;
  imageFocusY?: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  quote?: string | null;
  bio?: string;
  isSenior?: boolean | null;
}

export interface Category {
  id: string;
  name: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Setting {
  key: string;
  value: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Timeline {
  id: string;
  year: string;
  title: string;
  desc: string;
  order: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Settings object type for the settings page
export interface SettingsObject {
  showJoinUs?: boolean;
  showUpcomingConferences?: boolean;
  joinUsLink?: string;
  homeHeroBgImage?: string;
  emergencyContact?: string;
  [key: string]: boolean | string | undefined;
}

// Input types for save operations (id is optional for new items)
export interface EventInput {
  id?: string;
  title: string;
  date: string;
  location: string;
  desc: string;
  status: string;
  registrationLink?: string | null;
  registrationDeadline?: string | null;
  isFeatured?: boolean;
  fee?: string | null;
}

export interface PublicationInput {
  id?: string;
  title: string;
  excerpt: string;
  content?: string | null;
  author: string;
  date: string;
  tags: string[];
  type: string;
  image?: string | null;
}

export interface GalleryImageInput {
  category: string;
  src: string;
  size: string;
}

export interface TeamMemberInput {
  id?: string;
  name: string;
  role: string;
  image: string;
  imageFocusX?: number;
  imageFocusY?: number;
  quote?: string | null;
  isSenior?: boolean;
}

export interface TimelineInput {
  id?: string;
  year: string;
  title: string;
  desc: string;
  order: number;
}
