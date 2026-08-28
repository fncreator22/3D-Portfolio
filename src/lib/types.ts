export interface Project {
  idx: number;
  slug: string;
  cat: string;
  title: string;
  tagline: string;
  desc: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: string[];
  tech: string[];
  gh: string;
  live: string | null;
  image: string;
  gallery?: string[];
  featured?: boolean;
}

export interface RoleExperience {
  title: string;
  company: string;
  meta: string;
  desc: string;
  skills: string[];
}

export interface SkillDomain {
  idx: string;
  name: string;
  items: string[];
}
