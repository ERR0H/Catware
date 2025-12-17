export function initPage() {
    loadUserProfile();
}

function loadUserProfile() {
    const userData = localStorage.getItem('userData');
    
    if (!userData) {
        window.location.hash = 'login';
        return;
    }
    
    const user = JSON.parse(userData);
    
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileForm = document.getElementById('profileForm');
    
    if (profileName && profileEmail) {
        profileName.value = user.name || '';
        profileEmail.value = user.email || '';
    }
    
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    const name = document.getElementById('profileName').value;
    
    if (!name) {
        showNotification('Vui lòng nhập tên!', 'error');
        return;
    }
    
    const userData = JSON.parse(localStorage.getItem('userData'));
    userData.name = name;
    
    localStorage.setItem('userData', JSON.stringify(userData));
    showNotification('Cập nhật hồ sơ thành công!', 'success');
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
