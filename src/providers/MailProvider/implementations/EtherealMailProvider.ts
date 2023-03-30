import handlebars from 'handlebars'
import fs from 'fs'
import nodemailer, { Transporter } from 'nodemailer'
import { IMailProvider, MailDTO, TemplateVariable } from '../IMailProvider'

export class EtherealMailProvider implements IMailProvider {
  private client!: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then(() => {
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: 'ruthie.wisozk@ethereal.email',
            pass: 'ZNx99mur4JZytkzrvW',
          },
        })

        this.client = transporter
      })
      .catch((err) => console.log(err))
  }

  parseEmailTemplate(file: string, variables: TemplateVariable) {
    const templateFileContent = fs.readFileSync(file).toString('utf-8')
    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }

  async sendMail(data: MailDTO): Promise<void> {
    const emailTemplateAsHTML = this.parseEmailTemplate(
      data.file,
      data.variables,
    )

    const resultMail = await this.client.sendMail({
      to: data.to,
      from: 'ERent <noreplay@erent.com.br>',
      subject: data.subject,
      html: emailTemplateAsHTML,
    })

    console.log('Message sent: %s', resultMail.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(resultMail))
  }
}
