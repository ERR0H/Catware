export async function initPage() {
    // Lấy software ID từ URL
    const hash = window.location.hash;
    const softwareId = hash.includes('/') ? parseInt(hash.split('/')[1]) : null;
    
    if (!softwareId) {
        window.location.hash = 'all-software';
        return;
    }
    
    await loadProductDetail(softwareId);
}

async function loadProductDetail(softwareId) {
    try {
        const response = await fetch('data/software.json');
        const data = await response.json();
        const software = data.software.find(s => s.id === softwareId);
        
        if (!software) {
            showNotFound();
            return;
        }
        
        const container = document.getElementById('product-detail-container');
        
        container.innerHTML = `
            <div class="row">
                <div class="col-lg-5 mb-4">
                    <img src="${software.image}" class="img-fluid rounded-lg shadow-lg" alt="${software.name}">
                    <div class="row g-2 mt-3">
                        <div class="col-3">
                            <img src="${software.image}" class="img-fluid rounded" alt="${software.name}" style="cursor: pointer;">
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-7">
                    <h1 class="fw-bold mb-2">${software.name}</h1>
                    <div class="d-flex align-items-center gap-3 mb-4">
                        <div>
                            <i class="bi bi-star-fill text-warning"></i>
                            <span class="fw-bold ms-1">${software.rating}</span>
                            <span class="text-muted">(dựa trên ${Math.floor(Math.random() * 1000) + 100} đánh giá)</span>
                        </div>
                        <span class="badge bg-primary">${software.downloads.toLocaleString()} tải xuống</span>
                    </div>
                    
                    <p class="text-muted mb-4">${software.description}</p>
                    
                    <!-- Price Section -->
                    <div class="card border-0 bg-light p-4 mb-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <p class="text-muted mb-0">Giá</p>
                                <h2 class="fw-bold mb-0">
                                    ${software.price === 0 ? 'Miễn phí' : '$' + software.price.toFixed(2)}
                                </h2>
                            </div>
                            <div>
                                <button class="btn btn-primary btn-lg">
                                    <i class="bi bi-download me-2"></i>
                                    ${software.price === 0 ? 'Tải xuống' : 'Mua ngay'}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Developer Info -->
                    <div class="card border-0 shadow-soft mb-4">
                        <div class="card-header bg-light border-0">
                            <h5 class="mb-0 fw-bold">Nhà phát triển</h5>
                        </div>
                        <div class="card-body">
                            <p class="fw-bold">${software.developer.name}</p>
                            <p class="text-muted mb-2">
                                <i class="bi bi-globe me-2"></i>
                                <a href="${software.developer.website}" target="_blank">${software.developer.website}</a>
                            </p>
                            <p class="text-muted">
                                <i class="bi bi-envelope me-2"></i>
                                <a href="mailto:${software.developer.supportEmail}">${software.developer.supportEmail}</a>
                            </p>
                        </div>
                    </div>
                    
                    <!-- Requirements -->
                    <div class="card border-0 shadow-soft">
                        <div class="card-header bg-light border-0">
                            <h5 class="mb-0 fw-bold">Yêu cầu hệ thống</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <strong>Hệ điều hành:</strong>
                                    <span class="text-muted">${software.requirements.os}</span>
                                </li>
                                <li class="mb-2">
                                    <strong>RAM:</strong>
                                    <span class="text-muted">${software.requirements.ram}</span>
                                </li>
                                <li>
                                    <strong>Dung lượng lưu trữ:</strong>
                                    <span class="text-muted">${software.requirements.disk}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Full Description Section -->
            <div class="row mt-5">
                <div class="col-lg-8">
                    <div class="card border-0 shadow-soft mb-4">
                        <div class="card-header bg-light border-0">
                            <h5 class="mb-0 fw-bold">Mô tả chi tiết</h5>
                        </div>
                        <div class="card-body">
                            <p>${software.longDescription}</p>
                        </div>
                    </div>
                    
                    <!-- Features Section -->
                    <div class="card border-0 shadow-soft">
                        <div class="card-header bg-light border-0">
                            <h5 class="mb-0 fw-bold">Các tính năng chính</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                ${software.features.map(feature => `
                                    <li class="list-group-item border-0 px-0 py-2">
                                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                                        ${feature}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <!-- Related Software or Reviews -->
                    <div class="card border-0 shadow-soft">
                        <div class="card-header bg-light border-0">
                            <h5 class="mb-0 fw-bold">Thông tin thêm</h5>
                        </div>
                        <div class="card-body">
                            <p class="text-muted">
                                <strong>Danh mục:</strong><br>
                                <span class="badge bg-info text-capitalize">${software.category}</span>
                            </p>
                            <p class="text-muted">
                                <strong>Trạng thái:</strong><br>
                                <span class="badge bg-success">Sẵn dùng</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('Error loading product detail:', error);
        showNotFound();
    }
}

function showNotFound() {
    const container = document.getElementById('product-detail-container');
    container.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-lg-6 text-center">
                <div class="mb-4">
                    <i class="bi bi-exclamation-circle display-1 text-danger"></i>
                </div>
                <h1 class="fw-bold mb-3">Sản phẩm không tìm thấy</h1>
                <p class="text-muted mb-4">Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <button class="btn btn-primary" onclick="window.location.hash='all-software'">
                    <i class="bi bi-arrow-left me-2"></i>Quay lại
                </button>
            </div>
        </div>
    `;
}
