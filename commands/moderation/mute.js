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
        .setMinValue(1)
        .setMaxValue(9999)
        .setRequired(true))

      .addStringOption(option => 
        option
        .setName('unit')
        .setDescription('to understand the number you just inserted in the duration form')
        .setRequired(true)
        .addChoices(
            {name:"seconds", value: "seconds"},
            {name:"minutes", value:"minutes"},
            {name:"hours", value:"minutes"}
        ))

       .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers) //you can only use this command if you have the mute members permission
       .setDMPermission(false),
  
    async execute(interaction) {

      guild = interaction.guild;

      //getting member, duration and unit
      member = guild.members.cache.get(interaction.options.getUser('user').id);
      duration = interaction.options.getNumber("duration");
      unit = interaction.options.getString("unit");
      
      //finding mutedRole
      const mutedRole = interaction.guild.roles.cache.find(
        (role) => role.name === 'Muted');

      if(mutedRole){
        if(interaction.member.roles.highest.position > member.roles.highest.position){
          try{
            //adding muted Role
            member.roles.add(mutedRole, "You have been given the role " + mutedRole.name + " by " + interaction.user.tag);

            interaction.reply(interaction.user.tag + " has muted " + member.user.tag + " for " + duration + " " + unit);

            //converting to milliseconds
            switch (unit){
              case "seconds":
                duration *= 1;
                break;
              case "minutes":
                duration *= 60;
                break;
              case "hours":
                duration *= 3600;
                break;
            }
            duration *= 1000;

            setTimeout(() => {
              member.roles.remove(mutedRole); // remove the role
            }, duration);

          } catch(error){
            interaction.reply({content:"Error while muting the user, try again.", ephemeral:true});
          }
        } else interaction.reply({content:"Cannot mute someone who has more privileges than you.", ephemeral:true});
      } else interaction.reply("Cannot find Muted role in the server, try creating a role Muted, configure its permissions and then try launching this command again.")

        
      
    },
  };