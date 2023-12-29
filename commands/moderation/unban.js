const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('unbans a User')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Who is getting unbanned')
                .setRequired(true))

        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers) //you can only use this command if you have the ban members permission
        .setDMPermission(false),

    async execute(interaction) {

        guild = interaction.guild;

        //getting user
        user = interaction.options.getUser('user');

        //unbanning the user
        try {
            await guild.members.unban(user)
            interaction.reply("User " + user.username + " has been unbanned by Marshall by order of " + interaction.user.username + ".\nHave an amazing day.");
        } catch (error) {
            interaction.reply({ content: "Error while unbanning the user, try again.", ephemeral: true });
        }

    },
};