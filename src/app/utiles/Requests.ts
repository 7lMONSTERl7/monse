class Requests {
    token: string | null;
    url: string | null

    constructor() {
        this.token = localStorage.getItem('token');
        this.url = localStorage.getItem('baseUrl')
    }

    async getPosts(url: string) {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        });
        const data = await res.json();
        return data;
    }

    async getInfo(Id: any) {
        const res = await fetch(`${this.url}/api/users/?id=${Id}`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${this.token}`,
                "ngrok-skip-browser-warning": "true"
            }
        });
        const data = await res.json();
        return data[0];
    }

    async getMyInfo() {
        const res = await fetch(`${this.url}/api/users/`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${this.token}`,
                "ngrok-skip-browser-warning": "true"
            }
        });
        const data = await res.json();
        return data;
    }

    async getUsers() {
        const res = await fetch(`${this.url}/api/users/?limit=12`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${this.token}`,
                "ngrok-skip-browser-warning": "true"
            }
        });
        const data = await res.json();
        return data;
    }

    async whoAmI() {
        const res = await fetch(`${this.url}/api/users/`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${this.token}`,
                "ngrok-skip-browser-warning": "true"
            }
        });
        const data = await res.json();
        if (res.ok){
            return data;
        }
    }

    async getSinglePost(id: string, setPostData: any) {
        const res = await fetch(`${this.url}/api/posts/?id=${id}`, {
            headers: {
                "ngrok-skip-browser-warning": "true",

            }
        });
        const data = await res.json();
        setPostData(data);
    }

    async getSingleVideo(id: string, setPostData: any) {
        const res = await fetch(`${this.url}/api/videos/?id=${id}`, {
            headers: {
                "ngrok-skip-browser-warning": "true",

            }
        });
        const data = await res.json();
        setPostData(data);
    }

    async getSingleUser(id:number){
        const res = await fetch(`${this.url}/api/users/?id=${id}`, {
            headers: {
                'Authorization': `Token ${this.token}`,
                "ngrok-skip-browser-warning": "true"
            }
        });
        const data = await res.json();
        return data;
    }

    async createComment(comment: any, setComment: any, postID: number) {
        if (!this.token) {
            alert("You Have to login to add a comment !!!");
            return;
        }
        if (comment) {
            const res = await fetch(`${this.url}/api/posts/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    "ngrok-skip-browser-warning": "true"
                },
                body: JSON.stringify({
                    "id": `${postID}`,
                    "body": `${comment}`
                })
            });
            const data = await res.json();
            alert(data.message);
            setComment('');
        } else {
            alert('Please enter a comment');
        }
    }

    async createVideoComment(comment: any, setComment: any, postID: number) {
        if (!this.token) {
            alert("You Have to login to add a comment !!!");
            return;
        }
        if (comment) {
            const res = await fetch(`${this.url}/api/videos/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    "ngrok-skip-browser-warning": "true"
                },
                body: JSON.stringify({
                    "id": `${postID}`,
                    "body": `${comment}`
                })
            });
            const data = await res.json();
            alert(data.message);
            setComment('');
        } else {
            alert('Please enter a comment');
        }
    }

    async login(userData: any,whoAmI: any ,setAuthStatus: any, setShowModal: any) {
        const res = await fetch(`${this.url}/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify({
                username: userData.username,
                password: userData.password,
            }),
        });

        if (res.ok) {
            const data = await res.json();
            const token = data.token;
            localStorage.setItem('token', token);
            whoAmI()
            setAuthStatus(true);
            setShowModal(false);
            //window.location.reload();
            
        } else {
            alert('LOGIN ERROR !!!');
        }
    }

    async register(registerData: any, setShowRegister: any) {
        const { username, password, email, profile_img, cover_img, bio } = registerData;
        if (!username || !password) {
            alert('username or password is empty');
            return;
        }
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('user_img', profile_img);
        formData.append('cover', cover_img);
        formData.append('bio', bio);

        const res = await fetch(`${this.url}/api/register/`, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        alert(data.message);
        setShowRegister(false);
    }

    async publishPost(postData: any, setCreatePost: any) {
        const { title, body, img } = postData;
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('img', img);

        const res = await fetch(`${this.url}/api/posts/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                "ngrok-skip-browser-warning": "true"
            },
            body: formData
        });
        const data = await res.json();
        alert(data.message);
        setCreatePost(false);
    }

    async publishVideo(videoData: any, setCreateVideo: any) {
        const { title, body, video } = videoData;
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('video', video);

        const res = await fetch(`${this.url}/api/videos/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                "ngrok-skip-browser-warning": "true"
            },
            body: formData
        });
        const data = await res.json();
        alert(data.message);
        setCreateVideo(false);
    }

    async react(postID:any, reacted:any, setLocalReacted:any, setLocalLikesCount:any, localLikesCount:any, setReacted:any) {
        const newReactedState = !reacted;
        if (this.token) {
            const res = await fetch(`${this.url}/api/posts/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${this.token}`,
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "true"
                },
                body: JSON.stringify({
                    "id": postID,
                    "isReacted": newReactedState
                })
            });
            
            const data = await res.json();
            if (data.message === 'Post already liked') {
                setLocalReacted(!newReactedState);
            } else {
                setLocalReacted(newReactedState);
                setLocalLikesCount(localLikesCount + (newReactedState ? 1 : -1));
                setReacted(postID, newReactedState);
            }
        } else {
            alert("You are not authorized");
        }
    }
    
    async isItReacted(postID:any, setLocalReacted:any) {
        const res = await fetch(`${this.url}/api/posts/${postID}/reacted`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${this.token}`,
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true"
            }
        });
    
        if (res.status === 200) {
            const data = await res.json();
            setLocalReacted(data.isReacted);
        } else {
            setLocalReacted(false);
        }
    }
    

    async getMessages(id: number) {
        if(id != 0) {
            const res = await fetch(`${this.url}/api/chat/conversation/?receiver=${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${this.token}`,
                "ngrok-skip-browser-warning": "true"
            }
        });
            const data = await res.json();
            return data;
        }
    }

    async getInboxAlerts() {
        const res = await fetch(`${this.url}/api/chat/`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${this.token}`,
                "ngrok-skip-browser-warning": "true"
            }
        });
        const data = await res.json();
        return data;
    }

    async sendMessage(receiver: number | undefined, message: string | undefined) {
        if (!receiver || !message) {
            alert('Please enter a message');
            return;
        }
        const res = await fetch(`${this.url}/api/chat/conversation/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${this.token}`,
                "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify({
                "receiver": receiver,
                "message": message,
            })
        });
        const data = await res.json();
        return data;
    }

    async search(query: string | undefined) {
        const res = await fetch(`${this.url}/api/search/?q=${query}`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${this.token}`,
                "ngrok-skip-browser-warning": "true"
            }
        });
        const data = await res.json();
        return data;
    }

    async deletePost(Id: number) {
        const res = await fetch(`${this.url}/api/posts/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${this.token}`,
                "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify({
                "id": Id,
            })
        });
        const data = await res.json();
        return data;
    }

    async deleteConversation(receiver: number) {
        const res = await fetch(`${this.url}/api/chat/conversation/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${this.token}`,
                "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify({
                "receiver": receiver,
            })
        });
        const data = await res.json();
        return data;
    }
}

export { Requests };
