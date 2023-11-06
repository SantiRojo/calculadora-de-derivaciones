const frontContainer = document.querySelector('.front-container');
const backContainer = document.querySelector('.back-container');

/*Inputs de calificaciones*/
const inputObjetivo = document.querySelector('#input-objetivo');
const inputAtendidas = document.querySelector('#input-atendidas');
const inputReingresadas = document.querySelector('#input-reingresadas');


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
let totalReingresadas;
let reingreso;
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

const calcularReingreso = (total, rein) => {
    return parseFloat((rein * 100) / total).toFixed(2);
}

const calcularLlamadasASumar = (totalIn, totalRein, obj, rein) => {
    let totalAtendidasInicial = totalIn;
    let reingresoInicial = rein;
    let accLlamadas;

    for (let i = 0; reingresoInicial > obj; i++) {
        reingresoInicial = calcularReingreso(totalAtendidasInicial, totalRein);
        totalAtendidasInicial++;
        accLlamadas = i;
    }

    return accLlamadas;

}

const calcularDesempenio = (rein, obj) => {
    return (parseFloat(((obj - rein) / obj) + 1) *100).toFixed(2);
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

inputReingresadas.addEventListener('input', () => {
    totalReingresadas = parseInt(inputReingresadas.value);
});

calcButton.addEventListener('click', () => {

    reingreso = calcularReingreso(totalAtendidas, totalReingresadas);

    if(reingreso > objetivoMovil){
        llamadasASumar = calcularLlamadasASumar(totalAtendidas, totalReingresadas, objetivoMovil,reingreso);

        mensajeObjetivo.innerText = `Sumá ${llamadasASumar} llamadas y alcanzá el objetivo`;
    } else {
        mensajeObjetivo.innerText = 'Estás en objetivo';
    }

    desempenio = calcularDesempenio(reingreso, objetivoMovil);

    resultadoMetrica = filtrarResultadoMetrica(desempenio);

    containerTituloDesempenio.classList.toggle(resultadoMetrica[0].estilos);
    tituloCard.innerText = resultadoMetrica[0].resultado;
    containerPorcentaje.classList.toggle(resultadoMetrica[0].estilos);
    porcentaje.innerText = `${desempenio}%`;
    mensaje.innerText = resultadoMetrica[0].mensaje;

    animar();
    
});