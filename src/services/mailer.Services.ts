import nodemailer from 'nodemailer';

export const transpoter = nodemailer.createTransport({
    service: "gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
});


export const sendMail = async (to:string, subject:string, html:string) => {
    try {
        await transpoter.sendMail({
            from: `Suporte <${process.env.EMAIL_USER}>`, //Remetente
            to,                                          //Destinatario
            subject,                                     //Assuto do e-mail
            html                                         //Corpo do e-mail HTML
        });
        console.log(`E-mail enviado com sucesso!`);
        
    } catch (error) {
        console.error(`Erro ao enviar e-mail! ${error}`);
    };
};