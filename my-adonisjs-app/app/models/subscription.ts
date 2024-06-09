import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare customerId: number

  @column()
  declare status: string | boolean

  @column()
  declare cancelled: boolean

  @column()
  declare endsAt: string

  @column()
  declare renewsAt: string

  @column()
  declare productId: number

  @column()
  declare productName: string

  @column()
  declare variantId: number

  @column()
  declare variantName: string

  @column()
  declare cardBrand: string

  @column()
  declare cardLastFour: string

  @column()
  declare customerPortal: string

  @column()
  declare updatePaymentMethod: string

  @column()
  declare customerPortalUpdateSubscription: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
