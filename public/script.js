const girlIcons = {
  heart: `<svg viewBox="0 0 64 64"><path d="M32 56S12 38 12 24a11 11 0 0 1 20-6 11 11 0 0 1 20 6c0 14-20 32-20 32z" fill="#ec4899"/></svg>`,
  crown: `<svg viewBox="0 0 64 64"><path d="M12 48h40l4-24-12 8-12-16-12 16-12-8z" fill="#facc15" stroke="#eab308" stroke-width="2"/><circle cx="12" cy="24" r="3" fill="#ec4899"/><circle cx="32" cy="16" r="3" fill="#ec4899"/><circle cx="52" cy="24" r="3" fill="#ec4899"/><rect x="14" y="44" width="36" height="4" rx="2" fill="#eab308"/></svg>`,
  strawberry: `<svg viewBox="0 0 64 64"><path d="M32 12c-4-4-10-3-12 0 1 4 4 5 12 0z" fill="#16a34a"/><path d="M32 12c4-4 10-3 12 0-1 4-4 5-12 0z" fill="#16a34a"/><path d="M32 54S14 38 14 24a18 18 0 0 1 36 0c0 14-18 30-18 30z" fill="#f43f5e"/><circle cx="24" cy="26" r="1.5" fill="#fef08a"/><circle cx="36" cy="28" r="1.5" fill="#fef08a"/><circle cx="30" cy="38" r="1.5" fill="#fef08a"/><circle cx="24" cy="34" r="1.5" fill="#fef08a"/><circle cx="38" cy="36" r="1.5" fill="#fef08a"/></svg>`,
  lipstick: `<svg viewBox="0 0 64 64"><rect x="24" y="34" width="16" height="20" rx="3" fill="#f472b6"/><rect x="26" y="26" width="12" height="8" fill="#e5e7eb"/><path d="M26 26l12-8v8z" fill="#e11d48"/></svg>`,
  diamond: `<svg viewBox="0 0 64 64"><path d="M32 12L14 26l18 26 18-26z" fill="#38bdf8"/><path d="M32 12L23 26h18z" fill="#7dd3fc"/><path d="M14 26h36L32 52z" fill="#0284c7" opacity="0.3"/></svg>`
};

const symbols = ['heart', 'crown', 'strawberry', 'lipstick', 'diamond'];
let userName = '';
let attempt = 0;
const maxAttempts = 3;
function getRandomColumn() {
  const pool = [...symbols];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}
window.onload = function() {
  while (true) {
    const input = prompt("Введіть ваше ім'я (мінімум 2 символи):");  
    if (input === null) {
      userName = 'Принцеса';
      break;
    }
    const trimmedInput = input.trim();
    if (trimmedInput.length >= 2) {
      userName = trimmedInput;
      break;
    } else {
      alert("Ім'я має містити щонайменше 2 символи!");
    }
  }
  document.getElementById('userName').innerText = userName + ' 💖';
  const defaultGrid = [
    'heart', 'crown', 'strawberry',
    'crown', 'lipstick', 'crown',
    'diamond', 'strawberry', 'heart'
  ];
  for (let i = 0; i < 9; i++) {
    document.getElementById(`c${i}`).innerHTML = girlIcons[defaultGrid[i]];
  }
};

function playSlot() {
  if (attempt >= maxAttempts) return;
  const btn = document.getElementById('generateBtn');
  btn.disabled = true;
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(`c${i}`);
    cell.classList.add('spinning');
    cell.classList.remove('win');
  }
  setTimeout(() => {
    attempt++;
    document.getElementById('attempts').innerText = `Спроба ${attempt} з ${maxAttempts}`;
    const col1 = getRandomColumn();
    const col2 = getRandomColumn();
    const col3 = getRandomColumn();
    const grid = [
      col1[0], col2[0], col3[0],
      col1[1], col2[1], col3[1],
      col1[2], col2[2], col3[2]
    ];
    for (let i = 0; i < 9; i++) {
      const cell = document.getElementById(`c${i}`);
      cell.innerHTML = girlIcons[grid[i]];
      cell.classList.remove('spinning');
    }
    let winRow = -1;
    for (let r = 0; r < 3; r++) {
      let idx = r * 3;
      if (grid[idx] === grid[idx + 1] && grid[idx + 1] === grid[idx + 2]) {
        winRow = r;
        break;
      }
    }
    const statusMsg = document.getElementById('statusMessage');
    if (winRow !== -1) {
      for (let c = 0; c < 3; c++) {
        document.getElementById(`c${winRow * 3 + c}`).classList.add('win');
      }
      statusMsg.innerText = `Вітаємо, ${userName}! Ви виграли! 👑✨`;
      statusMsg.className = 'message win';
      btn.disabled = true; 
    } else if (attempt === maxAttempts) {
      statusMsg.innerText = `Гра закінчена! На жаль, ${userName}, ви програли. 😞`;
      statusMsg.className = 'message lose';
      btn.disabled = true; 
    } else {
      btn.disabled = false;
    }
  }, 300);
}