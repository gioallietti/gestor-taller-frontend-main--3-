
const CargarEstiloFuncion = () => {
    const estilosColorGuardados = JSON.parse(localStorage.getItem('estilosColor'));
    const estilosBordesGuardados = JSON.parse(localStorage.getItem('estilosBordes'));

    if (estilosColorGuardados) {        
        document.documentElement.style.setProperty('--titulo', estilosColorGuardados.tituloColor);
        document.documentElement.style.setProperty('--titulo-texto', estilosColorGuardados.textoTituloColor);
        document.documentElement.style.setProperty('--btn-primary', estilosColorGuardados.btnPrimaryColor);
        document.documentElement.style.setProperty('--btn-primary-hover', estilosColorGuardados.btnPrimaryHoverColor);
        document.documentElement.style.setProperty('--btn-danger', estilosColorGuardados.btnDangerColor);
        document.documentElement.style.setProperty('--btn-danger-hover', estilosColorGuardados.btnDangerHoverColor);
        document.documentElement.style.setProperty('--btn-secondary', estilosColorGuardados.btnSecondaryColor);
        document.documentElement.style.setProperty('--btn-secondary-hover', estilosColorGuardados.btnSecondaryHoverColor);
        document.documentElement.style.setProperty('--input-select', estilosColorGuardados.inputSelect);
        document.documentElement.style.setProperty('--body-bg', estilosColorGuardados.bodyBg);
        document.documentElement.style.setProperty('--card-bg', estilosColorGuardados.cardBg);
        document.documentElement.style.setProperty('--box-shadow', estilosColorGuardados.sombras);
        document.documentElement.style.setProperty('--placeholder', estilosColorGuardados.placeholder);
    }

    if (estilosBordesGuardados) {
        document.documentElement.style.setProperty('--border-radius', estilosBordesGuardados.bordesGeneral);
        document.documentElement.style.setProperty('--border-card', estilosBordesGuardados.bordesCard);
    }
};
export default CargarEstiloFuncion;