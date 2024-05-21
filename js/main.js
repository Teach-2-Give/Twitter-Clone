document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const userSelect = document.getElementById('users');
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.username;
                userSelect.appendChild(option);
            });
            userSelect.value = 1;
            fetchUserProfile();
        });
}

function fetchUserProfile() {
    const userId = document.getElementById('users').value;
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('profile-picture').src = `https://i.pravatar.cc/150?img=${userId}`;
            document.getElementById('profile-name').textContent = user.name;
            document.getElementById('profile-username').textContent = `@${user.username}`;
            document.getElementById('profile-email').textContent = user.email;
            document.getElementById('profile-company').textContent = user.company.name;
            document.getElementById('profile-city').textContent = user.address.city;
            fetchPosts();
        });
}

function fetchPosts() {
    const userId = document.getElementById('users').value;
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById('post-list');
            postList.innerHTML = '';
            posts.forEach(post => {
                // Fetch the user data for each post
                fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                    .then(response => response.json())
                    .then(user => {
                        // Simulate the data
                        const likes = Math.floor(Math.random() * 100);
                        const reposts = Math.floor(Math.random() * 100);

                        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                            .then(response => response.json())
                            .then(comments => {
                                const li = document.createElement('li');
                                li.classList.add('post-item');
                                li.innerHTML = `
                                    <img src="https://i.pravatar.cc/50?img=${post.userId}" alt="Profile Picture">
                                    <div>
                                        <h3>
                                            <span class="username">${user.name}</span>
                                            <img src="https://twitter-signals-7iou.vercel.app/assets/verify.png" alt="Verification Icon" class="verify-icon" style="width: 20px; height: 20px;">
                                            <img src="https://twitter-signals-7iou.vercel.app/assets/twitter.png" alt="Twitter Icon" class="twitter-icon square-icon" style="width: 20px; height: 20px;">
                                        </h3>
                                        <div class="card">
                                            <strong>${post.title}</strong>
                                            <p>${post.body}</p>
                                            <p></p>
                                                <i class="far fa-comment-dots comment-icon" data-post-id="${post.id}" style="margin-right: 20px;"> ${comments.length}</i>
                                                <i class="fas fa-retweet repost-icon" style="margin-right: 20px;"> ${reposts}</i> 
                                                <i class="fas fa-heart like-icon" style="margin-right: 20px;"> ${likes}</i>  
                                            </p>
                                        </div>
                                        <div id="comment-list-${post.id}"></div>
                                    </div>
                                `;

                                li.querySelector('.comment-icon').addEventListener('click', function() {
                                    fetchComments(this.dataset.postId, `comment-list-${this.dataset.postId}`);
                                });
                                postList.appendChild(li);
                                li.querySelector('.comment-icon').addEventListener('click', function() {
                                    fetchComments(this.dataset.postId);
                                });
                            });
                    });
            });
        });
}

function fetchComments(postId, commentListId) {
    const commentList = document.getElementById(commentListId);
    if (commentList.style.display === 'none') {
        commentList.style.display = 'block';
    } else if (commentList.innerHTML !== '') {
        commentList.style.display = 'none';
    } else {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(comments => {
                commentList.innerHTML = '';
                comments.forEach(comment => {
                    // Simulate the data
                    const likes = Math.floor(Math.random() * 100);
                    const reposts = Math.floor(Math.random() * 100);
                    const commentCount = Math.floor(Math.random() * 10);

                    const li = document.createElement('li');
                    li.classList.add('comment-item');
                    li.innerHTML = `
                        <img src="https://i.pravatar.cc/40?img=${comment.postId}" alt="Profile Picture">
                        <div class="card">
                            <div>
                                <p></p>
                                    <strong>${comment.name}</strong> (${comment.email})
                                    <img src="https://twitter-signals-7iou.vercel.app/assets/verify.png" alt="Verification Icon" class="verify-icon" style="width: 20px; height: 20px;">
                                    <img src="https://twitter-signals-7iou.vercel.app/assets/twitter.png" alt="Twitter Icon" class="twitter-icon square-icon" style="width: 20px; height: 20px;">
                                </p>
                                <p>${comment.body}</p>
                                <p>
                                    <i class="far fa-comment-dots comment-icon" style="margin-right: 20px;"> ${commentCount}</i>
                                    <i class="fas fa-retweet repost-icon" style="margin-right: 20px;"> ${reposts}</i>
                                    <i class="fas fa-heart like-icon" style="margin-right: 20px;"> ${likes}</i>
                                </p>
                            </div>
                        </div>
                    `;
                    commentList.appendChild(li);
                });
            });
    }
}
