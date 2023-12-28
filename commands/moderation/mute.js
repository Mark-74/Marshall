const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('mute')
      .setDescription('mutess a User')
      .addUserOption(option => 
        option
            .setName('user')
            .setDescription('Who is being muted')
            .setRequired(true))
      .addNumberOption(option =>
        option
        .setName('duration')
        .setDescription('How much time the user must be muted')
        .setMaxValue(9999)
        )
      .addNumberOption(option => 
        option
        .setName('unit')
        .setDescription('to understand the number you just inserted in the duration form')
        .addChoices(
            {name:"seconds", value: 1},
            {name:"minutes", value:60},
            {name:"hours", value:3600}
        ))
       .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers) //you can only use this command if you have the mute members permission
       .setDMPermission(false),
  
    async execute(interaction) {

      guild = interaction.guild;
      const reason = interaction.options.getString("reason") || "No reason provided";

      //getting user
      user = interaction.options.getUser('user');

      
    },
  };