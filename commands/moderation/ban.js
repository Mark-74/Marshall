const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('ban')
      .setDescription('bans a User')
      .addUserOption(option => 
        option
            .setName('user')
            .setDescription('Who is getting banned')
            .setRequired(true))
       .addStringOption(option =>
        option
            .setName('reason')
            .setDescription('Why are you banning this user')
            .setRequired(false)
            .setMaxLength(512))
       .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers) //you can only use this command if you have the ban members permission
       .setDMPermission(false),
  
    async execute(interaction) {

      guild = interaction.guild;
      const reason = interaction.options.getString("reason") || "No reason provided";

      //getting user and role
      user = interaction.options.getUser('user');
      console.log(user);

      //banning the user
      try{
        await interaction.guild.members.ban(user, {reason})
        interaction.reply("User " + user.tag + " has been Banned by Marshall by order of " + interaction.user.tag + ".\n Have an amazing day.");
      } catch(error){
        interaction.reply({content:"Error while banning the user, try again.", ephemeral:true});
      }
    },
  };