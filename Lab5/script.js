const numberInput = document.getElementById('numberInput');
const categorySelect = document.getElementById('categorySelect');
const searchBtn = document.getElementById('searchBtn');
const resultArea = document.getElementById('resultArea');

function showLoading() {
  resultArea.innerHTML = '<span class="loading">Загрузка...</span>';
}

function showResult(text) {
  resultArea.textContent = text;
}

function fetchFact() {
  const number = numberInput.value.trim();
  const category = categorySelect.value;

  if (number === '') {
    showResult('Пожалуйста, введите число.');
    return;
  }

  showLoading();

  fetch(`http://numbersapi.com/${number}/${category}?json`)
    .then(response => response.json())
    .then(data => {
      if (data.found) {
        showResult(data.text);
      } else {
        const suffix = category === 'year' ? 'скучный год' : 'скучное число';
        showResult(`${number} — ${suffix}.`);
      }
    })
    .catch(() => {
      showResult('Ошибка при загрузке данных.');
    });
}

searchBtn.addEventListener('click', fetchFact);

numberInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    fetchFact();
  }
});
