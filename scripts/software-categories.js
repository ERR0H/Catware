export function initPage() {
    loadSoftwareCategories();
}

function loadSoftwareCategories() {
    const softwareList = document.getElementById('software-list');
    
    if (!softwareList) return;
    
    // Sample data - in real app, this would come from backend
    const categories = [
        {
            name: 'Công cụ làm việc',
            icon: 'bi-briefcase',
            count: 234,
            description: 'Phần mềm văn phòng, quản lý dự án'
        },
        {
            name: 'Thiết kế đồ họa',
            icon: 'bi-palette',
            count: 156,
            description: 'Phần mềm chỉnh sửa ảnh, thiết kế UI/UX'
        },
        {
            name: 'Lập trình',
            icon: 'bi-code-slash',
            count: 421,
            description: 'IDE, công cụ phát triển phần mềm'
        },
        {
            name: 'Giải trí',
            icon: 'bi-controller',
            count: 189,
            description: 'Phần mềm nghe nhạc, xem phim, game'
        }
    ];
    
    softwareList.innerHTML = categories.map(category => `
        <div class="col-md-6 mb-4">
            <div class="card border-0 shadow-soft h-100">
                <div class="card-body">
                    <div class="mb-3">
                        <i class="bi ${category.icon} fs-1 text-primary"></i>
                    </div>
                    <h5 class="card-title fw-bold">${category.name}</h5>
                    <p class="card-text text-muted">${category.description}</p>
                    <p class="text-primary fw-bold">${category.count} phần mềm</p>
                </div>
            </div>
        </div>
    `).join('');
}
