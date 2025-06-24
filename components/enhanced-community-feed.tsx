"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Heart, MessageSquare, Share2, Facebook, ShoppingCart, Cloud } from "lucide-react"

type Post = {
  id: string
  author: {
    name: string
    avatar: string
    verified?: boolean
    platform?: "facebook" | "marketplace" | "cloud"
  }
  content: string
  timestamp: Date
  likes: number
  comments: number
  liked: boolean
  type?: "social" | "marketplace" | "cloud"
  price?: string
  category?: string
}

const initialPosts: Post[] = [
  {
    id: "post-1",
    author: {
      name: "Wyoming Ranger",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      platform: "facebook",
    },
    content:
      "Just minted my first land deed in the Canyon Bluff area. Anyone else exploring out that way? The digital mountain views are incredible! 🏔️",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    likes: 12,
    comments: 3,
    liked: false,
    type: "social",
  },
  {
    id: "post-2",
    author: {
      name: "Crypto Cowboy",
      avatar: "/placeholder.svg?height=40&width=40",
      platform: "marketplace",
    },
    content:
      "🏪 TRADING POST: Rare Tatonka tokens for sale! Market sentiment is up and I'm seeing green across the board. Perfect time to invest in the frontier!",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    likes: 8,
    comments: 2,
    liked: false,
    type: "marketplace",
    price: "50 STONES",
    category: "Tokens",
  },
  {
    id: "post-3",
    author: {
      name: "Digital Prospector",
      avatar: "/placeholder.svg?height=40&width=40",
      platform: "cloud",
    },
    content:
      "☁️ Cloud backup complete! Found a great mining spot near Gold Ridge. My hash rate has doubled since setting up there. All data safely stored in Google Cloud.",
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    likes: 15,
    comments: 5,
    liked: false,
    type: "cloud",
  },
  {
    id: "post-4",
    author: {
      name: "Frontier Artist",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      platform: "facebook",
    },
    content:
      "🎨 Just finished a new digital art piece inspired by the WyoVerse mountains! The way the blockchain networks flow through the landscape is mesmerizing. Check out my Facebook page for more frontier art!",
    timestamp: new Date(Date.now() - 1000 * 60 * 360),
    likes: 23,
    comments: 7,
    liked: false,
    type: "social",
  },
  {
    id: "post-5",
    author: {
      name: "Marketplace Maven",
      avatar: "/placeholder.svg?height=40&width=40",
      platform: "marketplace",
    },
    content:
      "🛒 FLASH SALE: Rare Artifacts from the digital frontier! Limited time offer on ancient STONES and mystical Tatonka. Don't miss out pioneers!",
    timestamp: new Date(Date.now() - 1000 * 60 * 480),
    likes: 18,
    comments: 12,
    liked: false,
    type: "marketplace",
    price: "25-100 STONES",
    category: "Artifacts",
  },
]

export function EnhancedCommunityFeed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState<"social" | "marketplace" | "cloud">("social")
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

  const handleShare = (postId: string, platform?: string) => {
    const post = posts.find((p) => p.id === postId)
    if (platform === "facebook") {
      toast({
        title: "Sharing to Facebook",
        description: "Post shared to your Facebook timeline!",
      })
    } else {
      toast({
        title: "Share Feature",
        description: "Sharing capabilities are expanding across all platforms!",
      })
    }
  }

  const handlePostSubmit = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: `post-${Date.now()}`,
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        platform:
          selectedPlatform === "social" ? "facebook" : selectedPlatform === "marketplace" ? "marketplace" : "cloud",
      },
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      liked: false,
      type: selectedPlatform,
    }

    setPosts((prev) => [post, ...prev])
    setNewPost("")

    toast({
      title: "Post Created",
      description: `Your ${selectedPlatform} post has been published to the community feed.`,
    })
  }

  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-600" />
      case "marketplace":
        return <ShoppingCart className="h-4 w-4 text-green-600" />
      case "cloud":
        return <Cloud className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getPostTypeColor = (type?: string) => {
    switch (type) {
      case "social":
        return "border-l-blue-500"
      case "marketplace":
        return "border-l-green-500"
      case "cloud":
        return "border-l-red-500"
      default:
        return "border-l-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Post Creation */}
      <div className="space-y-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg border">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex gap-2 mb-2">
              <Button
                variant={selectedPlatform === "social" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPlatform("social")}
                className="flex items-center gap-1"
              >
                <Facebook className="h-4 w-4" />
                Social
              </Button>
              <Button
                variant={selectedPlatform === "marketplace" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPlatform("marketplace")}
                className="flex items-center gap-1"
              >
                <ShoppingCart className="h-4 w-4" />
                Marketplace
              </Button>
              <Button
                variant={selectedPlatform === "cloud" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPlatform("cloud")}
                className="flex items-center gap-1"
              >
                <Cloud className="h-4 w-4" />
                Cloud
              </Button>
            </div>
            <Input
              placeholder={`Share something with the ${selectedPlatform} community...`}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="font-serif"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handlePostSubmit} disabled={!newPost.trim()} className="font-serif">
            Post to {selectedPlatform}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="all" className="font-serif">
            All Posts
          </TabsTrigger>
          <TabsTrigger value="social" className="font-serif flex items-center gap-1">
            <Facebook className="h-4 w-4" />
            Social
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="font-serif flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="cloud" className="font-serif flex items-center gap-1">
            <Cloud className="h-4 w-4" />
            Cloud
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              getPlatformIcon={getPlatformIcon}
              getPostTypeColor={getPostTypeColor}
            />
          ))}
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          {posts
            .filter((post) => post.type === "social")
            .map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                getPlatformIcon={getPlatformIcon}
                getPostTypeColor={getPostTypeColor}
              />
            ))}
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4">
          {posts
            .filter((post) => post.type === "marketplace")
            .map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                getPlatformIcon={getPlatformIcon}
                getPostTypeColor={getPostTypeColor}
              />
            ))}
        </TabsContent>

        <TabsContent value="cloud" className="space-y-4">
          {posts
            .filter((post) => post.type === "cloud")
            .map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                getPlatformIcon={getPlatformIcon}
                getPostTypeColor={getPostTypeColor}
              />
            ))}
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
  getPlatformIcon,
  getPostTypeColor,
}: {
  post: Post
  onLike: (id: string) => void
  onComment: (id: string) => void
  onShare: (id: string, platform?: string) => void
  getPlatformIcon: (platform?: string) => React.ReactNode
  getPostTypeColor: (type?: string) => string
}) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-sm border-l-4 ${getPostTypeColor(post.type)} rounded-lg p-4 space-y-4 shadow-sm`}
    >
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium font-serif">{post.author.name}</p>
            {post.author.verified && <span className="text-blue-500">✓</span>}
            {getPlatformIcon(post.author.platform)}
          </div>
          <p className="text-xs text-muted-foreground font-serif">{post.timestamp.toLocaleString()}</p>
          {post.price && (
            <p className="text-sm font-bold text-green-600 font-serif">
              Price: {post.price} • Category: {post.category}
            </p>
          )}
        </div>
      </div>

      <p className="font-serif">{post.content}</p>

      <div className="flex gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLike(post.id)}
          className={`font-serif ${post.liked ? "text-red-500" : ""}`}
        >
          <Heart className="h-4 w-4 mr-1" />
          {post.likes}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onComment(post.id)} className="font-serif">
          <MessageSquare className="h-4 w-4 mr-1" />
          {post.comments}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onShare(post.id, post.author.platform)} className="font-serif">
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>
    </div>
  )
}
