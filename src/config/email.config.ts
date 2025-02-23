import type { SendMailOptions } from 'nodemailer';
const emailConfig = {
  host: 'smtp.qq.com',
  port: 465,
  auth: {
    user: 'user@qq.com',
    pass: 'pass',
  },
};

export const mailOptions = (
  email: string,
  verifyCode: string,
): SendMailOptions => {
  return {
    from: emailConfig.auth.user,
    // 邮件标题
    subject: '欢迎注册 Json Blog',
    // 目标邮箱
    to: email,
    // 邮件内容
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
      <h2 style="color: #333;">欢迎注册我的博客！</h2>
      <p style="font-size: 16px; color: #555;">
        你好！感谢你注册我的个人博客。
      </p>
      <p style="font-size: 16px; color: #555;">
        本次验证码为：<strong style="font-size: 24px; color: #007bff;">${verifyCode}</strong>
      </p>
      <p style="font-size: 16px; color: #555;">
        请在 <strong>5分钟</strong> 内完成注册！超时验证码将过期。
      </p>
      <p style="font-size: 16px; color: #555;">
        如非本人操作，请忽略此邮件，由此给您带来的不便请谅解！
      </p>
      <footer style="margin-top: 20px; font-size: 14px; color: #777;">
        <p>感谢您的支持！</p>
        <p>Json Blog</p>
      </footer>
    </div>
  `,
  };
};

export default emailConfig;
