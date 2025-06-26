// Data dokumen arsip masuk
const documentsData = [
    {
        id: 1,
        name: "Laporan Keuangan Q1 2025.pdf",
        category: "Keuangan",
        date: "15 Mar 2025",
        sender: "Bendahara",
        status: "approved",
        size: "2.4 MB",
        type: "pdf"
    },
    {
        id: 2,
        name: "Proposal Penelitian 2025.docx",
        category: "Penelitian",
        date: "14 Mar 2025",
        sender: "Tim Penelitian",
        status: "pending",
        size: "1.8 MB",
        type: "doc"
    },
    {
        id: 3,
        name: "Data Karyawan 2025.xlsx",
        category: "SDM",
        date: "12 Mar 2025",
        sender: "HR Department",
        status: "approved",
        size: "3.1 MB",
        type: "xls"
    },
    {
        id: 4,
        name: "SK Pengangkatan Staff.pdf",
        category: "Administrasi",
        date: "10 Mar 2025",
        sender: "Sekretaris",
        status: "approved",
        size: "1.2 MB",
        type: "pdf"
    },
    {
        id: 5,
        name: "Struktur Organisasi.png",
        category: "Organisasi",
        date: "8 Mar 2025",
        sender: "Manajemen",
        status: "rejected",
        size: "4.7 MB",
        type: "img"
    },
    {
        id: 6,
        name: "Rapat Direksi Maret 2025.pdf",
        category: "Manajemen",
        date: "7 Mar 2025",
        sender: "Sekretaris Direksi",
        status: "approved",
        size: "3.5 MB",
        type: "pdf"
    },
    {
        id: 7,
        name: "Laporan Kegiatan Bulanan.docx",
        category: "Laporan",
        date: "5 Mar 2025",
        sender: "Divisi Operasional",
        status: "pending",
        size: "2.1 MB",
        type: "doc"
    },
    {
        id: 8,
        name: "Sertifikat ISO 2025.pdf",
        category: "Sertifikat",
        date: "3 Mar 2025",
        sender: "QA Department",
        status: "approved",
        size: "1.8 MB",
        type: "pdf"
    },
    {
        id: 9,
        name: "Permintaan Pembelian Barang.xlsx",
        category: "Keuangan",
        date: "2 Mar 2025",
        sender: "Purchasing",
        status: "pending",
        size: "1.5 MB",
        type: "xls"
    },
    {
        id: 10,
        name: "Berita Acara Rapat.pdf",
        category: "Administrasi",
        date: "28 Feb 2025",
        sender: "Sekretaris",
        status: "approved",
        size: "2.3 MB",
        type: "pdf"
    }
];

// Fungsi untuk menampilkan dokumen dalam tabel
function renderDocuments(documents) {
    const tbody = document.getElementById('documents-body');
    tbody.innerHTML = '';
    
    documents.forEach(doc => {
        const row = document.createElement('tr');
        
        // Tentukan kelas ikon berdasarkan tipe dokumen
        let iconClass = '';
        let iconName = '';
        switch(doc.type) {
            case 'pdf':
                iconClass = 'pdf';
                iconName = 'file-pdf';
                break;
            case 'doc':
                iconClass = 'doc';
                iconName = 'file-word';
                break;
            case 'xls':
                iconClass = 'xls';
                iconName = 'file-excel';
                break;
            case 'img':
                iconClass = 'img';
                iconName = 'file-image';
                break;
            default:
                iconClass = 'pdf';
                iconName = 'file';
        }
        
        // Tentukan status badge
        let statusClass = '';
        let statusText = '';
        switch(doc.status) {
            case 'pending':
                statusClass = 'pending';
                statusText = 'Pending';
                break;
            case 'approved':
                statusClass = 'approved';
                statusText = 'Disetujui';
                break;
            case 'rejected':
                statusClass = 'rejected';
                statusText = 'Ditolak';
                break;
        }
        
        row.innerHTML = `
            <td>
                <div class="document-info">
                    <div class="document-icon ${iconClass}">
                        <i class="fas fa-${iconName}"></i>
                    </div>
                    <div class="document-details">
                        <div class="document-name">${doc.name}</div>
                        <div class="document-meta">${doc.size}</div>
                    </div>
                </div>
            </td>
            <td>${doc.category}</td>
            <td>${doc.date}</td>
            <td>${doc.sender}</td>
            <td>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </td>
            <td>
                <div class="document-actions">
                    <button class="action-btn view-document" data-id="${doc.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn download-document" data-id="${doc.id}">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Update document count
    document.getElementById('document-count').textContent = documents.length;
}

// Fungsi untuk mengaplikasikan filter
function applyFilters() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;
    
    const filteredDocs = documentsData.filter(doc => {
        // Filter berdasarkan pencarian
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm) || 
                             doc.category.toLowerCase().includes(searchTerm) ||
                             doc.sender.toLowerCase().includes(searchTerm);
        
        // Filter berdasarkan kategori
        const matchesCategory = category ? doc.category === category : true;
        
        // Filter berdasarkan tanggal (contoh sederhana)
        const matchesDate = date ? doc.date.includes(date.substring(5, 7)) : true;
        
        // Filter berdasarkan status
        const matchesStatus = status ? doc.status === status : true;
        
        return matchesSearch && matchesCategory && matchesDate && matchesStatus;
    });
    
    renderDocuments(filteredDocs);
}

// Fungsi untuk reset filter
function resetFilters() {
    document.getElementById('search').value = '';
    document.getElementById('category').selectedIndex = 0;
    document.getElementById('date').value = '';
    document.getElementById('status').selectedIndex = 0;
    renderDocuments(documentsData);
}

// Fungsi untuk menangani pencarian dalam tabel
function handleTableSearch() {
    const searchTerm = document.getElementById('table-search').value.toLowerCase();
    const rows = document.querySelectorAll('#documents-body tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Fungsi untuk menangani aksi dokumen
function handleDocumentActions() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.view-document')) {
            const btn = e.target.closest('.view-document');
            const docId = btn.getAttribute('data-id');
            const doc = documentsData.find(d => d.id == docId);
            alert(`Membuka pratinjau: ${doc.name}`);
        }
        
        if (e.target.closest('.download-document')) {
            const btn = e.target.closest('.download-document');
            const docId = btn.getAttribute('data-id');
            const doc = documentsData.find(d => d.id == docId);
            alert(`Mengunduh: ${doc.name}`);
        }
    });
}

// Fungsi untuk menangani pagination
function setupPagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.querySelector('i')) {
                document.querySelector('.pagination-btn.active').classList.remove('active');
                this.classList.add('active');
            }
        });
    });
    
    // Previous page button
    document.getElementById('prev-page').addEventListener('click', function() {
        const activeBtn = document.querySelector('.pagination-btn.active');
        const prevBtn = activeBtn.previousElementSibling;
        
        if (prevBtn && !prevBtn.querySelector('i')) {
            activeBtn.classList.remove('active');
            prevBtn.classList.add('active');
        }
    });
    
    // Next page button
    document.getElementById('next-page').addEventListener('click', function() {
        const activeBtn = document.querySelector('.pagination-btn.active');
        const nextBtn = activeBtn.nextElementSibling;
        
        if (nextBtn && !nextBtn.querySelector('i')) {
            activeBtn.classList.remove('active');
            nextBtn.classList.add('active');
        }
    });
}

// Fungsi untuk menangani sortir tabel
function setupTableSorting() {
    const headers = document.querySelectorAll('.documents-table th[data-sort]');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const sortBy = this.getAttribute('data-sort');
            const isAscending = this.classList.contains('asc');
            
            // Reset semua header
            headers.forEach(h => {
                h.classList.remove('asc', 'desc');
                h.querySelector('i').className = 'fas fa-sort';
            });
            
            // Toggle sort direction
            if (isAscending) {
                this.classList.add('desc');
                this.querySelector('i').className = 'fas fa-sort-down';
            } else {
                this.classList.add('asc');
                this.querySelector('i').className = 'fas fa-sort-up';
            }
            
            // Sort dokumen
            const sortedDocs = [...documentsData].sort((a, b) => {
                let aValue, bValue;
                
                switch(sortBy) {
                    case 'document':
                        aValue = a.name;
                        bValue = b.name;
                        break;
                    case 'category':
                        aValue = a.category;
                        bValue = b.category;
                        break;
                    case 'date':
                        aValue = new Date(a.date);
                        bValue = new Date(b.date);
                        break;
                    case 'sender':
                        aValue = a.sender;
                        bValue = b.sender;
                        break;
                    case 'status':
                        aValue = a.status;
                        bValue = b.status;
                        break;
                    default:
                        aValue = a.name;
                        bValue = b.name;
                }
                
                if (isAscending) {
                    return aValue > bValue ? -1 : 1;
                } else {
                    return aValue < bValue ? -1 : 1;
                }
            });
            
            renderDocuments(sortedDocs);
        });
    });
}

// Inisialisasi saat dokumen dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Render dokumen awal
    renderDocuments(documentsData);
    
    // Setup event listeners
    document.getElementById('apply-filter').addEventListener('click', applyFilters);
    document.getElementById('reset-filter').addEventListener('click', resetFilters);
    document.getElementById('table-search').addEventListener('keyup', handleTableSearch);
    
    // Setup dokumen actions
    handleDocumentActions();
    
    // Setup pagination
    setupPagination();
    
    // Setup table sorting
    setupTableSorting();
    
    // Tambah dokumen button
    document.querySelector('.btn-primary').addEventListener('click', function() {
        alert('Membuka form tambah arsip baru');
    });
});