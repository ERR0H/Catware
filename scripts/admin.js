export async function initPage() {
    // Kiểm tra xem user có phải admin không
    const userData = localStorage.getItem('userData');
    if (!userData) {
        showErrorMessage('Vui lòng đăng nhập trước');
        setTimeout(() => window.location.hash = 'login', 1500);
        return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'admin') {
        showErrorMessage('Bạn không có quyền truy cập trang này');
        setTimeout(() => window.location.hash = 'home', 1500);
        return;
    }
    
    // Load dữ liệu
    await loadAdminData();
}

async function loadAdminData() {
    try {
        const response = await fetch('data/software.json');
        const data = await response.json();
        const softwareList = data.software;
        
        // Cập nhật statistics
        document.getElementById('total-software').textContent = softwareList.length;
        document.getElementById('total-downloads').textContent = softwareList.reduce((sum, s) => sum + s.downloads, 0).toLocaleString();
        document.getElementById('avg-rating').textContent = (softwareList.reduce((sum, s) => sum + s.rating, 0) / softwareList.length).toFixed(1);
        document.getElementById('total-users').textContent = '1,254';
        
        // Hiển thị danh sách phần mềm
        const tbody = document.getElementById('admin-software-tbody');
        if (tbody) {
            tbody.innerHTML = softwareList.map(software => `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${software.image}" alt="${software.name}" class="rounded me-2" width="40" height="40" style="object-fit: cover;">
                            <div>
                                <strong>${software.name}</strong>
                                <br>
                                <small class="text-muted text-capitalize">${software.category}</small>
                            </div>
                        </div>
                    </td>
                    <td class="text-capitalize">${software.category}</td>
                    <td>
                        <i class="bi bi-star-fill text-warning"></i>
                        ${software.rating}
                    </td>
                    <td>${software.downloads.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="window.location.hash='software-detail/${software.id}'">
                            <i class="bi bi-eye me-1"></i>Chi tiết
                        </button>
                    </td>
                </tr>
            `).join('');
        }
        
    } catch (error) {
        console.error('Error loading admin data:', error);
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
