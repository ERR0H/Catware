export async function initPage() {
    // Kiểm tra xem user có phải developer không
    const userData = localStorage.getItem('userData');
    if (!userData) {
        showErrorMessage('Vui lòng đăng nhập trước');
        setTimeout(() => window.location.hash = 'login', 1500);
        return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'developer') {
        showErrorMessage('Bạn không có quyền truy cập trang này');
        setTimeout(() => window.location.hash = 'home', 1500);
        return;
    }
    
    // Load dữ liệu
    await loadDeveloperData(user);
}

async function loadDeveloperData(user) {
    try {
        const response = await fetch('data/software.json');
        const data = await response.json();
        const softwareList = data.software;
        
        // Giả lập: developer có một số phần mềm
        // Trong thực tế, dữ liệu này sẽ lấy từ backend
        const mySoftware = softwareList.slice(0, 2);
        
        // Cập nhật statistics
        const mySwCount = document.getElementById('my-software-count');
        const myDwnlds = document.getElementById('my-downloads');
        const myRate = document.getElementById('my-rating');
        const revenueEl = document.getElementById('revenue');
        
        if (mySwCount) mySwCount.textContent = mySoftware.length;
        if (myDwnlds) myDwnlds.textContent = mySoftware.reduce((sum, s) => sum + s.downloads, 0).toLocaleString();
        if (myRate) myRate.textContent = (mySoftware.reduce((sum, s) => sum + s.rating, 0) / mySoftware.length).toFixed(1);
        
        // Tính doanh thu dựa trên downloads và giá
        const revenue = mySoftware.reduce((sum, s) => sum + (s.price * s.downloads), 0);
        if (revenueEl) revenueEl.textContent = '$' + (revenue / 1000).toFixed(2) + 'K';
        
        // Hiển thị phần mềm của developer
        const softwareContainer = document.getElementById('my-software-list');
        if (softwareContainer) {
            softwareContainer.innerHTML = mySoftware.map(software => `
                <div class="col-md-6 mb-4">
                    <div class="card border-0 shadow-soft h-100">
                        <img src="${software.image}" class="card-img-top" alt="${software.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${software.name}</h5>
                            <p class="card-text text-muted small">${software.description}</p>
                            <div class="row text-center small mb-3">
                                <div class="col-4">
                                    <p class="text-muted mb-0">Tải xuống</p>
                                    <p class="fw-bold mb-0">${software.downloads.toLocaleString()}</p>
                                </div>
                                <div class="col-4">
                                    <p class="text-muted mb-0">Đánh giá</p>
                                    <p class="fw-bold mb-0"><i class="bi bi-star-fill text-warning"></i> ${software.rating}</p>
                                </div>
                                <div class="col-4">
                                    <p class="text-muted mb-0">Giá</p>
                                    <p class="fw-bold mb-0">${software.price === 0 ? 'Miễn phí' : '$' + software.price}</p>
                                </div>
                            </div>
                            <button class="btn btn-sm btn-outline-primary w-100" onclick="window.location.hash='software-detail/${software.id}'">
                                <i class="bi bi-pencil me-1"></i>Chi tiết
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
    } catch (error) {
        console.error('Error loading developer data:', error);
        showErrorMessage('Lỗi tải dữ liệu');
    }
}

function showErrorMessage(message) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="alert alert-danger text-center">
                        <i class="bi bi-exclamation-circle display-6 mb-3"></i>
                        <h4>${message}</h4>
                    </div>
                </div>
            </div>
        </div>
    `;
}
