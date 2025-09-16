// SCRIPT: delegación + accesibilidad

document.addEventListener('DOMContentLoaded', () => {
    // Delegación: manejar clicks en botones .ver-caso, botones .cerrar y clicks en backdrop
    document.body.addEventListener('click', (e) => {
        // Abrir modal si se hace click en botón "Ver Caso"
        const openBtn = e.target.closest('.ver-caso');
        if (openBtn) {
            const id = openBtn.dataset.caso;
            const modal = document.getElementById('modalCaso' + id);
            if (modal) {
                modal.style.display = 'flex';
                modal.setAttribute('aria-hidden', 'false');
                // bloquear scroll de fondo
                document.body.style.overflow = 'hidden';
                // mover foco al contenido para accesibilidad
                const content = modal.querySelector('.custom-modal-content');
                    if (content) content.focus();
            }
            return;
        }

        // Cerrar si se hace click en la X (cerrar)
        const closeBtn = e.target.closest('.cerrar');
        if (closeBtn) {
            const modal = closeBtn.closest('.custom-modal');
            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        return;
        }

        // Cerrar si se hace click en el backdrop (fuera del cuadro)
        const clickedModal = e.target.closest('.custom-modal');
        if (clickedModal && e.target === clickedModal) {
            clickedModal.style.display = 'none';
            clickedModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.custom-modal').forEach(m => {
                m.style.display = 'none';
                m.setAttribute('aria-hidden', 'true');
            });
            document.body.style.overflow = '';
        }
    });
});