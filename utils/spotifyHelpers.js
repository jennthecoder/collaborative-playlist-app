const axios = require('axios');

async function getAccessToken(clientID, clientSecret) {
  const url = 'https://accounts.spotify.com/api/token';
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const authHeader = 'Basic ' + Buffer.from(clientID + ':' + clientSecret).toString('base64');

  try {
    const response = await axios.post(url, params, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const token = response.data.access_token;
    console.log('Access Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting access token:', error);
  }
}

async function createPlaylist(userId, name, description, isPublic, isCollaborative, accessToken) {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

  const data = {
    name,
    description,
    public: isPublic,
    collaborative: isCollaborative
  };

  const response = await axios.post(url, data, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': `application/json`
    }
  });
   return response.data;
}

async function getUserPlaylists(userId, accessToken) {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  return response.data.items
}

module.exports = {
  getAccessToken,
  createPlaylist,
  getUserPlaylists
}
