const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies to the admin.')
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .setDMPermission(false),
  
    async execute(interaction) {

      interaction.reply("Hi admin, I'm Marshall.")
    },
  };