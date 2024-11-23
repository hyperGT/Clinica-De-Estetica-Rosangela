document.addEventListener('DOMContentLoaded', ()=> {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', 
        headerToolbar: {
            left: 'today',
            center: 'title',
            right: ''
        }
    });
    calendar.render();

    // function para alterar o mês do calendário
    const monthSelect = document.getElementById('month-select')
    monthSelect.addEventListener('change', ()=>{
        
        const selectedMnth = parseInt(monthSelect.value);
        const currentYear = new Date().getFullYear();

         // Altera a data do calendário para o primeiro dia do mês selecionado
        calendar.gotoDate(new Date(currentYear, selectedMnth, 1));
    });
});
