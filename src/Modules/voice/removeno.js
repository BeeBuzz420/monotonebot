const { Command } = require('discord.js-commando');


module.exports = class RemoveNumberCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'removeno',
      group: 'voice',
      aliases: ['rmno'],
      memberName: 'removeno',
      description: 'Remove given number from queue list',
      examples: ['removeno 5', 'rmno 2-5'],
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 10,
      },
      args: [
        {
          key: 'rangeIndex',
          prompt: 'What is the range of numbers do you want to delete? (slicing with "-")',
          type: 'string',
          min: 0,
        }
      ]
    });
  }

  /** @param {import('discord.js-commando').CommandoMessage} message */
  async run(msg, { rangeIndex }) {
    // remove zero or more white space
    const args = rangeIndex.split(/\s*-\s{0,}/);
    if (!msg.guild.queue || !msg.guild.queue.length) {
      return msg.say('There are no songs to remove');
    } else if (isNaN(args[0]) || args[1] && isNaN(args[1])) {
      return msg.say('Weird character appeared on argument').then(resMsg => resMsg.delete({ timeout: 9000 }));
    } else if (parseInt(args[0]) > parseInt(args[1])) {
      return msg.say('Bad calculation').then(resMsg => resMsg.delete({ timeout: 9000 }));
    }

    if (args < 0 || args >= msg.guild.queue.length) {
      return msg.say(`Current total queue is 0-${msg.guild.queue.length - 1}`);
    }

    let end;
    if (!args[1]) {
      end = 1;
    } else {
      end = args[1] - args[0] + 1;
    }
    const removed = msg.guild.queue.splice(args[0], end);
    if (msg.guild.indexQueue >= args[0]) {
      msg.guild.indexQueue -= removed.length;
    }
    msg.say('Removed succesfully').then(resMsg => resMsg.delete({ timeout: 7000 }));
  }

  async onBlock(msg, reason, data) {
    super.onBlock(msg, reason, data)
      .then(blockMsg => blockMsg.delete({ timeout: 10000 }))
      .catch(e => e); // do nothing
  }

  onError(err, message, args, fromPattern, result) {
    super.onError(err, message, args, fromPattern, result)
      .then(msgParent => msgParent.delete({ timeout: 10000 }))
      .catch(e => e); // do nothing
  }
};
