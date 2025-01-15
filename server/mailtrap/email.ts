import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmail";
import { client, sender } from "./mailtrap";

export const sendverificationEmail = async (email: string, verificationToken: string) => {
    const recipient = [{ email }];
   
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Verify Your email",
            html: htmlContent.replace("{verificationToken}",verificationToken),
            category: "Email Verification",
        })

    } catch (err) {
        console.log(err);
        throw new Error("Failed to send email verification");
    }
}

export const sendWelcomeEmail = async (email: string, name: string) => {
    const recipient = [{ email }];
    const htmlContent = generateWelcomeEmailHtml(name);
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Welcome to Food Express",
            html: htmlContent,
            template_variables: {
                company_info_name: "FoodExpress",
                name: name
            }
        })

    } catch (err) {
        console.log(err);
        throw new Error("Failed to send email welcome email");
    }
}


export const sendPasswordRsetEmail = async (email: string, resetURL: string) => {
    const recipient = [{ email }];
    const htmlContent = generatePasswordResetEmailHtml(resetURL);
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: htmlContent,
            category: "Reset Password",
        })

    } catch (err) {
        console.log(err);
        throw new Error("Failed to rest password");
    }
}


export const sendResetSuccessEmail = async (email: string) => {
    const recipient = [{ email }];
    const htmlContent = generateResetSuccessEmailHtml();
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successfully",
            html: htmlContent,
            category: " Password Reset",
        })

    } catch (err) {
        console.log(err);
        throw new Error("Failed to send password reset success email");
    }
}