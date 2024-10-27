document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartContainer = document.querySelector('.cart-container');
    const cartDropdown = document.getElementById('cart-dropdown');
    const totalAmount = document.getElementById('total-amount');

    let total = 0;

    const searchIcon = document.getElementById('search-icon');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchInput = document.getElementById('search-input');

    // Palabras clave y sus redirecciones
    const searchKeywords = {
        'curso': 'index.html',
        'tecnologia': 'TEC.html',
        'simulacion': 'Sim.html',
        'beneficios': 'Bef.html',
        'eficiencia': 'TEC.html', // Ejemplo adicional
        'instalacion': 'Sim.html', // Ejemplo adicional
    };

    // Mostrar/Ocultar el menú desplegable al hacer clic en el icono de búsqueda
    searchIcon.addEventListener('click', () => {
        searchDropdown.style.display = searchDropdown.style.display === 'block' ? 'none' : 'block';
        searchInput.focus();
    });

    // Buscar palabra clave y redirigir
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            const page = searchKeywords[searchTerm];
            
            if (page) {
                window.location.href = page;
            }
            else {
                Swal.fire({
                    title: 'No se encontraron resultados para tu búsqueda.',
                    confirmButtonText: "Cerrar"
                });
            }
        }
        
    });

    // Mostrar/Ocultar el menú desplegable al hacer clic en el icono del carrito
    cartIcon.addEventListener('click', () => {
        cartContainer.classList.toggle('active');
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Evento para incrementar la cantidad al hacer clic en "+"
    document.querySelectorAll('.quantity-increase').forEach(button => {
        button.addEventListener('click', () => {
            const price = parseFloat(button.getAttribute('data-price'));
            const quantityDisplay = button.previousElementSibling;
            let quantity = parseInt(quantityDisplay.textContent);

            // Incrementar la cantidad y el total
            quantity++;
            quantityDisplay.textContent = quantity;
            total += price;
            totalAmount.textContent = total.toFixed(2);

            // Habilita el botón "-" si la cantidad es mayor a 0
            const decreaseButton = button.previousElementSibling.previousElementSibling;
            if (quantity > 0) {
                decreaseButton.disabled = false;
            }
        });
    });

    // Evento para reducir la cantidad al hacer clic en "-", sin permitir valores negativos
    document.querySelectorAll('.quantity-decrease').forEach(button => {
        button.addEventListener('click', () => {
            const price = parseFloat(button.nextElementSibling.getAttribute('data-price'));
            const quantityDisplay = button.nextElementSibling;
            let quantity = parseInt(quantityDisplay.textContent);

            // Asegurarse de que la cantidad no baje de 0
            if (quantity > 0) {
                quantity--;
                quantityDisplay.textContent = quantity;
                total -= price;

                // Evitar que el total sea negativo
                if (total < 0) total = 0;
                totalAmount.textContent = total.toFixed(2);
            }

            // Desactiva el botón "-" si la cantidad es 0
            if (quantity === 0) {
                button.disabled = true;
            }
        });
    });

    // Evento para "Quitar" el producto, restablecer la cantidad a 0 y ajustar el total
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.cart-item');
            const quantityDisplay = item.querySelector('.quantity');
            let quantity = parseInt(quantityDisplay.textContent);
            const price = parseFloat(button.previousElementSibling.getAttribute('data-price'));

            // Restablecer la cantidad a 0 y ajustar el total
            total -= price * quantity;
            quantityDisplay.textContent = '0';

            // Evitar que el total sea negativo
            if (total < 0 || isNaN(total)) total = 0;
            totalAmount.textContent = total.toFixed(2);

            // Desactivar el botón "-" después de quitar el producto
            const decreaseButton = item.querySelector('.quantity-decrease');
            decreaseButton.disabled = true;
        });
    });

    // SweetAlert para mostrar detalles del producto al hacer clic en el nombre
    document.querySelectorAll('.product-name').forEach(item => {
        item.addEventListener('click', () => {
            Swal.fire({
                title: item.textContent,
                text: `Detalles del producto: ${item.textContent}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, amet molestiae, et 
                minima eaque voluptates recusandae enim illum ipsum voluptas nulla ut eveniet dolore id 
                quibusdam magnam facere optio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Architecto ipsam nesciunt nam beatae cum, earum culpa quae maxime delectus corrupti sit 
                molestiae error distinctio fuga dignissimos dolorem consectetur saepe iure.`,
                icon: 'info',
                confirmButtonText: 'Cerrar'
            });
        });
    });

    // Función para validar los datos del formulario de pago
    function validateForm(data) {
        const { nombre, apellido, email, tarjeta, cvv, vencimiento } = data;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cardRegex = /^\d{16}$/;
        const cvvRegex = /^\d{3,4}$/;
        const vencimientoRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

        if (!nombre.trim() || !apellido.trim()) {
            Swal.showValidationMessage('Nombre y apellido son obligatorios.');
            return false;
        }
        if (!emailRegex.test(email)) {
            Swal.showValidationMessage('Correo electrónico inválido.');
            return false;
        }
        if (!cardRegex.test(tarjeta)) {
            Swal.showValidationMessage('Número de tarjeta inválido. Debe tener 16 dígitos.');
            return false;
        }
        if (!cvvRegex.test(cvv)) {
            Swal.showValidationMessage('CVV inválido. Debe tener 3 o 4 dígitos.');
            return false;
        }
        if (!vencimientoRegex.test(vencimiento)) {
            Swal.showValidationMessage('Fecha de vencimiento inválida. Formato: MM/AA.');
            return false;
        }
        return true;
    }

    // Evento para "Pagar" que abre el formulario de pago
    document.getElementById('checkout-button').addEventListener('click', () => {
        if (total === 0) {
            Swal.fire('Tu carrito está vacío', 'Agrega productos antes de pagar', 'info');
            return;
        }

        Swal.fire({
            title: 'Formulario de Pago',
            html: `
                <input id="nombre" class="swal2-input" placeholder="Nombre">
                <input id="apellido" class="swal2-input" placeholder="Apellido">
                <input id="email" type="email" class="swal2-input" placeholder="Correo Electrónico">
                <input id="tarjeta" class="swal2-input" placeholder="Número de Tarjeta (16 dígitos)">
                <input id="cvv" class="swal2-input" placeholder="CVV (3-4 dígitos)">
                <input id="vencimiento" class="swal2-input" placeholder="Fecha de Vencimiento (MM/AA)">
            `,
            showCancelButton: true,
            confirmButtonText: 'Realizar Compra',
            preConfirm: () => {
                const nombre = document.getElementById('nombre').value;
                const apellido = document.getElementById('apellido').value;
                const email = document.getElementById('email').value;
                const tarjeta = document.getElementById('tarjeta').value;
                const cvv = document.getElementById('cvv').value;
                const vencimiento = document.getElementById('vencimiento').value;

                const formData = { nombre, apellido, email, tarjeta, cvv, vencimiento };

                if (!validateForm(formData)) {
                    return false; // Detener SweetAlert si hay errores de validación
                }

                return formData;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const email = result.value.email; // Obtener el correo electrónico ingresado

                // Confirmación de compra exitosa
                Swal.fire(
                    'Compra Realizada',
                    `Tu pago se realizó correctamente. Se te ha enviado un mail a ${email} con toda la información correspondiente y las fechas de las inscripciones.`,
                    'success'
                );

                // Restablecer el total del carrito
                total = 0;
                totalAmount.textContent = total.toFixed(2);

                // Opcional: limpiar cantidades y desactivar botones de disminuir en el carrito
                document.querySelectorAll('.quantity').forEach(el => el.textContent = '0');
                document.querySelectorAll('.quantity-decrease').forEach(btn => btn.disabled = true);
            }
        });
    });
});