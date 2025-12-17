export async function initPage() {
    await loadTopSoftware();
}

async function loadTopSoftware() {
    const topSoftwareList = document.getElementById('top-software-list');
    
    if (!topSoftwareList) return;
    
    try {
        const response = await fetch('data/software.json');
        const data = await response.json();
        const topSoftware = data.software.sort((a, b) => b.rating - a.rating).slice(0, 6);
        
        topSoftwareList.innerHTML = topSoftware.map(software => `
            <div class="col-md-6 mb-4">
                <div class="card border-0 shadow-soft h-100">
                    <img src="${software.image}" class="card-img-top" alt="${software.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${software.name}</h5>
                        <p class="card-text text-muted">${software.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <i class="bi bi-star-fill text-warning"></i>
                                <span class="fw-bold">${software.rating}</span>
                            </div>
                            <small class="text-muted">${software.downloads.toLocaleString()} tải</small>
                        </div>
                        <button class="btn btn-primary w-100 mt-3" onclick="window.location.hash='software-detail/${software.id}'">
                            <i class="bi bi-arrow-right me-1"></i> Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading top software:', error);
    }
}
