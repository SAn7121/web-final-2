document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartContainer = document.querySelector('.cart-container');
    const cartDropdown = document.getElementById('cart-dropdown');
    const totalAmount = document.getElementById('total-amount');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let total = 0;

    // Mostrar/Ocultar el menú desplegable al hacer clic en el icono del carrito
    cartIcon.addEventListener('click', () => {
        cartContainer.classList.toggle('active');
    });

    // Agregar al carrito y actualizar el total
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const price = parseFloat(button.getAttribute('data-price'));
            total += price;
            totalAmount.textContent = total.toFixed(2);
        });
    });

    // SweetAlert para mostrar detalles del producto al hacer clic en el nombre
    document.querySelectorAll('.product-name').forEach(item => {
        item.addEventListener('click', () => {
            Swal.fire({
                title: item.textContent,
                text: `Detalles del producto: ${item.textContent}`,
                icon: 'info',
                confirmButtonText: 'Cerrar'
            });
        });
    });
});