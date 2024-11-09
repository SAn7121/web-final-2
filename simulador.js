document.getElementById("calcularAhorro").addEventListener("click", calcularAhorro);
function calcularAhorro() {
    const paredes = parseInt(document.getElementById("paredes").value);
    const ventanas = parseInt(document.getElementById("ventanas").value);
    const techo = parseInt(document.getElementById("techo").value);
    const iluminacion = parseInt(document.getElementById("iluminacion").value);

    const ahorroTotal = paredes + ventanas + techo + iluminacion;
    const porcentaje = Math.min(ahorroTotal, 100); // Limitar a 100%

    // Actualizar el texto con el mensaje personalizado de ahorro
    document.getElementById("mensaje-porcentaje").innerText = `Te estás ahorrando un ${porcentaje}% de energía con los materiales marcados`;

    // Calcular la rotación de la aguja y aplicarla al velocímetro
    const aguja = document.querySelector(".aguja");
    const rotation = (porcentaje * 180) / 100 - 90; // Calcular el ángulo de la aguja
    aguja.style.transform = `rotate(${rotation}deg)`;

    // Mostrar el porcentaje en el velocímetro
    document.getElementById("velocimetro-porcentaje").innerText = `${porcentaje}%`;
}

function reiniciarSimulador() {
    document.getElementById("paredes").value = 0;
    document.getElementById("ventanas").value = 0;
    document.getElementById("techo").value = 0;
    document.getElementById("iluminacion").value = 0;

    // Reiniciar el mensaje de ahorro
    document.getElementById("mensaje-porcentaje").innerText = "Te estás ahorrando un 0% de energía con los materiales marcados";

    // Reiniciar la posición de la aguja en el velocímetro
    const aguja = document.querySelector(".aguja");
    aguja.style.transform = "rotate(-90deg)";

    // Reiniciar el porcentaje en el velocímetro
    document.getElementById("velocimetro-porcentaje").innerText = "0%";
}