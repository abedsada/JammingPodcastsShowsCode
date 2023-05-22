
const clientId = '';
const redirectUri = "https://abedsada.github.io/JammingPodcastsShows/";

let accessToken;
const Spotify={
    getAccessToken () {
        try{
            if (accessToken){
                return accessToken;
            }
            let accessTokenLink=window.location.href.match(/access_token=([^&]*)/);
            let expireLink=window.location.href.match(/expires_in=([^&]*)/);
    
            if(!(accessTokenLink && expireLink)) {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20user-library-modify&redirect_uri=${redirectUri}`;
                window.location.assign(accessUrl);
                Spotify.getAccessToken();                 
            }

            accessToken=accessTokenLink[1];
            let expireIn=Number(expireLink[1]);
    
            window.setTimeout(() => accessToken = '', expireIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
        catch(err){
            console.log(err);
        }
    },
    async search(term){
        const accessToken=await Spotify.getAccessToken();
        const URL=`https://api.spotify.com/v1/search?type=show&q=${term}`;
        return fetch(URL,   {
                            headers: {Authorization: `Bearer ${accessToken}`}
                            }).then(i=>i.json()).then(i=>{
                                    if(!i.shows) {return []};
                                    console.log(i);
                                    return i.shows.items.map(track=>({
                                        id: track.id,
                                        image: track.images[0],
                                        name: track.name,
                                        description: track.description,
                                        languages: track.languages,
                                        publisher: track.publisher,
                                        uri: track.uri
                                    }))
                            })
                
    },
    savePlaylist(name,trackUris){
        if(!name || !trackUris) {return ;}
        const accessToken=Spotify.getAccessToken();
        let userID;
        const  headers= {Authorization: `Bearer ${accessToken}`};
        return fetch('https://api.spotify.com/v1/me',{headers: headers})
                    .then(i=>i.json())
                    .then(Response=>{
                        userID=Response.id;
                        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                            headers:headers,
                            method: 'POST',
                            body: JSON.stringify({name:name})
                        }).then(response=>response.json())
                        .then(i=>{
                            const playlistID=i.id;
                            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
                                headers:headers,
                                method: 'POST',
                                body: JSON.stringify({uris:trackUris})
                            })
                        })
                    })
    },
    saveAlbums(idlist) {
        const accessToken = Spotify.getAccessToken();
        fetch(`https://api.spotify.com/v1/me/shows?ids=${idlist}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to save show.');
              }
              console.log('Show saved successfully!');
            })
            .catch(error => console.error(error));          
      }
}

export default Spotify;