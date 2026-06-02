// GANTI DENGAN DISCORD USER ID KAMU
const DISCORD_ID = "764292378869366804"; 

document.addEventListener('DOMContentLoaded', () => {
    // Fade in effect
    setTimeout(() => {
        document.querySelector('.wrapper').classList.add('visible');
    }, 100);

    // Fetch Lanyard Data
    const updateStatus = async () => {
        try {
            const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
            const { data } = await res.json();

            // Avatar & Name
            document.getElementById('discord-avatar').src = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`;
            document.getElementById('discord-name').textContent = data.discord_user.global_name || data.discord_user.username;
            document.getElementById('discord-tag').textContent = `@${data.discord_user.username}`;

            // Status Dot
            const dot = document.getElementById('status-dot');
            dot.className = '';
            dot.classList.add(`status-${data.discord_status}`);

            // Activity
            const activityEl = document.getElementById('discord-activity');
            if (data.listening_to_spotify) {
                activityEl.innerHTML = `Listening to <b>${data.spotify.song}</b><br>by ${data.spotify.artist}`;
            } else if (data.activities.length > 0) {
                const act = data.activities.find(a => a.type !== 4) || data.activities[0];
                activityEl.innerHTML = act.type === 4 ? `💬 ${act.state}` : `🎮 Playing <b>${act.name}</b>`;
            } else {
                activityEl.innerHTML = data.discord_status === 'offline' ? 'User is currently offline' : 'No current activity';
            }
        } catch (e) { console.error("Lanyard error"); }
    };

    updateStatus();
    setInterval(updateStatus, 15000);
});