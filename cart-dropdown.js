document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartContainer = document.querySelector('.cart-container');
    const cartDropdown = document.getElementById('cart-dropdown');
    const totalAmount = document.getElementById('total-amount');

    let total = 0;
    let cart={};

    const searchIcon = document.getElementById('search-icon');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchInput = document.getElementById('search-input');

    // Manejo del evento al hacer clic en el icono de carrito
    cartIcon.addEventListener("click", () => {
        // Cambia entre mostrar y ocultar el menú de carrito
        cartDropdown.classList.toggle("active");
        // Oculta el menú de búsqueda si está abierto
        searchDropdown.classList.remove("active"); // Cambia display a ninguna clase activa
    });

    // Manejo del evento al hacer clic en el icono de búsqueda
    searchIcon.addEventListener("click", () => {
        // Cambia entre mostrar y ocultar el menú de búsqueda
        searchDropdown.classList.toggle("active");
        // Oculta el menú de carrito si está abierto
        cartDropdown.classList.remove("active"); // Cambia display a ninguna clase activa
    });


    // Palabras clave y sus redirecciones
    const searchKeywords = {
        'curso': 'index.html',
        'cu': 'index.html',
        'cur': 'index.html',
        'tecnologia': 'TEC.html',
        'tecno': 'TEC.html',
        'tec': 'TEC.html',
        'te': 'TEC.html',
        'tecnologi': 'TEC.html',
        'tecnolo': 'TEC.html',
        'simulacion': 'Sim.html',
        'sim': 'Sim.html',
        'si': 'Sim.html',
        'simula': 'Sim.html',
        'simulac': 'Sim.html',
        'beneficios': 'Bef.html',
        'benefi': 'Bef.html',
        'ben': 'Bef.html',
        'be': 'Bef.html',
        'benefic': 'Bef.html',
        'eficiencia': 'TEC.html', // Ejemplo adicional
        'efi': 'TEC.html',
        'efici': 'TEC.html',
        'eficienci': 'TEC.html',
        'eficien': 'TEC.html',
        'ef': 'TEC.html',
        'instalacion': 'Sim.html', // Ejemplo adicional
        'insta': 'Sim.html',
        'ins': 'Sim.html',
        'instala': 'Sim.html',
        'instalaci': 'Sim.html',
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

    // Recuperar carrito y total desde localStorage
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        total = parseFloat(localStorage.getItem('total')) || 0;
        updateCartDisplay();
    }

    // Función para actualizar el total y guardar en localStorage
    function updateTotal() {
        totalAmount.textContent = `$${total.toFixed(2)}`;
        localStorage.setItem('total', total.toFixed(2));
    }

    // Función para actualizar la visualización del carrito
    function updateCartDisplay() {
        document.querySelectorAll('.cart-item').forEach(item => {
            const productName = item.querySelector('.product-name').textContent.trim();
            const quantityDisplay = item.querySelector('.quantity');
            const decreaseButton = item.querySelector('.quantity-decrease');
            
            const productQuantity = cart[productName]?.quantity || 0;
            quantityDisplay.textContent = productQuantity;

            decreaseButton.disabled = productQuantity === 0;
        });
        updateTotal();
    }

    // Evento para incrementar la cantidad al hacer clic en "+"
    document.querySelectorAll('.quantity-increase').forEach(button => {
        button.addEventListener('click', () => {
            const price = parseFloat(button.getAttribute('data-price'));
            const quantityDisplay = button.previousElementSibling;
            const productName = button.closest('.cart-item').querySelector('.product-name').textContent.trim();

            cart[productName] = cart[productName] || { quantity: 0, price };
            cart[productName].quantity++;
            quantityDisplay.textContent = cart[productName].quantity;

            total += price;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        });
    });

    // Evento para reducir la cantidad al hacer clic en "-"
    document.querySelectorAll('.quantity-decrease').forEach(button => {
        button.addEventListener('click', () => {
            const increaseButton = button.nextElementSibling.nextElementSibling;
            const price = parseFloat(increaseButton.getAttribute('data-price'));
            const quantityDisplay = button.nextElementSibling;
            const productName = button.closest('.cart-item').querySelector('.product-name').textContent.trim();

            if (cart[productName] && cart[productName].quantity > 0) {
                cart[productName].quantity--;
                quantityDisplay.textContent = cart[productName].quantity;
                total -= price;

                if (cart[productName].quantity === 0) {
                    delete cart[productName];
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            }
        });
    });

    // Evento para "Quitar" el producto, restablecer la cantidad a 0 y ajustar el total
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.cart-item');
            const productName = item.querySelector('.product-name').textContent.trim();
            const quantityDisplay = item.querySelector('.quantity');

            if (cart[productName]) {
                total -= cart[productName].price * cart[productName].quantity;
                delete cart[productName];
                quantityDisplay.textContent = '0';
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            }
        });
    });

    // Función para actualizar el total al cargar
    updateTotal();

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
        const cardRegex = /^\d{16}$/; // Mantener esta regex
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
        if (!cardRegex.test(tarjeta.replace(/\s+/g, ''))) { // Eliminar espacios antes de la validación
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

        // Añadir el total a pagar en el formulario
        const formattedTotal = `$${total.toFixed(2)}`;

        Swal.fire({
            title: 'Formulario de Pago',
            html: `
            <input id="nombre" class="swal2-input" placeholder="Nombre">
            <input id="apellido" class="swal2-input" placeholder="Apellido">
            <input id="email" type="email" class="swal2-input" placeholder="Correo Electrónico">
            <input id="tarjeta" class="swal2-input" placeholder="Número de Tarjeta (16 dígitos)" maxlength="19">
            <input id="cvv" class="swal2-input" placeholder="CVV (3-4 dígitos)">
            <input id="vencimiento" class="swal2-input" placeholder="Fecha de Vencimiento (MM/AA)">
            <p>Total a Pagar: <strong>${formattedTotal}</strong></p>
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
                
                // Restablecer el total y el carrito en localStorage
                total = 0;
                cart = {};  // Limpia el carrito de productos
                localStorage.setItem('total', '0');
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Actualiza el total y el carrito en la interfaz
                totalAmount.textContent = `$${total.toFixed(2)}`;
                document.querySelectorAll('.cart-item .quantity').forEach(el => el.textContent = '0');
                document.querySelectorAll('.quantity-decrease').forEach(btn => btn.disabled = true);
                
                // Llama a las funciones para actualizar la visualización del carrito
                updateTotal();
                updateCartDisplay();
            }
        });

        // Agregar el evento de formateo de número de tarjeta después de mostrar el SweetAlert
        Swal.getPopup().querySelector('#tarjeta').addEventListener('input', (event) => {
            formatCardNumber(event.target);
        });
    });

    // Función para formatear el número de tarjeta en grupos de 4 dígitos
    function formatCardNumber(input) {
        let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';
        for (let i = 0; i < value.length; i += 4) {
            if (i > 0) formattedValue += ' ';
            formattedValue += value.substring(i, i + 4);
        }
        input.value = formattedValue;
    }


    console.log("Total después de compra:", total);
    console.log("Cart después de compra:", cart);
    console.log("LocalStorage después de compra:", localStorage.getItem('cart'), localStorage.getItem('total'));
});

