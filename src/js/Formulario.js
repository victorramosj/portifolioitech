document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const telefoneInput = document.getElementById('telefone');

    // --- Lógica de Máscara de Telefone ---
    function maskPhone(value) {
        if (!value) return ''; // Retorna string vazia se o valor for nulo ou vazio

        value = value.replace(/\D/g, ""); // Remove tudo que não é dígito

        // Aplica a máscara: (XX) XXXXX-XXXX (para 9 dígitos) ou (XX) XXXX-XXXX (para 8 dígitos)
        if (value.length > 10) { // Ex: 11 91234 5678 -> (11) 91234-5678
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (value.length > 6) { // Ex: 11 1234 5678 (8 dígitos) -> (11) 1234-5678
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (value.length > 2) { // Ex: 112 -> (11) 2
            value = value.replace(/^(\d{2})(\d)/, "($1) $2");
        } else if (value.length > 0) { // Ex: 1 -> (1
             value = value.replace(/^(\d*)/, "($1");
        }
        return value;
    }

    if (telefoneInput) {
        // Aplica a máscara ao digitar
        telefoneInput.addEventListener('input', function (e) {
            e.target.value = maskPhone(e.target.value);
        });
        // Garante a formatação final quando o campo perde o foco
        telefoneInput.addEventListener('blur', function (e) {
            e.target.value = maskPhone(e.target.value);
        });
    }

    // --- Lógica de Validação do Formulário ---

    // Listener para o evento de envio do formulário
    form.addEventListener('submit', function (event) {
        // Previne o comportamento padrão de envio do formulário HTML5 e a recarga da página
        event.preventDefault();
        event.stopPropagation(); // Impede que o evento de submit suba na hierarquia do DOM

        // Adiciona a classe 'was-validated' ao formulário para que o Bootstrap
        // comece a exibir o feedback de validação. Isso deve acontecer APENAS no submit.
        form.classList.add('was-validated');

        // Verifica a validade do formulário. A função checkValidity() nativa do HTML5/Bootstrap
        // considera todos os campos requeridos e com tipos específicos (como email).
        if (form.checkValidity()) {
            // Formulário é válido:
            successMessage.classList.remove('d-none'); // Mostra a mensagem de sucesso
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Rola até ela

            // Simula o envio do formulário (substitua esta parte por sua chamada AJAX real)
            console.log('Formulário enviado com sucesso (simulado)!');

            // Reseta o formulário e esconde a mensagem de sucesso após um tempo
            setTimeout(() => {
                form.reset(); // Limpa todos os campos do formulário
                form.classList.remove('was-validated'); // Remove a classe de validação para ocultar mensagens e bordas vermelhas/verdes
                successMessage.classList.add('d-none'); // Esconde a mensagem de sucesso
                
                // Limpa quaisquer classes de validação residuais (is-invalid, is-valid) de todos os campos
                form.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
                    el.classList.remove('is-invalid', 'is-valid');
                });

            }, 5000); // Esconde após 5 segundos
        } else {
            // Formulário é inválido:
            // A classe 'was-validated' já foi adicionada, então o Bootstrap exibirá as mensagens.
            console.log('Formulário inválido. Corrija os erros.');

            // Opcional: Garante que os campos inválidos tenham a classe 'is-invalid' e os válidos a removam.
            // Isso pode ser útil para campos não 'required' que têm validação por tipo (ex: email)
            form.querySelectorAll('input, select, textarea').forEach(field => {
                if (field.checkValidity()) {
                    field.classList.remove('is-invalid');
                    field.classList.add('is-valid'); // Opcional: adicionar classe para feedback verde (valido)
                } else {
                    field.classList.add('is-invalid');
                    field.classList.remove('is-valid');
                }
            });
        }
    });

    // Validação em tempo real (feedback ao digitar/interagir)
    // Só aplica os estilos de validação se o formulário JÁ estiver no estado 'was-validated'
    // (ou seja, após uma tentativa de envio inicial).
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.addEventListener('input', function () {
            if (form.classList.contains('was-validated')) { // Verifica se o formulário já foi "validado" uma vez
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.add('is-invalid');
                    this.classList.remove('is-valid');
                }
            }
        });

        // Para selects e checkboxes, o evento 'change' é mais adequado
        field.addEventListener('change', function () {
            if (form.classList.contains('was-validated')) {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.add('is-invalid');
                    this.classList.remove('is-valid');
                }
            }
        });
    });

    // Ao carregar a página, remove qualquer classe de validação que possa ter sido mantida
    // pelo navegador (ex: autocompletar que aciona validação antes da interação).
    form.classList.remove('was-validated');
    form.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
        el.classList.remove('is-invalid', 'is-valid');
    });
});