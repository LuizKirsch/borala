document.addEventListener("DOMContentLoaded", function() {
    const buttonNao = document.querySelector(".btn-nao");

    function moveButton() {
        const maxWidth = window.innerWidth - buttonNao.offsetWidth;
        const maxHeight = window.innerHeight - buttonNao.offsetHeight;

        const randomX = Math.floor(Math.random() * maxWidth);
        const randomY = Math.floor(Math.random() * maxHeight);

        buttonNao.style.position = "absolute";
        buttonNao.style.left = `${randomX}px`;
        buttonNao.style.top = `${randomY}px`;
    }

    // Adiciona ouvinte de evento para mouseover
    buttonNao.addEventListener("mouseover", moveButton);
    
    // Adiciona ouvinte de evento para click
    buttonNao.addEventListener("click", moveButton);
    
    // Adiciona ouvinte de evento para toque
    buttonNao.addEventListener("touchstart", moveButton);
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
            // executa o evento após 1 segundo
            setTimeout(function() {
                const defaultModal = document.querySelector('[data-modal-hide="default-modal"]');
                if (defaultModal) {
                    defaultModal.click(); // dispara o evento de modal
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

function enviarParaDiscord() {
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
        var textoMensagem = "";
        if (restauranteSelecionado === "@here Me surpreenda") {
            textoMensagem = restauranteSelecionado + " às " + mensagem;
        } else if (restauranteSelecionado === "Eu vou te surpreender") {
            textoMensagem = "@here Me busca às " + mensagem + " que eu vou te levar em algum lugar.";
        } else if (restauranteSelecionado === "sugestao") {
            var sugestao = document.getElementById("texterea").value;
            textoMensagem = "@here Pô bora no " + sugestao + " às " + mensagem;
        } else {
            textoMensagem = "@here Bora no " + restauranteSelecionado + " às " + mensagem;
        }

        var data = {
            content: textoMensagem
        };

        fetch("https://discord.com/api/webhooks/1242296272774500382/-9T5OPLt2OoZvGZtT_1de9m6fnvbnu5od9cfe2Qy4NqqaqnK4geU9gUn2_6O4MibuYaG", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar mensagem para o Discord');
            }
            console.log('Mensagem enviada com sucesso para o Discord');
        })
        .catch(error => {
            console.error('Erro:', error);
        });

        document.getElementById("horarioInput").value = "";
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        checkConditions();
    }
}