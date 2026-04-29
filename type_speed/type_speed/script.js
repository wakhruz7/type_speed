const textDisplay = document.getElementById('text-display');
const inputField = document.getElementById('input-field');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const errorEl = document.getElementById('errors');
const resetBtn = document.getElementById('reset-btn');

let timer = 60;
let interval = null;
let isTyping = false;
let errors = 0;

// Test uchun matnlar to'plami
const texts = [
    "Dasturlash nafaqat kod yozish, balki muammolarga yechim topish san'atidir. JavaScript yordamida biz interaktiv va dinamik veb-saytlar yaratishimiz mumkin.",
    "Muvaffaqiyatga erishish uchun har kuni kichik bo'lsa ham qadam tashlash kerak. GitHub - bu dasturchilar uchun o'z tajribalarini almashish maydonidir.",
    "HTML struktura beradi, CSS ko'rinishni chiroyli qiladi, JavaScript esa loyihaga jon bag'ishlaydi. Toza kod yozish har bir dasturchining maqsadi bo'lishi lozim."
];

// Matnni harflarga bo'lib ekranga chiqarish
function loadText() {
    const randomIdx = Math.floor(Math.random() * texts.length);
    textDisplay.innerHTML = '';
    texts[randomIdx].split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        textDisplay.appendChild(span);
    });
    textDisplay.querySelectorAll('span')[0].classList.add('current');
}

// Vaqtni hisoblash
function startTimer() {
    if (timer > 0) {
        timer--;
        timerEl.innerText = timer;
        calculateWPM();
    } else {
        clearInterval(interval);
        inputField.disabled = true;
    }
}

// WPM hisoblash
function calculateWPM() {
    let charactersTyped = inputField.value.length;
    let timeElapsed = 60 - timer;
    if (timeElapsed > 0) {
        let wpm = Math.round((charactersTyped / 5) / (timeElapsed / 60));
        wpmEl.innerText = wpm;
    }
}

// Kiritishni tekshirish
inputField.addEventListener('input', () => {
    const spans = textDisplay.querySelectorAll('span');
    const inputVal = inputField.value.split('');
    
    if (!isTyping) {
        interval = setInterval(startTimer, 1000);
        isTyping = true;
    }

    errors = 0;
    spans.forEach((span, index) => {
        const char = inputVal[index];
        
        if (char == null) {
            span.classList.remove('correct', 'incorrect', 'current');
            if (index === inputVal.length) span.classList.add('current');
        } else if (char === span.innerText) {
            span.classList.add('correct');
            span.classList.remove('incorrect', 'current');
        } else {
            span.classList.add('incorrect');
            span.classList.remove('correct', 'current');
            errors++;
        }
    });

    errorEl.innerText = errors;

    // Matn tugasa
    if (inputVal.length === spans.length) {
        clearInterval(interval);
        inputField.disabled = true;
    }
});

// Reset qilish
resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    timer = 60;
    isTyping = false;
    errors = 0;
    inputField.disabled = false;
    inputField.value = '';
    timerEl.innerText = timer;
    wpmEl.innerText = '0';
    errorEl.innerText = '0';
    loadText();
    inputField.focus();
});

// Dastlabki yuklash
loadText();