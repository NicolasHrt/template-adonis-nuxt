import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Subscriptions extends BaseSchema {
  protected tableName = 'subscriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('customer_id')
      table.string('status')
      table.boolean('cancelled')
      table.string('ends_at')
      table.string('renews_at')
      table.integer('product_id')
      table.string('product_name')
      table.integer('variant_id')
      table.string('variant_name')
      table.string('card_brand')
      table.string('card_last_four')
      table.string('customer_portal')
      table.string('update_payment_method')
      table.string('customer_portal_update_subscription')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
