
export interface RoadmapSource {
  title: string;
  uri: string;
}

export interface RoadmapResult {
  content: string;
  sources: RoadmapSource[];
}

export interface WeekPlan {
  week: number;
  objective: string;
  days: {
    day: string;
    topic: string;
    description: string;
  }[];
}
