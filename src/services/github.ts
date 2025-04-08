interface GitHubUser {
    login: string;
    avatar_url: string;
    public_repos: number;
    updated_at: string;
}

export async function searchGitHubUsers(query: string): Promise<GitHubUser[]> {
    if (!query) return [];

    try {
        const response = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        // Get detailed information for each user
        const detailedUsers = await Promise.all(
            data.items.slice(0, 8).map(async (user: any) => {
                const userResponse = await fetch(`https://api.github.com/users/${user.login}`);
                const userData = await userResponse.json();
                return {
                    login: userData.login,
                    avatar_url: userData.avatar_url,
                    public_repos: userData.public_repos,
                    updated_at: userData.updated_at
                };
            })
        );

        return detailedUsers;
    } catch (error) {
        console.error('Error searching GitHub users:', error);
        return [];
    }
} 