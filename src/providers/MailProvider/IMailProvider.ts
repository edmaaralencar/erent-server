export type TemplateVariable = {
  [key: string]: string | number
}

export type MailDTO = {
  to: string
  file: string
  variables: TemplateVariable
  subject: string
}

export interface IMailProvider {
  sendMail(data: MailDTO): Promise<void>
  parseEmailTemplate(file: string, variables: TemplateVariable): any
}
