function whackPenguin(hole) {
  if (isPaused) return;
  
  totalClicks++;
  const penguin = hole.querySelector('.penguin');
  
  if (penguin) {
    // Get penguin type and points
    const points = parseInt(penguin.dataset.points);
    const type = penguin.dataset.type;
    
    // Apply power-up multipliers
    let finalPoints = points;
    if (activePowerUps.doubleScore.active) {
      finalPoints *= activePowerUps.doubleScore.multiplier;
    }
    
    // Update score
    score += finalPoints;
    score = Math.max(0, score); // Prevent negative score
    scoreDisplay.textContent = score;
    document.getElementById('score').textContent = score; // ADDED THIS LINE
    
    // Update statistics
    penguinsHit++;
    
    // Handle combo
    const currentTime = Date.now();
    if (currentTime - lastHitTime < 1000) { // Within 1 second
      combo++;
      updateComboDisplay();
    } else {
      combo = 1;
    }
    lastHitTime = currentTime;
    
    // Clear combo timeout
    clearTimeout(comboTimeout);
    comboTimeout = setTimeout(() => {
      combo = 0;
      comboDisplay.classList.remove('active');
    }, 1000);
    
    // Visual feedback
    penguin.style.transform = 'scale(1.3)';
    penguin.style.opacity = '0.7';
    
    // Play sound
    if (soundEnabled) {
      const whackSound = document.getElementById('whackSound');
      whackSound.currentTime = 0;
      whackSound.play();
    }
    
    // Create particles based on penguin type
    let particleColor = '#4CAF50'; // Default green
    if (type === 'golden') particleColor = '#FFD700';
    if (type === 'bomb') particleColor = '#F44336';
    
    createParticles(hole, particleColor, 15);
    
    // Remove penguin after animation
    setTimeout(() => {
      penguin.remove();
    }, 200);
    
    // Check for power-up spawn (5% chance)
    if (Math.random() < 0.05 && !activePowerUps.doubleScore.active) {
      spawnPowerUp(hole);
    }
    
  } else {
    // Missed click
    if (soundEnabled) {
      const missSound = document.getElementById('missSound');
      missSound.currentTime = 0;
      missSound.play();
    }
    
    // Reset combo on miss
    combo = 0;
    comboDisplay.classList.remove('active');
    
    // Visual feedback for miss
    hole.style.boxShadow = 'inset 0 0 20px rgba(244, 67, 54, 0.5)';
    setTimeout(() => {
      hole.style.boxShadow = '';
    }, 300);
  }
}