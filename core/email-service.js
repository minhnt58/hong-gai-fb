'use strict';

const API_KEY_SENDGRID = process.env.SENDGRID_API_KEY;

const sg = require('sendgrid')(API_KEY_SENDGRID);

module.exports.sendHongFb = function (userDetail, cb) {
    let title = '[Hóng gái] yeahhhhhh!';

    let content_html =
        '<p>' + 'Xin chào bạn'+'</p>'
        + '<p>' + 'Đối tượng '+ userDetail.fb_link + ' đã active fb' + '</p>';

    sendEmail('fries.uet@gmail.com', 'Fries', userDetail.email, '', title, content_html, cb);
};

function sendEmail(from, fromName, to, toName, title, content_html, callback) {
    // let from = 'fries.uet@gmail.com';
    // let to = email_user;

    let helper = require('sendgrid').mail;
    let from_email = new helper.Email(from, fromName);
    let to_email = new helper.Email(to, toName);
    // var to_email = new helper.Email(to);
    let subject = title;
    let content = new helper.Content('text/html', content_html);
    let mail = new helper.Mail(from_email, subject, to_email, content);

    let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, function (error, response) {
        // console.log('status code: ' + response.statusCode);
        // console.log(response.body);
        // console.log(response.headers);

        if (response.statusCode == 202) {
            callback(false);
        } else {
            callback(true);
        }
    });
}