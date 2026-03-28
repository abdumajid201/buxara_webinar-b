 let timeLeft = 118; // 1 daqiqa 58 soniya = 118 sekund

    const timerElement = document.getElementById('timer');

    function updateTimer() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      // Format: 01:58
      timerElement.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      if (timeLeft <= 0) {
        // 0 ga yetganda yana 2 minutdan boshlash
        timeLeft = 120; // 2 daqiqa = 120 sekund
      } else {
        timeLeft--;
      }
    }

    // Har 1 soniyada yangilash
    setInterval(updateTimer, 1000);

    // Dastlab bir marta chaqirish
    updateTimer();