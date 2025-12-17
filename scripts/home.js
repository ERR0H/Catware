export function initPage() {
    loadFeaturedSoftware();
    setupCategoryLinks();
}

// Tải phần mềm nổi bật từ JSON
async function loadFeaturedSoftware() {
    const container = document.getElementById('featured-software');
    
    if (!container) return;
    
    try {
        const response = await fetch('data/software.json');
        const data = await response.json();
        const softwareData = data.software.slice(0, 4);
        
        // Render software cards
        container.innerHTML = softwareData.map(software => `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="software-card shadow-sm">
                    <div class="position-relative">
                        <img src="${software.image}" class="software-img w-100" alt="${software.name}">
                        <span class="position-absolute top-0 end-0 m-2 badge bg-primary text-capitalize">${software.category}</span>
                    </div>
                    <div class="p-3">
                        <div class="software-category mb-1 text-capitalize">${software.category}</div>
                        <h5 class="software-title mb-2">${software.name}</h5>
                        <p class="software-description mb-3">${software.description}</p>
                        
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <div class="software-rating">
                                    <i class="bi bi-star-fill"></i>
                                    <span class="ms-1">${software.rating}</span>
                                </div>
                                <small class="text-muted">${software.downloads.toLocaleString()} lượt tải</small>
                            </div>
                            
                            <div>
                                ${software.price > 0 
                                    ? `<span class="software-price">$${software.price}</span>`
                                    : '<span class="badge bg-success">Miễn phí</span>'
                                }
                            </div>
                        </div>
                        
                        <button class="btn btn-outline-primary w-100 mt-3" onclick="window.location.hash='software-detail/${software.id}'">
                            <i class="bi bi-arrow-right me-1"></i> Chi tiết
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading featured software:', error);
    }
}

// Thiết lập sự kiện cho các link danh mục
function setupCategoryLinks() {
    document.addEventListener('click', (e) => {
        const categoryLink = e.target.closest('[data-page="software-category"]');
        if (categoryLink) {
            e.preventDefault();
            const category = categoryLink.getAttribute('data-category');
            // Trong thực tế, bạn sẽ lọc phần mềm theo danh mục
            alert(`Hiển thị phần mềm danh mục: ${category}`);
        }
    });
}