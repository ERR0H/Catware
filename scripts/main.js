// Main application router

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', () => {
    // Load navigation và footer
    loadComponent('navbar-container', 'components/navigation.html');
    loadComponent('footer-container', 'components/footer.html');
    
    // Khởi tạo router
    initRouter();
    
    // Kiểm tra trạng thái đăng nhập
    checkAuthStatus();
    
    // Setup event delegation cho tất cả các link data-page
    setupPageNavigation();
});

// Load component từ file HTML
async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Setup event delegation cho tất cả các link data-page (một lần duy nhất)
function setupPageNavigation() {
    document.addEventListener('click', (e) => {
        const pageLink = e.target.closest('[data-page]');
        if (pageLink) {
            e.preventDefault();
            const page = pageLink.getAttribute('data-page');
            window.location.hash = page;
        }
        
        // Xử lý logout
        if (e.target.id === 'logout-btn' || e.target.closest('#logout-btn')) {
            e.preventDefault();
            logout();
        }
    });
}

// Router đơn giản
function initRouter() {
    // Lấy page từ URL hoặc mặc định là home
    const hash = window.location.hash.substring(1) || 'home';
    loadPage(hash);
    
    // Xử lý thay đổi hash
    window.addEventListener('hashchange', () => {
        const page = window.location.hash.substring(1) || 'home';
        loadPage(page);
    });
}

// Kiểm tra trạng thái đăng nhập (giả lập)
function checkAuthStatus() {
    // Giả lập: kiểm tra localStorage
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

// Đăng xuất
function logout() {
    localStorage.removeItem('userData');
    window.location.hash = 'home';
    location.reload();
}

// Load trang
async function loadPage(pageName) {
    const mainContent = document.getElementById('main-content');
    
    // Extract base page name (e.g., 'software-detail' from 'software-detail/1')
    const basePageName = pageName.includes('/') ? pageName.split('/')[0] : pageName;
    
    // Hiển thị loading
    mainContent.innerHTML = `
        <div class="d-flex justify-content-center align-items-center min-vh-100">
            <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3">Đang tải trang...</p>
            </div>
        </div>
    `;
    
    try {
        // Load trang tương ứng (sử dụng base page name)
        const response = await fetch(`pages/${basePageName}.html`);
        const html = await response.text();
        mainContent.innerHTML = html;
        
        // Load JavaScript tương ứng cho trang
        try {
            const module = await import(`./${basePageName}.js`);
            if (module.initPage) {
                module.initPage();
            }
        } catch (error) {
            console.log(`No specific JS for ${basePageName}`);
        }
        
        // Cuộn lên đầu trang
        window.scrollTo(0, 0);
        
    } catch (error) {
        console.error(`Error loading page ${basePageName}:`, error);
        mainContent.innerHTML = `
            <div class="container py-5">
                <div class="alert alert-danger">
                    <h4 class="alert-heading">Lỗi tải trang</h4>
                    <p>Không thể tải trang "${basePageName}". Vui lòng thử lại sau.</p>
                    <a href="#" data-page="home" class="btn btn-primary">Về trang chủ</a>
                </div>
            </div>
        `;
    }
}
