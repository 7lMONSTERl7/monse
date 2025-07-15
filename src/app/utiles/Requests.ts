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
        return data;
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

    async createComment(post:boolean,comment: any, setComment: any, postID: number,logs:string[],log:any) {
        if (!this.token) {
            log("You Have to login to add a comment !!!");
            return;
        }
        if (comment) {
            const res = await fetch(`${this.url}/api/${post ? 'posts' : 'videos'}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    "ngrok-skip-browser-warning": "true"
                },
                body: JSON.stringify({
                    "id": `${postID}`,
                    "comment": `${comment}`,
                    "type":"comment"
                })
            });
            const data = await res.json();
            if (logs){log([...logs,data.message])}else{log([...logs,data.message])}
            ;
            setComment('');
        } else {
            log('Please enter a comment');
        }
    }

    async login(userData: any,whoAmI: any ,setAuthStatus: any, setShowModal: any,logs:String[],log:any) {
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
            if (token){
                localStorage.setItem('token', token);
                whoAmI()
                setAuthStatus(true);
                setShowModal(false);
            }
            else{
                log([...logs,'LOGIN ERROR !!!',"Username or Password are not correct !!!"]);
            }
            //window.location.reload();
            
        } else {
            log([...logs,'LOGIN ERROR !!!',"Username or Password are not correct !!!"]);
        }
    }

    async register(registerData: any, setShowRegister: any,logs:String[],log:any) {
        const { username, password, email, profile_img, cover_img, bio } = registerData;
        if (!username || !password) {
            log('username or password is empty');
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

        if (res.status == 201){
            log([...logs,'The account created sucessfuly !!!']);
        }
        else{
            log([...logs,'Registration Faild !'])
        }
        setShowRegister(false);
    }

    async publishPost(postData: any, setCreatePost: any,logs:any[],log:any) {
        const { title, body, img } = postData;
        if (!title||!body||!img){
            throw new Error("Please fill all the fields !!!");
            
        }
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
        log([...logs,data.message]);
        setCreatePost(false);
    }

    async publishVideo(videoData: any, setCreateVideo: any, logs:any[],log:any) {
        const { title, body, video } = videoData;
        if (!title||!body||!video){
            throw new Error("Please fill all the fields !!!");
        }
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
        log([...logs,data.message]);
        setCreateVideo(false);
    }

    async postReact(post:boolean,postID:any, reacted:any, setReacted:any, setLikesCount:any, LikesCount:any) {
        let newReactedState = !reacted;
        if (this.token) {
            const res = await fetch(`${this.url}/api/${post ? 'posts' : 'videos'}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${this.token}`,
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "true"
                },
                body: JSON.stringify({
                    "id": postID,
                 
                })
            });
            
            //const data = await res.json();
            if (res.status == 204) {
                newReactedState = false
                setLikesCount(LikesCount-1)
                setReacted(newReactedState);
               
            } else {
                newReactedState = true
                setLikesCount(LikesCount+1)
                setReacted(newReactedState);
                
            }
            
        } else {
            alert("You are not authorized");
        }
    }
    
    async isItReacted(post:boolean,postID:any, setLocalReacted:any) {
        const res = await fetch(`${this.url}/api/${post ? 'posts' : 'videos'}/`, {
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
        const res = await fetch(`${this.url}/api/inbox/`, {
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
                "Content-Type": "application/json",
                'Authorization': `Token ${this.token}`,
            },
            body: JSON.stringify({
                "receiver": receiver,
            })
        });
    }

    async startFriendship(user:any){
        const res = await fetch(`${this.url}/api/friendship/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${this.token}`,
            },
            body: JSON.stringify({
                "receiver": user,
            })
        });
        if (res.status == 201){return true}
        if (res.status == 204){return false}
        return null
    }
}

export { Requests };
