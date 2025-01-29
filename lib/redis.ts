import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: 'https://good-coral-27587.upstash.io',
  token: 'AWvDAAIjcDE5ZGQzNjI2Y2JjNTQ0ZjRiOTNhOGY2NmVkMDIzYjgzYXAxMA',
})

export async function initializeAdmin() {
  const adminExists = await redis.exists('admin:minislim')
  if (!adminExists) {
    await redis.set('admin:minislim', 'olatunde')
    console.log('Initial admin user created successfully')
  }
}

export async function getAdminPassword(username: string) {
  return redis.get(`admin:${username}`)
}

