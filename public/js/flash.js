  
      setTimeout(function () {
        const alertEl = document.getElementById('successAlert');
        if (alertEl) {
          alertEl.classList.remove('show');
          alertEl.classList.add('fade-out');
          setTimeout(() => {
            const alert = bootstrap.Alert.getOrCreateInstance(alertEl);
            alert.close(); // fully remove it from DOM
          }, 500); // Wait for fade-out transition to complete
        }
      }, 2000);
    
      
   
         setTimeout(function () {
        const alertEl = document.getElementById('errorAlert');
        if (alertEl) {
          alertEl.classList.remove('show');
          alertEl.classList.add('fade-out');
          setTimeout(() => {
            const alert = bootstrap.Alert.getOrCreateInstance(alertEl);
            alert.close(); // fully remove it from DOM
          }, 500); // Wait for fade-out transition to complete
        }
      }, 2000);
    
      
   