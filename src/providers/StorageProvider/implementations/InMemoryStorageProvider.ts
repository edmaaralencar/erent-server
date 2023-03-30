import { IStorageProvider } from '../IStorageProvider'

export class InMemoryStorageProvider implements IStorageProvider {
  public items: Array<{ filename: string }> = []

  async save(filename: string): Promise<void> {
    this.items.push({ filename })
  }

  async delete(filename: string): Promise<void> {
    const propertyIndex = this.items.findIndex(
      (item) => item.filename === filename,
    )

    this.items.splice(propertyIndex, 1)
  }
}
