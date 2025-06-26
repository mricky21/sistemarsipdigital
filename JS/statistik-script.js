// Inisialisasi saat dokumen dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Setup grafik
    setupCharts();
    
    // Setup pemilihan periode waktu
    setupTimeSelector();
    
    // Setup tombol ekspor
    setupExportButton();
});

// Fungsi untuk mengatur grafik
function setupCharts() {
    // Grafik Tren Harian
    const dailyTrendCtx = document.getElementById('daily-trend-chart').getContext('2d');
    const dailyTrendChart = new Chart(dailyTrendCtx, {
        type: 'line',
        data: {
            labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
            datasets: [
                {
                    label: 'Arsip Masuk',
                    data: [24, 18, 22, 20, 26, 15, 17],
                    borderColor: '#2c5cc5',
                    backgroundColor: 'rgba(44, 92, 197, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Arsip Keluar',
                    data: [12, 10, 14, 11, 16, 8, 5],
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        font: {
                            size: 10
                        }
                    }
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
    
    // Grafik Distribusi Kategori
    const categoryDistCtx = document.getElementById('category-distribution-chart').getContext('2d');
    const categoryDistChart = new Chart(categoryDistCtx, {
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
            maintainAspectRatio: false,
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
    
    // Grafik Status Verifikasi
    const verificationCtx = document.getElementById('verification-status-chart').getContext('2d');
    const verificationChart = new Chart(verificationCtx, {
        type: 'pie',
        data: {
            labels: ['Disetujui', 'Pending', 'Ditolak'],
            datasets: [{
                data: [75, 20, 5],
                backgroundColor: [
                    '#27ae60',
                    '#f39c12',
                    '#e74c3c'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
            }
        }
    });
    
    // Grafik Top Pengirim
    const topSendersCtx = document.getElementById('top-senders-chart').getContext('2d');
    const topSendersChart = new Chart(topSendersCtx, {
        type: 'bar',
        data: {
            labels: ['Bendahara', 'HR Dept', 'Sekretaris', 'Tim Penelitian', 'Purchasing'],
            datasets: [{
                label: 'Jumlah Arsip',
                data: [42, 38, 35, 28, 22],
                backgroundColor: '#2c5cc5',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
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
}

// Fungsi untuk mengatur pemilihan periode waktu
function setupTimeSelector() {
    const timeOptions = document.querySelectorAll('.time-option');
    
    timeOptions.forEach(option => {
        option.addEventListener('click', function() {
            document.querySelector('.time-option.active').classList.remove('active');
            this.classList.add('active');
            
            // Di sini bisa ditambahkan logika untuk memperbarui grafik
            // berdasarkan periode waktu yang dipilih
            alert(`Memperbarui statistik untuk periode: ${this.textContent}`);
        });
    });
    
    // Tombol terapkan tanggal kustom
    document.querySelector('.custom-date .btn').addEventListener('click', function() {
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        
        if(!startDate || !endDate) {
            alert('Harap pilih tanggal mulai dan tanggal akhir');
            return;
        }
        
        alert(`Memperbarui statistik dari ${startDate} hingga ${endDate}`);
    });
}

// Fungsi untuk mengatur tombol ekspor
function setupExportButton() {
    document.getElementById('export-stats').addEventListener('click', function() {
        alert('Mengekspor data statistik dalam format CSV...');
        // Di sini bisa ditambahkan logika untuk mengekspor data
    });
}