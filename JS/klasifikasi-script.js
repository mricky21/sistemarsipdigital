// Fungsi untuk menampilkan modal tambah klasifikasi
function showAddModal() {
    const modal = document.getElementById('classification-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fungsi untuk menyembunyikan modal
function hideModal() {
    const modal = document.getElementById('classification-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fungsi untuk menangani pemilihan ikon
function setupIconSelection() {
    const iconOptions = document.querySelectorAll('.icon-option');
    
    iconOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Hapus kelas aktif dari semua opsi
            iconOptions.forEach(opt => opt.classList.remove('active'));
            // Tambahkan kelas aktif ke opsi yang dipilih
            this.classList.add('active');
        });
    });
}

// Fungsi untuk menangani form tambah klasifikasi
function handleClassificationForm() {
    const form = document.getElementById('classification-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil nilai dari form
        const code = document.getElementById('code').value;
        const name = document.getElementById('name').value;
        const retention = document.getElementById('retention').value;
        const description = document.getElementById('description').value;
        const selectedIcon = document.querySelector('.icon-option.active i').className;
        
        // Validasi sederhana
        if(!code || !name || !retention) {
            alert('Harap isi semua bidang yang wajib diisi!');
            return;
        }
        
        // Tampilkan konfirmasi
        alert(`Klasifikasi baru berhasil ditambahkan:\nKode: ${code}\nNama: ${name}\nRetensi: ${retention}`);
        
        // Reset form
        form.reset();
        
        // Sembunyikan modal
        hideModal();
    });
}

// Fungsi untuk menangani tombol edit dan hapus
function setupActionButtons() {
    // Tombol edit
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.classification-card');
            const title = card.querySelector('h3').textContent;
            alert(`Membuka editor untuk klasifikasi: ${title}`);
        });
    });
    
    // Tombol hapus
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.classification-card');
            const title = card.querySelector('h3').textContent;
            
            if(confirm(`Apakah Anda yakin ingin menghapus klasifikasi "${title}"?`)) {
                alert(`Klasifikasi "${title}" berhasil dihapus!`);
            }
        });
    });
}

// Fungsi untuk menangani pencarian
function setupSearch() {
    const searchInput = document.getElementById('table-search');
    
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('.classification-table tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

// Inisialisasi saat dokumen dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Setup modal
    document.getElementById('add-classification').addEventListener('click', showAddModal);
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', hideModal);
    });
    
    // Klik di luar modal untuk menutup
    document.getElementById('classification-modal').addEventListener('click', function(e) {
        if(e.target === this) {
            hideModal();
        }
    });
    
    // Setup form dan aksi
    setupIconSelection();
    handleClassificationForm();
    setupActionButtons();
    setupSearch();
    
    // Klik pada kartu klasifikasi
    document.querySelectorAll('.classification-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Jangan aktifkan jika mengklik tombol aksi
            if(!e.target.closest('.card-footer')) {
                const title = this.querySelector('h3').textContent;
                alert(`Membuka detail klasifikasi: ${title}`);
            }
        });
    });
});