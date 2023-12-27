const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('remove_role')
      .setDescription('removes a Role from a User')
      .addUserOption(option => 
        option
            .setName('user')
            .setDescription('Who is the role being removed from')
            .setRequired(true))
       .addRoleOption(option => 
        option
            .setName('role')
            .setDescription('The role to remove from the user')
            .setRequired(true))
       .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles) //you can only use this command if you have the manage roles permission
       .setDMPermission(false),
  
    async execute(interaction) {
      
        guild = interaction.client.guilds.cache.get(interaction.guildId);

        //getting user and role
        user = guild.members.cache.get(interaction.options.getUser('user').id);
        role = interaction.options.getRole('role');

        //removing the role
        try{
            user.roles.remove(role, "The role " + role.name + " was removed from you by " + interaction.user.tag);
            interaction.reply({content:"Role " + role.name + " removed from " + user.user.username + ".", ephemeral:true});
        } catch(error){
            interaction.reply({content:"Error while removing the role, are you sure the user has the role " + role.name + "?", ephemeral:true}); //useless, if the user hasn't got that role, this gets removed from him anyway
        }
    },
  };