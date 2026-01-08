  // Mobile menu toggle
  function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("active");
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      // Close mobile menu after clicking
      document.getElementById("mobileMenu").classList.remove("active");
    });
  });

  // Play video placeholder function
  function playVideo() {
    alert(
      "Video player would open here. Connect to your video hosting service."
    );
  }

  // Add scroll effect to navbar
  window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
      nav.classList.add("shadow-sm");
    } else {
      nav.classList.remove("shadow-sm");
    }
  });

  // Inline editing functionality
  function enableEditing(elementId) {
    const element = document.getElementById(elementId);
    
    // Check if already editing
    if (element.getAttribute('contenteditable') === 'true') {
      return;
    }
    
    // Store original content for potential cancel
    element.setAttribute('data-original', element.textContent);
    
    // Enable editing
    element.setAttribute('contenteditable', 'true');
    element.classList.add('editing');
    element.focus();
    
    // Select all text
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Handle blur (save on click outside)
    element.addEventListener('blur', handleBlur);
    
    // Handle keyboard events
    element.addEventListener('keydown', handleKeydown);
  }
  
  function handleBlur(event) {
    const element = event.target;
    saveEditing(element);
  }
  
  function handleKeydown(event) {
    const element = event.target;
    
    // Save on Enter (without shift for single line, or Ctrl+Enter for multiline)
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      element.blur();
    }
    
    // Cancel on Escape
    if (event.key === 'Escape') {
      event.preventDefault();
      cancelEditing(element);
    }
  }
  
  function saveEditing(element) {
    element.setAttribute('contenteditable', 'false');
    element.classList.remove('editing');
    element.removeAttribute('data-original');
    
    // Remove event listeners
    element.removeEventListener('blur', handleBlur);
    element.removeEventListener('keydown', handleKeydown);
    
    // Optional: Show a subtle save confirmation
    element.style.transition = 'background-color 0.3s ease';
    element.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
    setTimeout(() => {
      element.style.backgroundColor = '';
    }, 500);
  }
  
  function cancelEditing(element) {
    const originalContent = element.getAttribute('data-original');
    if (originalContent) {
      element.textContent = originalContent;
    }
    
    element.setAttribute('contenteditable', 'false');
    element.classList.remove('editing');
    element.removeAttribute('data-original');
    
    // Remove event listeners
    element.removeEventListener('blur', handleBlur);
    element.removeEventListener('keydown', handleKeydown);
  }
