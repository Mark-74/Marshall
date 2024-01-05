const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, Image, registerFont } = require('canvas');
const path = require('node:path');

backgroundPath = path.join(__dirname, '..\\..\\background.png');
registerFont('Montserrat-Black.ttf', { family: 'Montserrat Black' });

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

    roleName = role.name;
    memberName = member.displayName;

    if (memberName.length > 15) memberName = memberName.slice(0, 12) + "...";
    message = memberName + ' received ';

    if(message.length + roleName.length > 35 ) roleName = roleName.slice(0, roleName.length - (message.length + roleName.length - 35) - 3) + "...";
    message += '\nby ' + interaction.member.displayName; //the role name will be added later

    //adding the role
    if (interaction.member.roles.highest.position > role.position) {
      if (interaction.member.roles.highest.position > member.roles.highest.position) {
        try {

          member.roles.add(role, "You have been given the role " + role.name + " by " + interaction.user.tag);

          const canvas = createCanvas(1000, 256); //a pfp is 128 * 128
          const ctx = canvas.getContext('2d');

          //setting the background
          const background = new Image();
          background.src = backgroundPath;
          await background.onload;
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

          //setting the outline
          ctx.strokeStyle = 'blue';
          ctx.lineWidth = 5;
          ctx.strokeRect(0, 0, canvas.width, canvas.height);

          const image = new Image();
          image.src = member.displayAvatarURL({ extension: 'png' });

          image.onload = async function () {

            //adding the message to the canvas
            //first part of the message
            ctx.fillStyle = 'white';
            ctx.font = '35px Montserrat Black';
            ctx.fillText(message, 280, 114, 710);

            //box under role name
            ctx.fillStyle = role.hexColor;
            ctx.fillRect(280 + parseInt(ctx.measureText(message).width - 2.5), 82, parseInt(ctx.measureText(roleName).width + 6.5), 40);

            //role name
            ctx.fillStyle = 'white';
            ctx.fillText(roleName, 280 + parseInt(ctx.measureText(message).width + 0.5), 114, 710);

            //circle pfp
            ctx.beginPath();
            ctx.arc(128, 128, 120, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(image, 0, 0, 256, 256);

            const buffer = canvas.toBuffer('image/png');
            const attachment = new AttachmentBuilder(buffer, { name: 'image.png' });

            interaction.reply({ files: [attachment] });
          }

          image.onerror = function () {
            console.log('failed to load image');
            interaction.reply("Role " + role.name + " added to " + member.user.username + ".");
          }

        } catch (error) {
          interaction.reply({ content: "Error while adding the role, try again.", ephemeral: true });
        }
      } else interaction.reply({ content: "Cannot add a role to someone who has more privileges than you.", ephemeral: true });
    } else interaction.reply({ content: "Cannot add a role which guarantees more privileges than you have.", ephemeral: true });

  },
};