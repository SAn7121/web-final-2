document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartContainer = document.querySelector('.cart-container');
    const cartDropdown = document.getElementById('cart-dropdown');
    const totalAmount = document.getElementById('total-amount');

    let total = 0;

    // Mostrar/Ocultar el menú desplegable al hacer clic en el icono del carrito
    cartIcon.addEventListener('click', () => {
        cartContainer.classList.toggle('active');
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Evento para incrementar la cantidad al hacer clic en "+"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const price = parseFloat(button.getAttribute('data-price'));
            const quantityInput = button.previousElementSibling;
            let quantity = parseInt(quantityInput.value);

            // Incrementar la cantidad y el total
            quantity++;
            quantityInput.value = quantity;
            total += price;
            totalAmount.textContent = total.toFixed(2);
        });
    });

    // Evento para reducir la cantidad al hacer clic en "-", sin permitir valores negativos
    document.querySelectorAll('.subtract-from-cart').forEach(button => {
        button.addEventListener('click', () => {
            const price = parseFloat(button.nextElementSibling.getAttribute('data-price'));
            const quantityInput = button.nextElementSibling;
            let quantity = parseInt(quantityInput.value);

            // Asegurarse de que la cantidad no baje de 0
            if (quantity > 0) {
                quantity--;
                quantityInput.value = quantity;
                total -= price;

                // Evitar que el total sea NaN o un valor negativo
                if (total < 0) total = 0;
                totalAmount.textContent = total.toFixed(2);
            }
        });
    });

    // Evento para "Quitar" el producto, restablecer la cantidad a 0 y ajustar el total
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.cart-item');
            const quantityInput = item.querySelector('.product-quantity');
            let quantity = parseInt(quantityInput.value);
            const price = parseFloat(button.previousElementSibling.getAttribute('data-price'));

            // Restablecer la cantidad a 0 y ajustar el total
            total -= price * quantity;
            quantityInput.value = 0;

            // Evitar que el total sea NaN o un valor negativo
            if (total < 0 || isNaN(total)) total = 0;
            totalAmount.textContent = total.toFixed(2);
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
});