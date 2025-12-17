export async function initPage() {
    await loadAllSoftware();
}

async function loadAllSoftware() {
    const allSoftwareList = document.getElementById('all-software-list');
    
    if (!allSoftwareList) return;
    
    try {
        const response = await fetch('data/software.json');
        const data = await response.json();
        const allSoftware = data.software;
        
        allSoftwareList.innerHTML = allSoftware.map(software => `
            <div class="col-md-4 mb-4">
                <div class="card border-0 shadow-soft h-100">
                    <img src="${software.image}" class="card-img-top" alt="${software.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${software.name}</h5>
                        <p class="text-muted small">${software.category}</p>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <i class="bi bi-star-fill text-warning"></i>
                                <span>${software.rating}</span>
                            </div>
                            <small class="text-muted">${software.downloads.toLocaleString()}</small>
                        </div>
                        <button class="btn btn-primary w-100" onclick="window.location.hash='software-detail/${software.id}'">
                            <i class="bi bi-arrow-right me-1"></i> Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading all software:', error);
    }
}
