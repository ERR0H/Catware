export function initPage() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Giả lập đăng nhập
    // Trong thực tế, bạn sẽ gọi API backend tại đây
    if (email && password) {
        // Giả lập user data
        const userData = {
            id: 1,
            email: email,
            name: email.split('@')[0],
            role: email.includes('admin') ? 'admin' : (email.includes('dev') ? 'developer' : 'user'),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=4285f4&color=fff`
        };
        
        // Lưu vào localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Hiển thị thông báo thành công
        showNotification('Đăng nhập thành công!', 'success');
        
        // Chuyển hướng đến dashboard tương ứng
        setTimeout(() => {
            const redirectPage = userData.role === 'admin' ? 'admin-dashboard' : 
                                 userData.role === 'developer' ? 'developer-dashboard' : 'home';
            window.location.hash = redirectPage;
            // Không reload, cập nhật UI thông qua checkAuthStatus
            updateUserUI();
        }, 1000);
    } else {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
    }
}

function showNotification(message, type) {
    // Tạo thông báo tạm thời
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 3000);
}

// Cập nhật UI sau khi đăng nhập (tương tự checkAuthStatus trong main.js)
function updateUserUI() {
    const userData = localStorage.getItem('userData');
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    
    if (userData && authButtons && userMenu) {
        const user = JSON.parse(userData);
        authButtons.classList.add('d-none');
        userMenu.classList.remove('d-none');
        
        // Hiển thị tên user
        const usernameDisplay = document.getElementById('username-display');
        if (usernameDisplay) {
            usernameDisplay.textContent = user.name || 'User';
        }
        
        // Hiển thị menu admin nếu là admin
        const adminMenuItem = document.getElementById('admin-menu-item');
        if (adminMenuItem && user.role === 'admin') {
            adminMenuItem.classList.remove('d-none');
        }
        
        // Hiển thị menu developer nếu là developer
        const devMenuItem = document.getElementById('dev-menu-item');
        if (devMenuItem && user.role === 'developer') {
            devMenuItem.classList.remove('d-none');
        }
    }
}