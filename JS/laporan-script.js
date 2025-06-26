// Inisialisasi saat dokumen dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Setup grafik
    setupCharts();
    
    // Setup filter periode kustom
    setupCustomDateFilter();
    
    // Setup pencarian tabel
    setupTableSearch();
    
    // Setup pagination
    setupPagination();
    
    // Setup tombol cetak
    setupPrintButton();
    
    // Setup tombol generate laporan
    setupGenerateReport();
});


// Fungsi untuk mengatur grafik
function setupCharts() {
    // Data untuk grafik bulanan
    const monthlyCtx = document.getElementById('monthly-chart').getContext('2d');
    const monthlyChart = new Chart(monthlyCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
            datasets: [
                {
                    label: 'Arsip Masuk',
                    data: [120, 135, 142, 130, 125, 140],
                    borderColor: '#2c5cc5',
                    backgroundColor: 'rgba(44, 92, 197, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Arsip Keluar',
                    data: [80, 85, 90, 95, 100, 105],
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Penting untuk ukuran yang dikontrol
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        font: {
                            size: 10
                        }
                    }
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    });
    
    // Data untuk grafik kategori
    const categoryCtx = document.getElementById('category-chart').getContext('2d');
    const categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Keuangan', 'SDM', 'Administrasi', 'Penelitian', 'Manajemen', 'Lainnya'],
            datasets: [{
                data: [25, 20, 30, 10, 10, 5],
                backgroundColor: [
                    '#2c5cc5',
                    '#27ae60',
                    '#f39c12',
                    '#9b59b6',
                    '#e74c3c',
                    '#34495e'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Penting untuk ukuran yang dikontrol
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 10,
                        font: {
                            size: 9
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
    

    // Toggle grafik bulanan/tahunan
    document.querySelectorAll('.chart-actions button').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-actions button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Di sini bisa ditambahkan logika untuk mengubah data grafik
            if(index === 0) {
                monthlyChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
                monthlyChart.data.datasets[0].data = [120, 135, 142, 130, 125, 140, 155, 160, 150, 165, 170, 180];
                monthlyChart.data.datasets[1].data = [80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135];
            } else {
                monthlyChart.data.labels = ['2020', '2021', '2022', '2023', '2024', '2025'];
                monthlyChart.data.datasets[0].data = [1200, 1350, 1420, 1580, 1650, 1800];
                monthlyChart.data.datasets[1].data = [800, 850, 900, 1050, 1200, 1350];
            }
            monthlyChart.update();
        });
    });
}

// Fungsi untuk mengatur filter tanggal kustom
function setupCustomDateFilter() {
    const periodSelect = document.getElementById('period');
    const customDates = document.querySelectorAll('.custom-dates');
    
    periodSelect.addEventListener('change', function() {
        if(this.value === 'custom') {
            customDates.forEach(el => el.style.display = 'block');
        } else {
            customDates.forEach(el => el.style.display = 'none');
        }
    });
}

// Fungsi untuk mengatur pencarian tabel
function setupTableSearch() {
    const searchInput = document.getElementById('table-search');
    
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('.documents-table tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

// Fungsi untuk mengatur pagination
function setupPagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if(!this.querySelector('i')) {
                document.querySelector('.pagination-btn.active').classList.remove('active');
                this.classList.add('active');
            }
        });
    });
    
    // Previous page button
    document.getElementById('prev-page').addEventListener('click', function() {
        const activeBtn = document.querySelector('.pagination-btn.active');
        const prevBtn = activeBtn.previousElementSibling;
        
        if(prevBtn && !prevBtn.querySelector('i')) {
            activeBtn.classList.remove('active');
            prevBtn.classList.add('active');
        }
    });
    
    // Next page button
    document.getElementById('next-page').addEventListener('click', function() {
        const activeBtn = document.querySelector('.pagination-btn.active');
        const nextBtn = activeBtn.nextElementSibling;
        
        if(nextBtn && !nextBtn.querySelector('i')) {
            activeBtn.classList.remove('active');
            nextBtn.classList.add('active');
        }
    });
}

// Fungsi untuk mengatur tombol cetak
function setupPrintButton() {
    document.getElementById('print-report').addEventListener('click', function() {
        alert('Mencetak laporan...');
        // Di sini bisa ditambahkan logika untuk mencetak laporan
    });
}

// Fungsi untuk mengatur tombol generate laporan
function setupGenerateReport() {
    document.getElementById('generate-report').addEventListener('click', function() {
        const reportType = document.getElementById('report-type').value;
        const period = document.getElementById('period').value;
        
        let message = `Menghasilkan laporan: ${reportType === 'summary' ? 'Ringkasan Bulanan' : 
                      reportType === 'incoming' ? 'Arsip Masuk' : 
                      reportType === 'outgoing' ? 'Arsip Keluar' : 'Berdasarkan Kategori'}`;
        
        message += `\nPeriode: ${period === 'this-month' ? 'Bulan Ini' : 
                  period === 'last-month' ? 'Bulan Lalu' : 
                  period === 'this-quarter' ? 'Kuartal Ini' : 
                  period === 'this-year' ? 'Tahun Ini' : 'Kustom'}`;
        
        alert(message);
    });
    
    document.getElementById('reset-filter').addEventListener('click', function() {
        document.getElementById('report-type').selectedIndex = 0;
        document.getElementById('period').selectedIndex = 0;
        document.getElementById('start-date').value = '';
        document.getElementById('end-date').value = '';
        document.querySelectorAll('.custom-dates').forEach(el => el.style.display = 'none');
    });
}