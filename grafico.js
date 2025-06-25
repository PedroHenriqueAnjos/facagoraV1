const btnSubmit = document.getElementById('btn-submit');
const btnReset = document.getElementById('reset');
const inputField = document.getElementById('input-time');
const ctx = document.getElementById('chart').getContext('2d');


function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


function getWeekdayLabels() {
  const labels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const today = new Date();
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const weekdayIndex = day.getDay(); 
    result.push(labels[weekdayIndex]);
  }

  return result;
}


function getStoredData() {
  return JSON.parse(localStorage.getItem('appData')) || {};
}


function setStoredData(data) {
  localStorage.setItem('appData', JSON.stringify(data));
}


function addMinutes(minutes) {
  const today = getLocalDateString();
  const data = getStoredData();

  if (!data[today]) data[today] = 0;
  data[today] += minutes;

  setStoredData(data);
}


function getWeeklyData() {
  const data = getStoredData();
  const today = new Date();
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const dateKey = getLocalDateString(day);
    last7Days.push(data[dateKey] || 0);
  }

  return last7Days;
}


const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: getWeekdayLabels(),
    datasets: [{
      label: 'Horas Estudadas',
      data: getWeeklyData(),
      backgroundColor: '#003366',
      borderRadius: 6,
    }],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: 'white'
        },
        grid: {
          color: '#444'
        }
      },
      x: {
        ticks: { color: 'white' },
        grid: { color: '#444' }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    }
  }
});


btnSubmit.addEventListener('click', () => {
  const val = parseInt(inputField.value);
  if (!val || val <= 0) {
    alert('Digite um número válido de Horas.');
    return;
  }

  addMinutes(val);
  inputField.value = '';


  chart.data.labels = getWeekdayLabels();
  chart.data.datasets[0].data = getWeeklyData();
  chart.update();
});


btnReset?.addEventListener('click', () => {
    localStorage.removeItem('appData');
    chart.data.labels = getWeekdayLabels();
    chart.data.datasets[0].data = getWeeklyData();
    chart.update();
  
});