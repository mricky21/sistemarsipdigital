// Dashboard Script
document.addEventListener('DOMContentLoaded', function() {
    // Update current date
    function updateCurrentDate() {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        document.getElementById('current-date').textContent = 
            today.toLocaleDateString('id-ID', options);
    }
    
    updateCurrentDate();
    
    // Simulate chart loading
    function simulateChartLoading() {
        const charts = document.querySelectorAll('.chart');
        charts.forEach(chart => {
            const placeholder = chart.querySelector('.chart-placeholder');
            if (placeholder) {
                setTimeout(() => {
                    placeholder.innerHTML = `
                        <div class="chart-success">
                            <i class="fas fa-check-circle"></i>
                            <p>Grafik berhasil dimuat</p>
                        </div>
                    `;
                    
                    // Add styles to the success message
                    const style = document.createElement('style');
                    style.textContent = `
                        .chart-success {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            height: 100%;
                            text-align: center;
                        }
                        
                        .chart-success i {
                            font-size: 3rem;
                            color: var(--success);
                            margin-bottom: 1rem;
                        }
                        
                        .chart-success p {
                            color: var(--dark);
                            font-size: 1rem;
                        }
                    `;
                    chart.appendChild(style);
                }, 2000);
            }
        });
    }
    
    simulateChartLoading();
    
    // Handle action buttons
    function setupActionButtons() {
        document.querySelectorAll('.action-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Add animation
                this.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
                
                // Specific actions
                if (this.querySelector('.fa-sync-alt')) {
                    // Refresh action
                    document.querySelectorAll('.stat-card').forEach(card => {
                        card.style.opacity = '0.5';
                    });
                    
                    setTimeout(() => {
                        document.querySelectorAll('.stat-card').forEach(card => {
                            card.style.opacity = '1';
                        });
                    }, 500);
                    
                    // Show notification
                    showNotification('Data statistik diperbarui');
                }
                
                if (this.querySelector('.fa-bell')) {
                    // Notifications action
                    showNotification('Tidak ada notifikasi baru');
                }
                
                if (this.querySelector('.fa-cog')) {
                    // Settings action
                    showNotification('Buka pengaturan sistem');
                }
                
                if (this.querySelector('.fa-eye')) {
                    // View document action
                    showNotification('Membuka pratinjau dokumen');
                }
                
                if (this.querySelector('.fa-download')) {
                    // Download action
                    showNotification('Mengunduh dokumen...');
                }
                
                if (this.querySelector('.fa-share-alt')) {
                    // Share action
                    showNotification('Berbagi dokumen');
                }
            });
        });
    }
    
    setupActionButtons();
    
    // Show notification
    function showNotification(message) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-info-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                padding: 15px 20px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                border-left: 4px solid var(--primary);
                z-index: 1000;
                transform: translateX(120%);
                transition: transform 0.3s ease-out;
                display: flex;
                align-items: center;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification i {
                color: var(--primary);
                font-size: 1.2rem;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }, 3000);
    }
    
    // Handle document actions
    function setupDocumentActions() {
        document.querySelectorAll('.document-actions .action-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Get document name
                const documentRow = this.closest('tr');
                const documentName = documentRow.querySelector('.document-type span').textContent;
                
                // Show appropriate notification
                if (this.querySelector('.fa-eye')) {
                    showNotification(`Membuka pratinjau: ${documentName}`);
                }
                if (this.querySelector('.fa-download')) {
                    showNotification(`Mengunduh: ${documentName}`);
                }
                if (this.querySelector('.fa-share-alt')) {
                    showNotification(`Berbagi: ${documentName}`);
                }
            });
        });
    }
    
    setupDocumentActions();
});