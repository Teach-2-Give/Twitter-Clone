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
                const li = document.createElement('li');
                li.classList.add('post-item');
                li.innerHTML = `
                    <img src="https://i.pravatar.cc/50?img=${post.userId}" alt="Profile Picture">
                    <div>
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                        <button onclick="fetchComments(${post.id})">View Comments</button>
                    </div>
                `;
                postList.appendChild(li);
            });
        });
}

function fetchComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(comments => {
            const commentList = document.getElementById('comment-list');
            commentList.innerHTML = '';
            comments.forEach(comment => {
                const li = document.createElement('li');
                li.classList.add('comment-item');
                li.innerHTML = `
                    <img src="https://i.pravatar.cc/40?img=${comment.postId}" alt="Profile Picture">
                    <div>
                        <p><strong>${comment.name}</strong> (${comment.email})</p>
                        <p>${comment.body}</p>
                    </div>
                `;
                commentList.appendChild(li);
            });
        });
}
