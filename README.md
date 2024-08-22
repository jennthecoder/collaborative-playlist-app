# Collaborative Playlist Web App

This web app allows multiple users to collaboratively create and manage playlists. Users can invite friends to contribute songs, vote on tracks, and set playlist rules ( genre, tempo, or artist restrictions). The app provides real-time updates and social features like chat or comments.

## Core Features

### User Authentication
- Uses Spotify's OAuth 2.0 for user authentication, to allow users to log in with their Spotify accounts.

### Playlist Creation & Management
- Allow users to create new playlists within the app and manage existing ones.
- Set custom rules for playlists (only allowing certain genres, artists, tempo).

### Collaborative Playlist Editing
- Allow users to invite friends to contribute to a playlist.
- Implement real-time playlist updates using WebSockets or a similar technology.
- Provide an option to vote on songs, with the most upvoted tracks automatically moved to the top of the playlist.

### Song Recommendations
- Use Spotify's recommendation API to suggest songs based on the playlist's current content or user preferences.

### Social Features
- Add a chat or comment section for each playlist to discuss song choices.
- Allow users to like or comment on individual tracks within the playlist.

### Analytics Dashboard
- Provide insights into the playlist's popularity, including play counts, most added songs, and user engagement.

## Technical Stack

- **Frontend:** React.js, Next.js, or Vue.js for a dynamic and responsive user interface.
- **Backend:** Node.js with Express to handle API requests, authentication, and real-time updates.
- **Database:** MongoDB to store user data, playlist rules, and collaboration history. I choose MongoDB beacuse of it's fleibility in handling dynamic data associated with playlists and user interactions. it scales well as users interaction increases (important for real-time features)
- **Spotify API:** For user authentication, playlist management, track search, and recommendations.
- **WebSockets:** For real-time updates and collaboration features.
