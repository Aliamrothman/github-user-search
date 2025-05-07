export interface GitHubRepo {
    id: number;
    name: string;
    owner: { login: string; avatar_url: string };
    stargazers_count: number;
    updated_at: string;
    language: string;
}

export async function searchOrganizationRepos(org: string): Promise<GitHubRepo[]> {
    if (!org) return [];
    try {
        const response = await fetch(`https://api.github.com/orgs/${encodeURIComponent(org)}/repos`);
        if (!response.ok) return [];
        const data = await response.json();
        return data.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            owner: repo.owner,
            stargazers_count: repo.stargazers_count,
            updated_at: repo.updated_at,
            language: repo.language,
        }));
    } catch (error) {
        console.error('Error searching organization repos:', error);
        return [];
    }
} 