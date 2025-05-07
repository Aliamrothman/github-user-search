import axios from 'axios';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const searchOrganizationRepos = async (orgName) => {
  try {
    const response = await axios.get(`https://api.github.com/orgs/${orgName}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching organization repos:', error);
    throw error;
  }
};