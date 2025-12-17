export function initPage() {
    // Initialize register form
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    // Validate passwords
    if (password !== confirmPassword) {
        showNotification('Mật khẩu không khớp!', 'error');
        return;
    }
    
    if (password.length < 8) {
        showNotification('Mật khẩu phải có ít nhất 8 ký tự!', 'error');
        return;
    }
    
    // Simulate registration
    if (name && email && password) {
        const userData = {
            id: 1,
            email: email,
            name: name,
            role: 'user',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4285f4&color=fff`
        };
        
        // Save to localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Show success notification
        showNotification('Đăng ký thành công!', 'success');
        
        // Redirect to home
        setTimeout(() => {
            window.location.hash = 'home';
            location.reload();
        }, 1000);
    } else {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
    }
}

function showNotification(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}
