const USER_SONGS_API_BASE = 'http://localhost:8080/api/users';

class SongService {
    async getAllUserSongs(userId) {
        const response = await fetch(`${USER_SONGS_API_BASE}/${encodeURIComponent(userId)}/songs`);
        return response.json();
    }

    async createSong(userId, song, file) {
        const formData = new FormData();
        formData.append('audiofile', file);
        delete song.audiofile;
        formData.append('data', JSON.stringify(song));

        const response = await fetch(
            `${USER_SONGS_API_BASE}/${encodeURIComponent(userId)}/songs`,
            {
                mode: 'cors',
                method: 'POST',
                body: formData
            }
        );

        const createdSong = await response.json();
        if (response.status >= 400) {
            console.log('Error creating Song: ', createdSong);
            throw createdSong.message;
        }
        console.log('Song created successfully: ', createdSong);
        return createdSong;
    }

    async getUserSongById(userId, songId) {
        const response = await fetch(`${USER_SONGS_API_BASE}/${encodeURIComponent(userId)}/songs/${encodeURIComponent(songId)}`);
        return response.json();
    }

    async updateUserSong(userId,songId, Song) {
        const response = await fetch(
            `${USER_SONGS_API_BASE}/${encodeURIComponent(userId)}/songs/${encodeURIComponent(songId)}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Song)
            }
        );

        const updatedSong = await response.json();
        if (response.status >= 400) {
            console.log('Error updating Song: ', updatedSong);
            throw updatedSong.message;
        }
        console.log('Song updated successfully: ', updatedSong);
        return updatedSong;
    }

    async deleteUserSongById(userId, songId) {
        const response = await fetch(
            `${USER_SONGS_API_BASE}/${encodeURIComponent(userId)}/songs/${encodeURIComponent(songId)}`,
            {
                method: 'DELETE'
            }
        );

        const deletedSong = await response.json();
        if(response.status >= 400) {
            console.log('Error deleting Song: ', deletedSong);
            throw deletedSong.message;
        }
        console.log('Song deleted successfully: ', deletedSong);
        return deletedSong;
    }
}

const songService = new SongService();
export default songService;