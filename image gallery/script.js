document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const fileInput = document.getElementById('fileInput');
    const uploadBox = document.getElementById('uploadBox');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    
    let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
    
    // Render existing images from localStorage
    renderGallery();
    
    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            if (!file.type.match('image.*')) return;
            
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const imageUrl = event.target.result;
                images.push(imageUrl);
                saveToLocalStorage();
                renderGallery();
            };
            
            reader.readAsDataURL(file);
        });
        
        // Reset file input to allow selecting the same file again
        fileInput.value = '';
    });
    
    // Drag and drop functionality
    uploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    uploadBox.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
    });
    
    uploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        const files = Array.from(e.dataTransfer.files);
        fileInput.files = e.dataTransfer.files;
        
        const event = new Event('change');
        fileInput.dispatchEvent(event);
    });
    
    // Clear all images
    clearAllBtn.addEventListener('click', function() {
        if (images.length === 0) return;
        
        if (confirm('Are you sure you want to clear all images?')) {
            images = [];
            saveToLocalStorage();
            renderGallery();
        }
    });
    
    // Shuffle images
    shuffleBtn.addEventListener('click', function() {
        if (images.length < 2) return;
        
        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }
        
        saveToLocalStorage();
        renderGallery();
    });
    
    // Delete single image
    function deleteImage(index) {
        images.splice(index, 1);
        saveToLocalStorage();
        renderGallery();
    }
    
    // Save images to localStorage
    function saveToLocalStorage() {
        localStorage.setItem('galleryImages', JSON.stringify(images));
    }
    
    // Render gallery
    function renderGallery() {
        gallery.innerHTML = '';
        
        if (images.length === 0) {
            gallery.innerHTML = '<p class="empty-message">Your gallery is empty. Add some images!</p>';
            return;
        }
        
        images.forEach((imageUrl, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = imageUrl;
            img.className = 'gallery-img';
            img.alt = `Gallery image ${index + 1}`;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteImage(index);
            });
            
            galleryItem.appendChild(img);
            galleryItem.appendChild(deleteBtn);
            gallery.appendChild(galleryItem);
        });
    }
});