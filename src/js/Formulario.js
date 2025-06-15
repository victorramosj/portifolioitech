

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (form.checkValidity()) {
            // Simulação de envio
            form.classList.remove('was-validated');
            successMessage.classList.remove('d-none');

            // Scroll para a mensagem de sucesso
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Resetar formulário após 5 segundos
            setTimeout(() => {
                form.reset();
                successMessage.classList.add('d-none');
            }, 5000);
        } else {
            form.classList.add('was-validated');
        }
    });

    // Validação em tempo real
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.addEventListener('input', function () {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
            } else {
                this.classList.add('is-invalid');
            }
        });
    });
});
