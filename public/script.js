// public/script.js

// API bāzes URL
const API_URL = 'http://localhost:3000';

// Ielādē datus lapas sākumā
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadPosts();
    loadUserSelect();
});

// === LIETOTĀJI ===

// Ielādē lietotājus un attēlo tabulā
async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        
        const tbody = document.getElementById('usersBody');
        
        if (data.data && data.data.length > 0) {
            tbody.innerHTML = data.data.map(user => `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${new Date(user.created_at).toLocaleString('lv-LV')}</td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr><td colspan="4">Nav lietotāju</td></tr>';
        }
    } catch (error) {
        console.error('Kļūda ielādējot lietotājus:', error);
        document.getElementById('usersBody').innerHTML = '<tr><td colspan="4">Kļūda ielādējot datus</td></tr>';
    }
}

// Ielādē lietotājus dropdown izvēlnei
async function loadUserSelect() {
    try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        
        const select = document.getElementById('postUserId');
        
        if (data.data && data.data.length > 0) {
            select.innerHTML = '<option value="">Izvēlies lietotāju</option>' + 
                data.data.map(user => `
                    <option value="${user.id}">${user.name} (${user.email})</option>
                `).join('');
        } else {
            select.innerHTML = '<option value="">Nav lietotāju</option>';
        }
    } catch (error) {
        console.error('Kļūda ielādējot lietotāju izvēlni:', error);
    }
}

// Pievieno lietotāju
document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const messageDiv = document.getElementById('userMessage');
    messageDiv.textContent = '';
    
    const userData = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        password: document.getElementById('userPassword').value
    };
    
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            messageDiv.textContent = 'Lietotājs veiksmīgi pievienots!';
            messageDiv.className = 'message success';
            
            // Notīra formu
            document.getElementById('userForm').reset();
            
            // Pārlādē sarakstus
            await loadUsers();
            await loadUserSelect();
        } else {
            messageDiv.textContent = data.error?.message || 'Kļūda pievienojot lietotāju';
            messageDiv.className = 'message error';
        }
    } catch (error) {
        messageDiv.textContent = 'Kļūda savienojoties ar serveri';
        messageDiv.className = 'message error';
        console.error(error);
    }
});

// === IERAKSTI ===

// Ielādē ierakstus un attēlo tabulā
async function loadPosts() {
    try {
        const response = await fetch(`${API_URL}/posts`);
        const data = await response.json();
        
        const tbody = document.getElementById('postsBody');
        
        if (data.data && data.data.length > 0) {
            tbody.innerHTML = data.data.map(post => `
                <tr>
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.content.substring(0, 50)}${post.content.length > 50 ? '...' : ''}</td>
                    <td>${post.author_name || post.author_email || 'Nezināms'}</td>
                    <td>${new Date(post.created_at).toLocaleString('lv-LV')}</td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr><td colspan="5">Nav ierakstu</td></tr>';
        }
    } catch (error) {
        console.error('Kļūda ielādējot ierakstus:', error);
        document.getElementById('postsBody').innerHTML = '<tr><td colspan="5">Kļūda ielādējot datus</td></tr>';
    }
}

// Pievieno ierakstu
document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const messageDiv = document.getElementById('postMessage');
    messageDiv.textContent = '';
    
    const postData = {
        title: document.getElementById('postTitle').value,
        content: document.getElementById('postContent').value,
        user_id: parseInt(document.getElementById('postUserId').value)
    };
    
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            messageDiv.textContent = 'Ieraksts veiksmīgi pievienots!';
            messageDiv.className = 'message success';
            
            // Notīra formu
            document.getElementById('postForm').reset();
            
            // Pārlādē ierakstus
            await loadPosts();
        } else {
            messageDiv.textContent = data.error?.message || 'Kļūda pievienojot ierakstu';
            messageDiv.className = 'message error';
        }
    } catch (error) {
        messageDiv.textContent = 'Kļūda savienojoties ar serveri';
        messageDiv.className = 'message error';
        console.error(error);
    }
});