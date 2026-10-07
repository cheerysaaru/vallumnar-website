export type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  datePosted: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

// Add confirmed openings here; no roles were provided for this draft.
export const jobs: Job[] = [];
