'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/admin/cms')
      } else {
        setError('Invalid username or password')
      }
    } catch (error) {
      setError('An error occurred during login')
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-[400px]">
      <h1 className="text-3xl font-bold mb-8">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">Login</Button>
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => setIsResetDialogOpen(true)} 
          className="w-full mt-2"
        >
          Reset Password
        </Button>
      </form>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password Instructions</DialogTitle>
            <DialogDescription>
              Follow these steps to reset your password:
            </DialogDescription>
          </DialogHeader>
          <ol className="list-decimal list-inside space-y-2">
            <li>Login to <a href="https://console.upstash.com/redis" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://console.upstash.com/redis</a></li>
            <li>Click on your database</li>
            <li>Select Data Browser</li>
            <li>Edit the blue data key</li>
            <li>Inside it you will find your password</li>
          </ol>
          <Button onClick={() => setIsResetDialogOpen(false)} className="mt-4">Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

