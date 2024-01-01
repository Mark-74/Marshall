const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('delete')
      .setDescription('deletes the messages of a user')
      .addUserOption(option => 
        option
            .setName('user')
            .setDescription('Whose messages are being deleted')
            .setRequired(true))
       
       .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers) //you can only use this command if you have the ban members permission
       .setDMPermission(false),
  
    async execute(interaction) {

      guild = interaction.guild;

      //getting user and member
      user = interaction.options.getUser('user');
      member = await guild.members.fetch(interaction.options.getUser('user').id);

      messages = await interaction.channel.messages.fetch({limit:2}); //temporary
      userMessages = await messages.filter((m) => m.author.id === member.id);

      //checking if the user is bannable
      if(!member.permissions.has(PermissionFlagsBits.Administrator)){
        //banning the user
        try{
          await interaction.channel.bulkDelete(userMessages);
          interaction.reply('All of ' + member + ' messages have been deleted.');
        } catch(error){
          interaction.reply({content:"Error while deleting the messages of the user, try again.", ephemeral:true});
        }
      } else {interaction.reply({content:"Cannot delete messages of a staff member.", ephemeral:true});}
      
    },
  };