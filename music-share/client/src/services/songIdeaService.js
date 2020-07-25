const USER_SONG_IDEAS_API_BASE = 'http://localhost:8080/api/users';

class SongIdeaService {
    async getAllUserSongIdeas(userId) {
        const response = await fetch(`${USER_SONG_IDEAS_API_BASE}/${encodeURIComponent(userId)}/song-ideas`);
        return response.json();
    }

    async createSongIdea(userId, songIdea, file) {
        const formData = new FormData();
        formData.append('audiofile', file);
        delete songIdea.audiofile;
        formData.append('data', JSON.stringify(songIdea));

        const response = await fetch(
            `${USER_SONG_IDEAS_API_BASE}/${encodeURIComponent(userId)}/song-ideas`,
            {
                mode: 'cors',
                method: 'POST',
                body: formData
            }
        );

        const createdSongIdea = await response.json();
        if (response.status >= 400) {
            console.log('Error creating Song idea: ', createdSongIdea);
            throw createdSongIdea.message;
        }
        console.log('Song idea created successfully: ', createdSongIdea);
        return createdSongIdea;
    }

    async getUserSongIdeaById(userId, songIdeaId) {
        const response = await fetch(`${USER_SONG_IDEAS_API_BASE}/${encodeURIComponent(userId)}/song-ideas/${encodeURIComponent(songIdeaId)}`);
        return response.json();
    }

    async updateUserSongIdea(userId, songIdeaId, song) {
        const response = await fetch(
            `${USER_SONG_IDEAS_API_BASE}/${encodeURIComponent(userId)}/song-ideas/${encodeURIComponent(songIdeaId)}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(song)
            }
        );

        const updatedSongIdea = await response.json();
        if (response.status >= 400) {
            console.log('Error updating Song idea: ', updatedSongIdea);
            throw updatedSongIdea.message;
        }
        console.log('Song idea updated successfully: ', updatedSongIdea);
        return updatedSongIdea;
    }

    async deleteUserSongIdeaById(userId, songIdeaId) {
        const response = await fetch(
            `${USER_SONG_IDEAS_API_BASE}/${encodeURIComponent(userId)}/song-ideas/${encodeURIComponent(songIdeaId)}`,
            {
                method: 'DELETE'
            }
        );

        const deletedSongIdea = await response.json();
        if(response.status >= 400) {
            console.log('Error deleting Song idea: ', deletedSongIdea);
            throw deletedSongIdea.message;
        }
        console.log('Song idea deleted successfully: ', deletedSongIdea);
        return deletedSongIdea;
    }
}

const songIdeaService = new SongIdeaService();
export default songIdeaService;