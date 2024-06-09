import { DateTime } from 'luxon'
import User from '#models/user'

export default class SubscriptionService {
  static async checkSubscriptionValidity(user: User): Promise<boolean> {
    if (user.subscription.status === 'inactive') {
      return false
    }

    const now = DateTime.local()
    const endsAt = DateTime.fromJSDate(new Date(user.subscription.endsAt))

    const isCancelledButStillActive = user.subscription.cancelled && endsAt > now
    const isActive = user.subscription.status === 'active' && !user.subscription.cancelled

    return isActive || isCancelledButStillActive
  }
}
