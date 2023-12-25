$(document).ready(function () {
    function changeButtonPosition() {
        let posTop = Math.floor(Math.random() * (-200 - 20) + 10);
        let posLeft = Math.floor(Math.random() * (-200 - 20) + 10);

        $(this).css({ top: posTop + "px", left: posLeft + "px" });
    }

    $('.btn-nao').hover(
        changeButtonPosition,
        function () {}
    );

    $('.btn-nao').on('mousedown touchstart', changeButtonPosition);
});

function handleCheckboxClick(checkbox) {
    const checkboxes = document.querySelectorAll('input[name="restaurant"]');
    checkboxes.forEach((item) => {
        if (item !== checkbox) {
            item.checked = false;
            $('#sugestaoInput').slideUp('slow');
        }
    });

    if (checkbox.value === 'sugestao') {
        if (checkbox.checked) {
            $('#sugestaoInput').slideDown('slow');
        } else {
            $('#sugestaoInput').slideUp('slow');
        }
    }
    
    checkConditions();
}


function handleHorarioChange() {
    checkConditions();
}

function checkConditions() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const horarioInput = document.getElementById('horarioInput');
    const enviarBtn = document.getElementById('enviarBtn');

    let isChecked = false;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            isChecked = true;
        }
    });

    if (isChecked && horarioInput.value !== '') {
        enviarBtn.removeAttribute('disabled');
        enviarBtn.classList.add('button');
    } else {
        enviarBtn.setAttribute('disabled', 'disabled');
        enviarBtn.classList.remove('button');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const horarioInput = document.getElementById('horarioInput');
    const enviarBtn = document.getElementById('enviarBtn');

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', checkConditions);
    });

    horarioInput.addEventListener('input', checkConditions);
});

function enviarWhatsApp() {
    var mensagem = document.getElementById("horarioInput").value;
    var numeroWhatsApp = "5551995672942";
    var checkboxes = document.getElementsByName("restaurant");
    var restauranteSelecionado = "";

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            restauranteSelecionado = checkboxes[i].value;
            break;
        }
    }

    if (mensagem.trim() !== "" && restauranteSelecionado.trim() !== "") {
        var mensagemFormatada = encodeURIComponent(mensagem);
        var restauranteFormatado = encodeURIComponent(restauranteSelecionado.trim());

        var linkWhatsApp = "";

        if (restauranteFormatado === "Me%20surpreenda") {
            linkWhatsApp =
                "https://api.whatsapp.com/send?phone=" +
                numeroWhatsApp +
                "&text=" +
                restauranteSelecionado +
                " às " +
                mensagemFormatada;
        } else if (restauranteFormatado === "Eu%20vou%20te%20surpreender") {
            linkWhatsApp =
                "https://api.whatsapp.com/send?phone=" +
                numeroWhatsApp +
                "&text=Me busca às " +
                mensagemFormatada +
                " que eu vou te levar em algum lugar.";
        } else if (restauranteFormatado === "sugestao") {
            var texto = document.getElementById("texterea").value;
            linkWhatsApp =
                "https://api.whatsapp.com/send?phone=" +
                numeroWhatsApp +
                "&text=Pô bora no " +
                texto +
                " às " +
                mensagemFormatada;
        } else {
            linkWhatsApp =
                "https://api.whatsapp.com/send?phone=" +
                numeroWhatsApp +
                "&text=Bora%20no%20" +
                restauranteSelecionado +
                " às " +
                mensagemFormatada;
        }

        setTimeout(function() {
            window.open(linkWhatsApp);
            // Executa o evento após 1 segundo
            setTimeout(function() {
                const defaultModal = document.querySelector('[data-modal-hide="default-modal"]');
                if (defaultModal) {
                    defaultModal.click(); // Dispara o evento de modal
                }
            }, 1000);
        }, 1000);
        document.getElementById("horarioInput").value = "";
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        checkConditions();
    }
}

