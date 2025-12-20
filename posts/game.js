  // --- ASSETS & SETUP ---
        const audio = {
            bgm: new Audio('../src/cool.mp3'),
            boom: new Audio('../src/boom.mp3'),
            finish: new Audio('../src/finish.mp3'),
            click: new Audio('../src/ogg.mp3')
        };
        audio.bgm.loop = true; 
        audio.bgm.volume = 0.1;

        // Load Creeper Image
        const creeperImg = new Image();
        creeperImg.src = '../src/creeper.png';

        // --- MUTE LOGIC ---
        let isMuted = false;

        function toggleMute() {
            isMuted = !isMuted;
            const btn = document.getElementById('mute-btn');
            if (isMuted) {
                audio.bgm.pause();
                if (btn) btn.innerText = "UNMUTE";
            } else {
                if (modal.style.display === 'block') audio.bgm.play().catch(()=>{});
                if (btn) btn.innerText = "MUTE";
            }
        }

        function playSound(name) {
            if (isMuted) {
                audio.bgm.pause();
            }; // Check mute state
            
            if(audio[name]) {
                if(name !== 'bgm') { 
                    const s = audio[name].cloneNode(); 
                    s.volume = 0.3; 
                    s.play().catch(()=>{}); 
                } else { 
                    // Only restart BGM if it's not already playing or we want to reset
                    // For openGameModal we usually just want to ensure it plays
                    audio.bgm.play().catch(()=>{}); 
                }
            }
        }
        function stopMusic() { audio.bgm.pause(); }

        // --- POPUP CONTROLS ---
        const modal = document.getElementById('game-modal');
        const dlTarget = 'https://www.curseforge.com/minecraft-bedrock/addons/link-up/files/all?page=1&pageSize=20&showAlphaFiles=hide';

        function openGameModal() { 
            modal.style.display = 'block'; 
            resize(); 
            resetGameUI(); 
            
            // Reset fade/visibility in case previous game ended with fade
            canvas.style.opacity = "1";
            canvas.style.transition = "none";
            document.getElementById('top-hud').style.opacity = "1";
            document.getElementById('bottom-hud').style.opacity = "1";

            playSound('click'); 
            // Play music immediately when popup appears
            if (!isMuted) {
                audio.bgm.currentTime = 0;
                playSound('bgm'); 
            }
        }
        
        function closeGameModal() { 
            modal.style.display = 'none'; 
            playSound('click');
            gameRunning = false; 
            stopMusic(); 
        }

        // --- GAME VARIABLES ---
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        let width, height;

        // UI Elements
        const xpFill = document.getElementById('xp-bar-fill');
        const xpText = document.getElementById('xp-text');
        const startScreen = document.getElementById('start-screen');
        const gameOverScreen = document.getElementById('game-over-screen');
        const downloadScreen = document.getElementById('download-screen');
        const downloadBtn = document.getElementById('download-btn');
        const statusText = document.getElementById('status-text');
        const startBtn = document.getElementById('start-btn');
        const restartBtn = document.getElementById('restart-btn');

        // State
        let gameRunning = false;
        let score = 0;
        let frames = 0;
        let speed = 8;
        let downloadProgress = 0;
        let player = { x: 0, y: 0, size: 40 };
        let targetX = 0;
        let obstacles = [], collectibles = [], particles = [];

        function resize() {
            width = window.innerWidth; height = window.innerHeight;
            canvas.width = width; canvas.height = height;
            ctx.imageSmoothingEnabled = false;
        }
        window.addEventListener('resize', resize);

        // --- INPUT HANDLING ---
        function initInput() { targetX = width / 2; player.x = width / 2; player.y = height - 120; }
        function updateInput(x) {
            targetX = x;
            if (targetX < player.size) targetX = player.size;
            if (targetX > width - player.size) targetX = width - player.size;
        }

        // Mouse & Touch
        modal.addEventListener('mousemove', (e) => { if(gameRunning) updateInput(e.clientX); });
        modal.addEventListener('touchmove', (e) => { 
            if(gameRunning) { e.preventDefault(); updateInput(e.touches[0].clientX); } 
        }, { passive: false });
        modal.addEventListener('touchstart', (e) => { 
            if(gameRunning) updateInput(e.touches[0].clientX); 
        });

        // --- SPAWNING ---
        function spawnEntities() {
            // Spawn Creeper every 45 frames
            if (frames % 45 === 0) {
                obstacles.push({ 
                    x: Math.random() * (width - 60) + 10, 
                    y: -60, 
                    size: 50, 
                    speed: speed 
                });
            }
            // Spawn Diamond every 35 frames
            if (frames % 35 === 0) {
                collectibles.push({ 
                    x: Math.random() * (width - 50) + 10, 
                    y: -60, 
                    size: 30, 
                    speed: speed 
                });
            }
        }

        // --- DRAWING ---
        function drawSteve(x, y, size) {
            const s = size / 8; ctx.save(); ctx.translate(x - size/2, y - size/2);
            ctx.fillStyle = '#ffcc99'; ctx.fillRect(0, 0, size, size);
            ctx.fillStyle = '#4d3300'; ctx.fillRect(0, 0, size, s*2); ctx.fillRect(0, s*2, s, s); ctx.fillRect(size-s, s*2, s, s);
            ctx.fillStyle = '#fff'; ctx.fillRect(s, s*3.5, s*2, s); ctx.fillRect(s*5, s*3.5, s*2, s);
            ctx.fillStyle = '#4d0099'; ctx.fillRect(s*2, s*3.5, s, s); ctx.fillRect(s*6, s*3.5, s, s);
            ctx.fillStyle = '#cc8866'; ctx.fillRect(s*3, s*4.5, s*2, s);
            ctx.fillStyle = '#663333'; ctx.fillRect(s*3, s*6, s*2, s/2);
            ctx.restore();
        }

        function drawCreeper(x, y, size) {
            // Use Image if loaded
            if (creeperImg.complete && creeperImg.naturalHeight !== 0) {
                ctx.drawImage(creeperImg, x, y, size, size);
            } else {
                // Fallback to Green Box
                ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#00aa00'; ctx.fillRect(0, 0, size, size);
                ctx.strokeStyle = '#004400'; ctx.lineWidth = 2; ctx.strokeRect(0,0,size,size);
                ctx.fillStyle = '#000'; const s = size / 5;
                ctx.fillRect(s, s, s, s); ctx.fillRect(s*3, s, s, s); ctx.fillRect(s*2, s*2, s, s);
                ctx.fillRect(s, s*3, s, s*2); ctx.fillRect(s*3, s*3, s, s*2);
                ctx.restore();
            }
        }

        function drawDiamond(x, y, size) {
            ctx.save(); ctx.translate(x + size/2, y + size/2); ctx.rotate(Math.PI / 4);
            ctx.fillStyle = '#00ffff'; ctx.fillRect(-size/3, -size/3, size/1.5, size/1.5);
            ctx.fillStyle = '#ccffff'; ctx.fillRect(-size/6, -size/6, size/3, size/3);
            ctx.shadowColor = '#00ffff'; ctx.shadowBlur = 10; ctx.restore(); ctx.shadowBlur = 0;
        }

        // --- GAME LOOP ---
        function loop() {
            if (!gameRunning) return;

            // 1. Clear Screen
            ctx.fillStyle = '#111'; ctx.fillRect(0, 0, width, height);
            
            // 2. Grid Effect
            ctx.strokeStyle = '#222'; let gridOff = (frames * speed) % 100;
            for(let i=0; i<height/30; i++) { let y = i * 30 + gridOff; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }

            // 3. Movement
            player.x += (targetX - player.x) * 0.2;
            obstacles.forEach(o => o.y += o.speed);
            collectibles.forEach(c => c.y += c.speed);
            obstacles = obstacles.filter(o => o.y < height + 50);
            collectibles = collectibles.filter(c => c.y < height + 50);

            // 4. Creeper Collision (DEATH)
            const pSize = player.size;
            obstacles.forEach(o => {
                if (player.x - pSize/2 < o.x + o.size && player.x + pSize/2 > o.x &&
                    player.y - pSize/2 < o.y + o.size && player.y + pSize/2 > o.y) {
                    gameOver();
                }
            });

            // 5. Diamond Collision (PROGRESS - 20% per diamond)
            for (let i = collectibles.length - 1; i >= 0; i--) {
                let c = collectibles[i];
                if (player.x - pSize/2 < c.x + c.size && player.x + pSize/2 > c.x &&
                    player.y - pSize/2 < c.y + c.size && player.y + pSize/2 > c.y) {
                    
                    playSound('boom'); 
                    score++; 
                    downloadProgress += 20; // 5 diamonds = 100%

                    // Explosion Particles
                    for(let k=0; k<6; k++) {
                        particles.push({x:c.x, y:c.y, vx:(Math.random()-0.5)*8, vy:(Math.random()-0.5)*8, life:1.0, color:'#00ffff', size:6});
                    }
                    collectibles.splice(i, 1);
                }
            }

            // 6. Draw Particles
            particles.forEach(p => { 
                p.x += p.vx; p.y += p.vy; p.life -= 0.05; 
                ctx.globalAlpha = Math.max(0, p.life); 
                ctx.fillStyle = p.color; 
                ctx.fillRect(p.x, p.y, p.size, p.size); 
            });
            ctx.globalAlpha = 1.0; 
            particles = particles.filter(p => p.life > 0);

            // 7. Draw Everything
            obstacles.forEach(o => drawCreeper(o.x, o.y, o.size));
            collectibles.forEach(c => drawDiamond(c.x, c.y, c.size));
            drawSteve(player.x, player.y, player.size);

            spawnEntities();
            frames++;

            // 8. Dynamic Text Logic
            if (downloadProgress < 20) statusText.innerText = "ESTABLISHING CONNECTION...";
            else if (downloadProgress < 40) statusText.innerText = "COMPRESSING ADDON FILES...";
            else if (downloadProgress < 60) statusText.innerText = "ENCRYPTING DATA...";
            else if (downloadProgress < 80) statusText.innerText = "GENERATING SECURE URL...";
            else if (downloadProgress < 100) statusText.innerText = "AUTHENTICATING...";
            else statusText.innerText = "COMPLETE!";

            // Update UI
            let displayP = Math.min(downloadProgress, 100);
            xpFill.style.width = displayP + '%';
            xpText.innerText = Math.floor(displayP);

            // Win Check
            if (downloadProgress >= 100) winGame();
            else requestAnimationFrame(loop);
        }

        // --- STATE FUNCTIONS ---
        function startGame() {
            initInput(); 
            // Music already playing from openGameModal, but ensure it's on if needed
            if (!isMuted && audio.bgm.paused) playSound('bgm');
            
            // Reset Fade / Visibility (Important for restart)
            canvas.style.opacity = "1"; 
            canvas.style.transition = "none";
            document.getElementById('top-hud').style.opacity = "1";
            document.getElementById('bottom-hud').style.opacity = "1";

            gameRunning = true; 
            score = 0; 
            downloadProgress = 0; 
            frames = 0;
            obstacles = []; collectibles = []; particles = [];
            
            startScreen.style.display = 'none'; 
            gameOverScreen.style.display = 'none'; 
            downloadScreen.style.display = 'none';
            statusText.innerText = "CONNECTING...";
            
            if(canvas.width === 0) resize();
            loop();
        }

        function winGame() {
            gameRunning = false; 
            stopMusic(); 
            playSound('finish');
            
            // Fade Out Game Elements on Win
            canvas.style.transition = "opacity 1s"; 
            canvas.style.opacity = "0";
            document.getElementById('top-hud').style.opacity = "0";
            document.getElementById('bottom-hud').style.opacity = "0";

            downloadScreen.style.display = 'block'; 
            downloadBtn.style.display = 'block';
            statusText.innerText = "DOWNLOAD READY!"; 
            statusText.style.color = "#00ff00";
        }

        function gameOver() {
            gameRunning = false; 
            stopMusic();
            
            // FADE OUT EFFECT
            canvas.style.transition = "opacity 1s"; 
            canvas.style.opacity = "0.1";
            document.getElementById('top-hud').style.opacity = "0";
            document.getElementById('bottom-hud').style.opacity = "0";
            
            gameOverScreen.style.display = 'block';
            statusText.innerText = "";
        }

        function triggerFinalDownload() { 
            playSound('click'); 
            window.location.href = dlTarget; 
            setTimeout(closeGameModal, 500); 
        }

        function resetGameUI() {
            startScreen.style.display = 'block';
            gameOverScreen.style.display = 'none';
            downloadScreen.style.display = 'none';
            statusText.innerText = "WAITING...";
            xpFill.style.width = '0%';
            xpText.innerText = '0';
        }

        startBtn.addEventListener('click', startGame);
        restartBtn.addEventListener('click', startGame);

        // Your Copy Code Button logic (Keep this)
        function copyCode(button) {
            playSound('click');
            const codeBox = button.parentElement.parentElement;
            const codeText = codeBox.textContent;
            const textarea = document.createElement('textarea');
            textarea.value = codeText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.classList.add('copied');
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            // Inject Mute Button
            const modalEl = document.getElementById('game-modal');
            if(modalEl && !document.getElementById('mute-btn')) {
                const muteBtn = document.createElement('button');
                muteBtn.id = 'mute-btn';
                muteBtn.innerText = 'MUTE';
                // Styles
                muteBtn.style.position = 'absolute';
                muteBtn.style.top = '20px';
                muteBtn.style.left = '20px';
                muteBtn.style.zIndex = '100001';
                muteBtn.style.background = 'rgba(0,0,0,0.6)';
                muteBtn.style.color = '#fff';
                muteBtn.style.border = '2px solid #fff';
                muteBtn.style.padding = '5px 10px';
                muteBtn.style.fontFamily = 'inherit';
                muteBtn.style.fontSize = '16px';
                muteBtn.style.cursor = 'pointer';
                muteBtn.onclick = toggleMute;
                modalEl.appendChild(muteBtn);
            }

            const codeBoxes = document.querySelectorAll('.code-box');
            codeBoxes.forEach(box => {
                const header = box.querySelector('.code-header');
                if (header && !header.querySelector('.copy-btn')) {
                    const title = header.querySelector('.code-title');
                    if (title && (title.textContent.includes('Example') || title.textContent.includes('Guide'))) {
                        const copyBtn = document.createElement('button');
                        copyBtn.className = 'copy-btn';
                        copyBtn.textContent = 'Copy';
                        copyBtn.onclick = function() { copyCode(this); };
                        header.appendChild(copyBtn);
                    }
                }
            });
        });