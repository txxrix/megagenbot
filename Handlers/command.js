const { readdirSync } = require('fs');

module.exports = (bot) => {
  readdirSync('./commands/').forEach(dir => {
    const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));

    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);

      if (pull.name) {
        bot.commands.set(pull.name, pull);
      } else {
        console.log(`${file} -> Invalid`)
        continue;
      }

      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach(alias => {
          return bot.aliases.set(alias, pull.name);
        });


    }
  })
}