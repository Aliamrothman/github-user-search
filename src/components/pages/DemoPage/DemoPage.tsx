import React, { useState, useCallback } from 'react';
import { Card } from '../../dummies/Card/Card';
import { Input } from '../../ui/Input/Input';
import { IconButton } from '../../ui/IconButton/IconButton';
import styles from './DemoPage.module.scss';
import { searchGitHubUsers } from '../../../services/github';
import { format } from 'date-fns';

interface GitHubUser {
    login: string;
    avatar_url: string;
    public_repos: number;
    updated_at: string;
}

export const DemoPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<GitHubUser[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = useCallback(async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setHasSearched(true);
        try {
            const results = await searchGitHubUsers(searchQuery);
            setUsers(results);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const openGitHubProfile = (username: string) => {
        window.open(`https://github.com/${username}`, '_blank');
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'dd MMM');
        } catch (error) {
            return 'Unknown date';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <Input
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Enter organization name"
                    onKeyDown={handleKeyDown}
                />
                <IconButton
                    icon={
                        isLoading ? (
                            <div className={styles.loader} />
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                                    fill="currentColor"
                                />
                            </svg>
                        )
                    }
                    onClick={handleSearch}
                    disabled={isLoading || !searchQuery.trim()}
                />
            </div>

            <div className={styles.results}>
                {hasSearched && !isLoading && users.length === 0 && (
                    <div className={styles.notFound}>Not Found</div>
                )}
                {users.map((user) => (
                    <Card
                        key={user.login}
                        avatar={user.avatar_url || user.login[0].toUpperCase()}
                        name={user.login}
                        userName={user.login}
                        stars={user.public_repos}
                        updatedAt={formatDate(user.updated_at)}
                        onClick={() => openGitHubProfile(user.login)}
                    />
                ))}
            </div>
        </div>
    );
}; 