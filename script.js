// Obtener elementos del DOM
const INPUT = document.getElementById('peso');
const ERROR = document.getElementById('error');
const VOLDIA = document.getElementById('vd');
const MANT = document.getElementById('man');
const MM2 = document.getElementById('mm2');
const BOTON = document.getElementById('calcular')


// Agregar evento click al botón de calcular
BOTON.addEventListener('click', calcularHidratacion);

// Función para calcular por Holliday-Segar
function calcularHolliday(peso){
    let volumenDiario = 0;
    if (peso <= 10) {
        volumenDiario = peso * 100;
    } else if (peso <= 20) {
        volumenDiario = 1000 + (peso - 10) * 50;
    } else {
        volumenDiario = 1500 + (peso - 20) * 20;
    }
    return volumenDiario;
}

// Función para calcular por Superficie Corporal
function calcularSuperficie(peso){
    let vd;
    let vd2;
    let superficieCorporal;
    superficieCorporal = ((peso * 4) + 7) / (peso + 90);
    vd = superficieCorporal * 1500;
    vd2= superficieCorporal * 2000
    return [vd,vd2];
}

// Función para calcular la hidratación
function calcularHidratacion() {
    peso = parseFloat(INPUT.value);
    if (isNaN(peso) || peso <= 0) {
        // Mostrar mensaje de error si el peso no es un número válido
        ERROR.style.display = 'block';
        VOLDIA.textContent = '';
        MANT.textContent = '';
        MM2.textContent = '';
    } else {
        ERROR.style.display = 'none';
        if (peso <= 30) {
            // Calcular por Holliday-Segar
            let volumenDiario = 0;
            let mantenimiento = 0;
            volumenDiario = calcularHolliday(peso);
            mantenimiento = volumenDiario / 24;
            mm2 = mantenimiento * 1.5;
            // Mostrar resultados
            VOLDIA.textContent = `Volumen diario: ${volumenDiario.toFixed(2)} cc/día`;
            MANT.textContent = `Mantenimiento: ${mantenimiento.toFixed(2)} cc/h`;
            MM2.textContent = `m+m/2: ${mm2.toFixed(2)} cc/h`;
        } else {
            // Calcular por Superficie Corporal
            MM2.textContent = '';
            volumenDiario = calcularSuperficie(peso);

            // Mostrar resultados
            VOLDIA.textContent = `Volumen diario (1500): ${volumenDiario[0].toFixed(2)} cc/día`;
            MANT.textContent = `Volumen diario (2000): ${volumenDiario[1].toFixed(2)} cc/día`;
        }
    }
}
