export type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  has_pages: boolean;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
};
