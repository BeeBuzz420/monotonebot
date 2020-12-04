const emoji = {
  a: '🇦', b: '🇧', c: '🇨', d: '🇩',
  e: '🇪', f: '🇫', g: '🇬', h: '🇭',
  i: '🇮', j: '🇯', k: '🇰', l: '🇱',
  m: '🇲', n: '🇳', o: '🇴', p: '🇵',
  q: '🇶', r: '🇷', s: '🇸', t: '🇹',
  u: '🇺', v: '🇻', w: '🇼', x: '🇽',
  y: '🇾', z: '🇿', 0: '0️⃣', 1: '1️⃣',
  2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣',
  6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣',
  10: '🔟', '#': '#️⃣', '*': '*️⃣',
  '!': '❗', '?': '❓', 100: '💯',
  exit: '❌', circle: '⭕', check: '☑',
  rightA: '➡', leftA: '⬅', downUp: '⬇⬆',
  like: '👍', dislike: '👎', cloud: '☁',
  rainbow: '🌈', umbrella: '☂', heart: '❤',
  blackHeart: '🖤', ok: '🆗', squaredX: '❎'
}

function randomHex() {
  return Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}

/**
 * Change seconds to timestamp like '04:20:46'
 * @param {Number} seconds seconds in numbers
 */
function toTimestamp(seconds) {
  let day = Math.floor(seconds / 86400);
  if (seconds > 86400) {
    return day.toString() + ':' + new Date(seconds * 1000).toISOString().substr(11, 8);
  } else if (seconds > 3599) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  } else {
    return new Date(seconds * 1000).toISOString().substr(14, 5);
  }
}

/**
 * change timestamps to seconds format like 3600
 * @param {String} timestamp String from timestamp like 10:00:00
 */
function toSeconds(timestamp) {
  // reverse the splitted timestamp from 10:00:00 to ['00','00','10']
  // so it start from secs, mins, hours
  let time = timestamp.split(/\s*:\s*/).reverse();
  let seconds = 0;
  for (let i = 0; i < time.length; i++) {
    if (i === 0) {
      seconds += parseInt(time[i]);
    } else if (i <= 3) {
      seconds += parseInt(time[i]) * 60 ** i;
    } else {
      seconds += parseInt(time[i]) * 86400;
    }
  }
  return seconds;
}

module.exports = {
  emoji,
  randomHex,
  toTimestamp,
  toSeconds,
};
