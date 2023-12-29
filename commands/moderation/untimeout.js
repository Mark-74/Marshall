const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove_timeout')
        .setDescription('time_outs a User')

        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Who is being timed out')
                .setRequired(true))

        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers) //you can only use this command if you have the mute members permission
        .setDMPermission(false),

    async execute(interaction) {

        guild = interaction.guild;

        //getting member, duration and unit
        member = await guild.members.fetch(interaction.options.getUser('user').id);

        try {
            member.timeout(null) //by passing a null value, the timeout gets removed
            interaction.reply(interaction.user.tag + " has removed the timeout from " + member.user.tag);
        } catch (error) {
            interaction.reply({ content: "Error while muting the user, try again.", ephemeral: true });
        }
    }
};