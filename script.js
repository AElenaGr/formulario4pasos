document.addEventListener('DOMContentLoaded', function () {
    // Referencias a los elementos del DOM
    var infoInput = document.getElementById('info');
    var sizeSelect = document.getElementById('size');
    var qrCodeDiv = document.getElementById('qrcode');
    var btnPrev = document.getElementById('btn-prev');
    var btnNext = document.getElementById('btn-next');
    var textInput = document.getElementById('text');
  
    // Variable para almacenar la información
    var qrData = '';
  
    // Función para generar el QR con tamaño ajustado al contenedor
    function generateQR() {
      var sizeValue = sizeSelect.value;
      var width = sizeValue === 'pequeño' ? 160 : sizeValue === 'mediano' ? 250 : 350;
  
      // Modificar el tamaño y centrar el contenedor #qrcode
      qrCodeDiv.style.width = width + 'px';
      qrCodeDiv.style.height = width + 'px';
      qrCodeDiv.style.display = 'flex';
      qrCodeDiv.style.justifyContent = 'center';
      qrCodeDiv.style.alignItems = 'center';
  
      // Eliminar el código QR existente
      qrCodeDiv.innerHTML = '';
  
      // Generar el código QR
      var qrcode = new QRCode(qrCodeDiv, {
        text: qrData,
        width: width,
        height: width,
      });
  
      // Actualizar el input de texto con la información para prueba
      textInput.value = qrData;
    }
  
    // Función para manejar el cambio de página
    function handlePageChange() {
      var currentPage = document.querySelector('.form-page.active');
      var nextPage = currentPage.nextElementSibling;
  
      if (nextPage) {
        currentPage.classList.remove('active');
        nextPage.classList.add('active');
        btnPrev.disabled = false;
        btnNext.disabled = !nextPage.nextElementSibling; // Deshabilitar el botón Siguiente en la última página
  
        // Ocultar el botón Anterior en el primer paso
        btnPrev.style.display = nextPage.id === 'page1' ? 'none' : 'inline-block';
  
        // Ocultar el botón Siguiente en el último paso
        btnNext.style.display = nextPage.id === 'page3' ? 'none' : 'inline-block';
      }
  
      // Generar el QR al cambiar a la tercera página
      if (nextPage.id === 'page3') {
        generateQR();
      }
    }
  
    // Evento de clic en el botón Anterior
    btnPrev.addEventListener('click', function () {
      var currentPage = document.querySelector('.form-page.active');
      var prevPage = currentPage.previousElementSibling;
  
      if (prevPage) {
        currentPage.classList.remove('active');
        prevPage.classList.add('active');
        btnNext.disabled = false;
        btnPrev.disabled = !prevPage.previousElementSibling; // Deshabilitar el botón Anterior en la primera página
  
        // Mostrar el botón Siguiente al regresar al segundo paso
        btnNext.style.display = 'inline-block';
      }
    });
  
    // Evento de clic en el botón Siguiente
    btnNext.addEventListener('click', function () {
      handlePageChange();
    });
  
    // Evento de cambio en el input de información
    infoInput.addEventListener('input', function () {
      qrData = infoInput.value;
    });
  });
  