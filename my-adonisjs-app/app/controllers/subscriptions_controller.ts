import type { HttpContext } from '@adonisjs/core/http'
import Subscription from '#models/subscription'

export default class SubscriptionsController {
  async update({ request }: HttpContext) {
    const body = request.all()

    await Subscription.query().where('user_id', body.meta.custom_data.user_id).update({
      userId: body.meta.custom_data.user_id,
      customerId: body.data.attributes.customer_id,
      status: body.data.attributes.status,
      cancelled: body.data.attributes.cancelled,
      endsAt: body.data.attributes.ends_at,
      renewsAt: body.data.attributes.renews_at,
      productId: body.data.attributes.product_id,
      productName: body.data.attributes.product_name,
      variantId: body.data.attributes.variant_id,
      variantName: body.data.attributes.variant_name,
      cardBrand: body.data.attributes.card_brand,
      cardLastFour: body.data.attributes.card_last_four,
      customerPortal: body.data.attributes.urls.customer_portal,
      updatePaymentMethod: body.data.attributes.urls.update_payment_method,
      customerPortalUpdateSubscription:
        body.data.attributes.urls.customer_portal_update_subscription,
    })
  }
}
