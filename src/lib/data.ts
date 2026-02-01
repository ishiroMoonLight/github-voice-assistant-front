export interface Project {
    id: string;
    name: string;
    description: string;
    stars: number;
    forks: number;
    issues: number;
    language: string;
    lastUpdated: string;
}

export const mockProjects: Project[] = [
    {
        id: "1",
        name: "github-voice-assistant",
        description: "Voice-controlled AI assistant for managing GitHub repositories.",
        stars: 124,
        forks: 18,
        issues: 3,
        language: "TypeScript",
        lastUpdated: "2 hours ago",
    },
    {
        id: "2",
        name: "neural-network-viz",
        description: "React component for visualizing neural network architectures.",
        stars: 856,
        forks: 92,
        issues: 12,
        language: "JavaScript",
        lastUpdated: "1 day ago",
    },
    {
        id: "3",
        name: "fast-db-driver",
        description: "High-performance database driver for modern applications.",
        stars: 42,
        forks: 5,
        issues: 0,
        language: "Rust",
        lastUpdated: "3 days ago",
    },
];

export const userStats = {
    totalStars: 1022,
    totalForks: 115,
    openIssues: 15,
    contributionsMonth: 48,
};
