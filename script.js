
    
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

      // Store active Quill editors
      const activeEditors = {};

      // Quill-based inline editing functionality
      function enableEditing(elementId) {
        const element = document.getElementById(elementId);
        
        // Check if already editing
        if (activeEditors[elementId]) {
          return;
        }
        
        // Store original HTML content for potential cancel
        const originalContent = element.innerHTML;
        
        // Hide the original element
        element.classList.add('editing-quill');
        
        // Create Quill wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'quill-wrapper';
        wrapper.id = `quill-wrapper-${elementId}`;
        
        // Create toolbar container
        const toolbarId = `toolbar-${elementId}`;
        const toolbar = document.createElement('div');
        toolbar.id = toolbarId;
        toolbar.innerHTML = `
          <span class="ql-formats">
            <button class="ql-bold" title="Bold"></button>
            <button class="ql-italic" title="Italic"></button>
            <button class="ql-underline" title="Underline"></button>
            <button class="ql-strike" title="Strikethrough"></button>
          </span>
          <span class="ql-formats">
            <button class="ql-list" value="ordered" title="Numbered List"></button>
            <button class="ql-list" value="bullet" title="Bullet List"></button>
          </span>
          <span class="ql-formats">
            <button class="ql-link" title="Add Link"></button>
          </span>
          <span class="ql-formats">
            <button class="ql-clean" title="Clear Formatting"></button>
          </span>
        `;
        
        // Create editor container
        const editorContainer = document.createElement('div');
        editorContainer.id = `editor-${elementId}`;
        
        // Create action buttons
        const actions = document.createElement('div');
        actions.className = 'quill-actions';
        actions.innerHTML = `
          <button class="quill-cancel-btn" onclick="cancelQuillEditing('${elementId}')">Cancel</button>
          <button class="quill-save-btn" onclick="saveQuillEditing('${elementId}')">Save</button>
        `;
        
        // Assemble wrapper
        wrapper.appendChild(toolbar);
        wrapper.appendChild(editorContainer);
        wrapper.appendChild(actions);
        
        // Insert wrapper after the element
        element.parentNode.insertBefore(wrapper, element.nextSibling);
        
        // Initialize Quill
        const quill = new Quill(`#editor-${elementId}`, {
          modules: {
            toolbar: `#${toolbarId}`
          },
          theme: 'snow',
          placeholder: 'Start typing...'
        });
        
        // Set initial content (convert plain text to Delta if needed)
        quill.clipboard.dangerouslyPasteHTML(originalContent);
        
        // Store reference
        activeEditors[elementId] = {
          quill: quill,
          wrapper: wrapper,
          originalContent: originalContent
        };
        
        // Focus the editor
        quill.focus();
        
        // Handle Escape key to cancel
        quill.root.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            cancelQuillEditing(elementId);
          }
        });
      }
      
      function saveQuillEditing(elementId) {
        const editor = activeEditors[elementId];
        if (!editor) return;
        
        const element = document.getElementById(elementId);
        
        // Get HTML content from Quill
        const content = editor.quill.root.innerHTML;
        
        // Update the original element
        element.innerHTML = content;
        
        // Show the original element
        element.classList.remove('editing-quill');
        
        // Remove the Quill wrapper
        editor.wrapper.remove();
        
        // Clean up
        delete activeEditors[elementId];
        
        // Show save confirmation
        element.style.transition = 'background-color 0.3s ease';
        element.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 500);
      }
      
      function cancelQuillEditing(elementId) {
        const editor = activeEditors[elementId];
        if (!editor) return;
        
        const element = document.getElementById(elementId);
        
        // Restore original content
        element.innerHTML = editor.originalContent;
        
        // Show the original element
        element.classList.remove('editing-quill');
        
        // Remove the Quill wrapper
        editor.wrapper.remove();
        
        // Clean up
        delete activeEditors[elementId];
      }
