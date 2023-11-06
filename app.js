const frontContainer = document.querySelector('.front-container');
const backContainer = document.querySelector('.back-container');

/*Inputs de calificaciones*/
const inputObjetivo = document.querySelector('#input-objetivo');
const inputAtendidas = document.querySelector('#input-atendidas');
const inputDerivadas = document.querySelector('#input-derivadas');


const containerTituloDesempenio = document.querySelector('.container-titulo-card');
const tituloCard = document.querySelector('.titulo-card');
const containerPorcentaje = document.querySelector('.container-porcentaje');
const porcentaje = document.querySelector('.porcentaje');

const mensaje = document.querySelector('#mensaje');
const mensajeObjetivo = document.querySelector('#mensaje-objetivo');

const calcButton = document.querySelector('#calc-button');
const calcular = document.querySelector('#calcular');
const cerrar = document.querySelector('#cerrado');

let objetivoMovil;
let totalAtendidas;
let totalDerivadas;
let derivaciones;
let desempenio;

const resultados = [
    {
        resultado: 'SOBRESALIENTE',
        estilos: 'sobresaliente',
        mensaje: '¡Excelente! 👏🏼',
        compararDesempenio(des) {
            return des > 115;
        }
    },
    {
        resultado: 'ADECUADO',
        estilos: 'adecuado',
        mensaje: '¡A seguir así! 🙌🏼',
        compararDesempenio(des) {
            return des >= 100 && des <= 115;
        }
    },
    {
        resultado: 'A MEJORAR',
        estilos: 'a-mejorar',
        mensaje: 'Podés lograrlo 💪🏼',
        compararDesempenio(des) {
            return des >= 70 && des < 100;
        }
    },
    {
        resultado: 'INADECUADO',
        estilos: 'inadecuado',
        mensaje: '¡Manos a la obra!',
        compararDesempenio(des) {
            return des < 70;
        }
    }
];

const calcularDerivaciones = (total, der) => {
    return parseFloat((der * 100) / total).toFixed(2);
}

const calcularLlamadasASumar = (totalAte, totalDer, obj, der) => {
    let totalAtendidasInicial = totalAte;
    let derivadasInicial = der;
    let accLlamadas;

    for (let i = 0; derivadasInicial > obj; i++) {
        derivadasInicial = calcularReingreso(totalAtendidasInicial, totalDer);
        totalAtendidasInicial++;
        accLlamadas = i;
    }

    return accLlamadas;

}

const calcularDesempenio = (der, obj) => {
    return (parseFloat(((obj - der) / obj) + 1) *100).toFixed(2);
}

const filtrarResultadoMetrica = (des) => {
    return resultados.filter(result => result.compararDesempenio(des));
}

const animar = () => {
    frontContainer.classList.toggle('front-rotate');
    backContainer.classList.toggle('back-rotate');
    calcButton.classList.toggle('cerrar');
    calcular.classList.toggle('inactive');
    cerrar.classList.toggle('inactive');
}

inputObjetivo.addEventListener('input', () => {
    objetivoMovil = parseFloat(inputObjetivo.value).toFixed(2);
});

inputAtendidas.addEventListener('input', () => {
    totalAtendidas = parseInt(inputAtendidas.value); 
});

inputDerivadas.addEventListener('input', () => {
    totalDerivadas = parseInt(inputDerivadas.value);
});

calcButton.addEventListener('click', () => {

    derivaciones = calcularReingreso(totalAtendidas, totalDerivadas);

    if(derivaciones > objetivoMovil){
        llamadasASumar = calcularLlamadasASumar(totalAtendidas, totalDerivadas, objetivoMovil,derivaciones);

        mensajeObjetivo.innerText = `Sumá ${llamadasASumar} llamadas y alcanzá el objetivo`;
    } else {
        mensajeObjetivo.innerText = 'Estás en objetivo';
    }

    desempenio = calcularDesempenio(derivaciones, objetivoMovil);

    resultadoMetrica = filtrarResultadoMetrica(desempenio);

    containerTituloDesempenio.classList.toggle(resultadoMetrica[0].estilos);
    tituloCard.innerText = resultadoMetrica[0].resultado;
    containerPorcentaje.classList.toggle(resultadoMetrica[0].estilos);
    porcentaje.innerText = `${desempenio}%`;
    mensaje.innerText = resultadoMetrica[0].mensaje;

    animar();
    
});