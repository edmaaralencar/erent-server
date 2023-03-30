export interface IStorageProvider {
  save(filename: string, folder: string): Promise<void>
  delete(filename: string, folder: string): Promise<void>
}
