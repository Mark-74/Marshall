const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('ban')
      .setDescription('bans a User')
      .addUserOption(option => 
        option
            .setName('user')
            .setDescription('Who is getting kicked')
            .setRequired(true))
       .addStringOption(option =>
        option
            .setName('reason')
            .setDescription('Why are you kicking this user')
            .setRequired(false)
            .setMaxLength(512))
       .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers) //you can only use this command if you have the ban members permission
       .setDMPermission(false),
  
    async execute(interaction) {

      guild = interaction.guild;
      const reason = interaction.options.getString("reason") || "No reason provided";

      //getting user and member
      user = interaction.options.getUser('user');
      member = await guild.members.fetch(user.id);

      //checking if the user is bannable
      if(!meber.roles.highest.position > interaction.member.roles.highest.position){
        if(!member.permissions.has(PermissionFlagsBits.KickMembers)){
            //banning the user
            try{
              await member.kick({reason: reason})
              interaction.reply("User " + user.username + " has been Kicked by Marshall by order of " + interaction.user.username + ".\nMaybe someday " + user.username + " might return.");
            } catch(error){
              interaction.reply({content:"Error while banning the user, try again.", ephemeral:true});
            }
          } else {interaction.reply("Cannot ban a staff member.");}
      } else interaction.reply({content:"Cannot kick someone who has more privileges than you.", ephemeral:true})
      
      
    },
  };