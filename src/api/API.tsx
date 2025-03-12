
// Keep track of the last user ID seen
let lastUserId: number | null = null;

const searchGithub = async () => {
  try {
    // If there's no lastUserId, start with a random number, otherwise use the lastUserId
    const start = lastUserId || Math.floor(Math.random() * 100000000) + 1;

    const response = await fetch(
      `https://api.github.com/users?since=${start}&per_page=30`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Invalid API response, check the network tab");
    }

    const users = await response.json();
    console.log("Users List:", users);

    // Update lastUserId with the ID of the last user in the response
    if (users.length > 0) {
      lastUserId = users[users.length - 1].id;
    }

    // Fetch detailed user data for each user
    const detailedUsers = await Promise.all(
      users.map(async (user: { login: string }) => {
        return await searchGithubUser(user.login);
      })
    );

    console.log("Detailed Users:", detailedUsers);
    return detailedUsers;
  } catch (err) {
    console.error("An error occurred", err);
    return [];
  }
};




  
  const searchGithubUser = async (username: string) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Invalid API response, check the network tab");
      }
  
      const data = await response.json();
      console.log(`User Data for ${username}:`, data);
      return data;
    } catch (err) {
      console.error("An error occurred", err);
      return {};
    }
  };
  
  
  export { searchGithub, searchGithubUser};
  