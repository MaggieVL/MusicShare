const USER_ALBUMS_API_BASE = 'http://localhost:8080/api/users';

class AlbumService {
    async getAllUserAlbums(userId) {
        const response = await fetch(`${USER_ALBUMS_API_BASE}/${encodeURIComponent(userId)}/albums`);
        return response.json();
    }

    async createAlbum(userId, album) {
        const response = await fetch(
            `${USER_ALBUMS_API_BASE}/${encodeURIComponent(userId)}/albums`,
            {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(album)
            }
        );

        const createdAlbum = await response.json();
        if (response.status >= 400) {
            console.log('Error creating Album: ', createdAlbum);
            throw createdAlbum.message;
        }
        console.log('Album created successfully: ', createdAlbum);
        return createdAlbum;
    }

    async getUserAlbumById(userId, albumId) {
        const response = await fetch(`${USER_ALBUMS_API_BASE}/${encodeURIComponent(userId)}/albums/${encodeURIComponent(albumId)}`);
        return response.json();
    }

    async updateUserAlbum(userId, albumId, album) {
        const response = await fetch(
            `${USER_ALBUMS_API_BASE}/${encodeURIComponent(userId)}/albums/${encodeURIComponent(albumId)}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(album)
            }
        );

        const updatedAlbum = await response.json();
        if (response.status >= 400) {
            console.log('Error updating Album: ', updatedAlbum);
            throw updatedAlbum.message;
        }
        console.log('Album updated successfully: ', updatedAlbum);
        return updatedAlbum;
    }

    async deleteUserAlbumById(userId, albumId) {
        const response = await fetch(
            `${USER_ALBUMS_API_BASE}/${encodeURIComponent(userId)}/albums/${encodeURIComponent(albumId)}`,
            {
                method: 'DELETE'
            }
        );

        const deletedAlbum = await response.json();
        if(response.status >= 400) {
            console.log('Error deleting Album: ', deletedAlbum);
            throw deletedAlbum.message;
        }
        console.log('Album deleted successfully: ', deletedAlbum);
        return deletedAlbum;
    }

    async assignSongToAlbum(userId, albumId, songId) {
        const response = await fetch(
            `${USER_ALBUMS_API_BASE}/${encodeURIComponent(userId)}/albums/${encodeURIComponent(albumId)}/songs`,
            {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: songId
            }
        );

        const assignedSong = await response.json();
        if (response.status >= 400) {
            console.log('Error assigning song: ', assignedSong);
            throw assignedSong.message;
        }
        console.log('Song assigned successfully: ', assignedSong);
        return assignedSong;
    }

    async unassignSongFromAlbum(userId, albumId, songId) {
        const response = await fetch(
            `${USER_ALBUMS_API_BASE}/${encodeURIComponent(userId)}/albums/${encodeURIComponent(albumId)}/songs/${encodeURIComponent(songId)}`,
            {
                method: 'DELETE'
            }
        );

        const unassignedSong = await response.json();
        if(response.status >= 400) {
            console.log('Error unassigning song: ', unassignedSong);
            throw unassignedSong.message;
        }
        console.log('Song unassigned successfully: ', unassignedSong);
        return unassignedSong;
    }
}

const albumService = new AlbumService();
export default albumService;