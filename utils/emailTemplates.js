export const registerTemplate = (payload) => {
    return `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to [Your Company/Platform]</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5;">
    
    <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; border-collapse: collapse; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 20px 20px 10px; text-align: center; background-color: #007bff;">
                <h2 style="color: #fff; margin: 0;">Welcome to MT</h2>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p style="color: #333;">Dear ${payload?.email},</p>
                <p style="color: #333;">Congratulations and welcome to MT! We are thrilled to have you onboard. You are now just one step away from accessing all the amazing features and benefits our platform has to offer.</p>
                <p style="color: #333;">To activate your account and start exploring, simply click on the activation link below:</p>
                <p style="text-align: center; margin: 20px 0;"><a href="${payload?.link}" target="_blank" rel="noopener noreferrer"} style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 25px;">Activate Your Account</a></p>
            </td>
        </tr>
    </table>
    
    </body>
    </html>`
}

export const forgetPasswordLinkTemplate = (payload) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; color: #333;">Password Reset</h2>
            <p style="color: #555; line-height: 1.5;">You have requested to reset your password. Click the button below to reset it:</p>
            <div style="text-align: center; margin-top: 20px;">
                <a href="${payload?.link}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Reset Password</a>
            </div>
            <p style="color: #555; line-height: 1.5; margin-top: 20px;">If you didn't request this, you can safely ignore this email.</p>
            <p style="color: #555;">Please note that this link will expire in ${payload?.expiry}, so be sure to activate your account soon.</p>
        </div>
    </body>
    </html>
    `
}