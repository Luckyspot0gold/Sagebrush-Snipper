"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Heart, MessageSquare, Share2 } from "lucide-react"

type Post = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  timestamp: Date
  likes: number
  comments: number
  liked: boolean
}

const initialPosts: Post[] = [
  {
    id: "post-1",
    author: {
      name: "Wyoming Ranger",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Just minted my first land deed in the Canyon Bluff area. Anyone else exploring out that way?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    likes: 12,
    comments: 3,
    liked: false,
  },
  {
    id: "post-2",
    author: {
      name: "Crypto Cowboy",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "WyoCoin is looking bullish today! Market sentiment is up and I'm seeing green across the board.",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    likes: 8,
    comments: 2,
    liked: false,
  },
  {
    id: "post-3",
    author: {
      name: "Digital Prospector",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Found a great mining spot near Gold Ridge. My hash rate has doubled since setting up there!",
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    likes: 15,
    comments: 5,
    liked: false,
  },
]

export function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState("")
  const { toast } = useToast()

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          }
        }
        return post
      }),
    )
  }

  const handleComment = (postId: string) => {
    toast({
      title: "Comment Feature",
      description: "Comments are coming soon to WyoVerse Community!",
    })
  }

  const handleShare = (postId: string) => {
    toast({
      title: "Share Feature",
      description: "Sharing is coming soon to WyoVerse Community!",
    })
  }

  const handlePostSubmit = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: `post-${Date.now()}`,
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      liked: false,
    }

    setPosts((prev) => [post, ...prev])
    setNewPost("")

    toast({
      title: "Post Created",
      description: "Your post has been published to the community feed.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input
              placeholder="Share something with the community..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
            Post
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="land">Land & Mining</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} onShare={handleShare} />
          ))}
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          {posts
            .filter(
              (post) =>
                post.content.toLowerCase().includes("market") ||
                post.content.toLowerCase().includes("coin") ||
                post.content.toLowerCase().includes("price"),
            )
            .map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} onShare={handleShare} />
            ))}
        </TabsContent>

        <TabsContent value="land" className="space-y-4">
          {posts
            .filter(
              (post) =>
                post.content.toLowerCase().includes("land") ||
                post.content.toLowerCase().includes("mining") ||
                post.content.toLowerCase().includes("deed"),
            )
            .map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} onShare={handleShare} />
            ))}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No events have been posted yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PostCard({
  post,
  onLike,
  onComment,
  onShare,
}: {
  post: Post
  onLike: (id: string) => void
  onComment: (id: string) => void
  onShare: (id: string) => void
}) {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{post.author.name}</p>
          <p className="text-xs text-muted-foreground">{post.timestamp.toLocaleString()}</p>
        </div>
      </div>

      <p>{post.content}</p>

      <div className="flex gap-4">
        <Button variant="ghost" size="sm" onClick={() => onLike(post.id)} className={post.liked ? "text-red-500" : ""}>
          <Heart className="h-4 w-4 mr-1" />
          {post.likes}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onComment(post.id)}>
          <MessageSquare className="h-4 w-4 mr-1" />
          {post.comments}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onShare(post.id)}>
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>
    </div>
  )
}
