const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('add_role')
      .setDescription('adds a Role to a User')
      .addUserOption(option => 
        option
            .setName('user')
            .setDescription('Who is receiving the role')
            .setRequired(true))
       .addRoleOption(option => 
        option
            .setName('role')
            .setDescription('The role to add to the user')
            .setRequired(true))
       .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles) //you can only use this command if you have the manage roles permission
       .setDMPermission(false),
  
    async execute(interaction) {

      guild = interaction.guild;

      //getting user and role
      member = await guild.members.fetch(interaction.options.getUser('user').id);
      role = interaction.options.getRole('role');

      //adding the role
      if(interaction.member.roles.highest.position > role.position){
        if(interaction.member.roles.highest.position > member.roles.highest.position){
          try{
            member.roles.add(role, "You have been given the role " + role.name + " by " + interaction.user.tag);
            interaction.reply({content:"Role " + role.name + " added to " + member.user.username + ".", ephemeral:true});
          } catch(error){
            interaction.reply({content:"Error while adding the role, try again.", ephemeral:true});
          }
        } else interaction.reply({content:"Cannot add a role to someone who has more privileges than you.", ephemeral:true});
      } else interaction.reply({content:"Cannot add a role which guarantees more privileges than you have.", ephemeral:true});
      
    },
  };