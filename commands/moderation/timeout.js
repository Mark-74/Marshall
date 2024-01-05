const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('time_outs a User')

        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Who is being timed out')
                .setRequired(true))

        .addNumberOption(option =>
            option
                .setName('duration')
                .setDescription('How much time the user must be timed out')
                .setMinValue(1)
                .setMaxValue(672)
                .setRequired(true))

        .addStringOption(option =>
            option
                .setName('unit')
                .setDescription('to understand the number you just inserted in the duration form')
                .setRequired(true)
                .addChoices(
                    { name: "seconds", value: "seconds" },
                    { name: "minutes", value: "minutes" },
                    { name: "hours", value: "hours" }
                ))

        .addStringOption(option =>
            option            
                .setName('reason')
                .setDescription('why are you timing out this user')
                .setRequired(false))

        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers) //you can only use this command if you have the mute members permission
        .setDMPermission(false),

    async execute(interaction) {

        guild = interaction.guild;

        //getting member, duration and unit
        member = await guild.members.fetch(interaction.options.getUser('user').id);
        duration = interaction.options.getNumber("duration");
        unit = interaction.options.getString("unit");

        if (interaction.member.roles.highest.position > member.roles.highest.position) {
            if(!member.permissions.has(PermissionFlagsBits.MuteMembers)){
                try {

                    interaction.reply(interaction.user.tag + " has timed out " + member.user.tag + " for " + duration + " " + unit);
                    
                    //converting to milliseconds
                    switch (unit) {
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
    
                    //getting reason
                    reason = interaction.options.getString('reason') || "No reason given";
    
                    member.timeout(duration, reason)
    
                } catch (error) {
                    interaction.reply({ content: "Error while muting the user, try again.", ephemeral: true });
                }
            } else interaction.reply({ content: "Cannot mute someone who has more Mute Members permission.", ephemeral: true });
            
        } else interaction.reply({ content: "Cannot mute someone who has more privileges than you.", ephemeral: true });
    },
};