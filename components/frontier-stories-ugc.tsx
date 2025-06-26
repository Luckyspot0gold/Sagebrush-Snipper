"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Star, Trophy, Feather } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FrontierStory {
  id: string
  author: string
  avatar: string
  title: string
  content: string
  timestamp: string
  likes: number
  comments: number
  category: "adventure" | "trading" | "boxing" | "land" | "community"
  featured: boolean
  tags: string[]
}

const SAMPLE_STORIES: FrontierStory[] = [
  {
    id: "1",
    author: "CowboyMike1852",
    avatar: "/placeholder-user.jpg",
    title: "The Great Stone Rush of Plot 47",
    content: `Well partner, let me tell you about the day I struck it rich on my little plot of digital land. Started like any other morning - Bill was pourin' coffee and tellin' tales about the old days. But when I checked my land, there were stones everywhere! Must've been 200 of 'em, glitterin' like diamonds in the morning sun. Spent the whole day collectin', and by evening I had enough to upgrade my boxing gloves to premium leather. Next day, I challenged Thunder Pete to a match and knocked him out in round 2! Sometimes the frontier provides, you just gotta be ready to work for it.`,
    timestamp: "2 hours ago",
    likes: 47,
    comments: 12,
    category: "adventure",
    featured: true,
    tags: ["stones", "boxing", "land", "success"],
  },
  {
    id: "2",
    author: "DigitalAnnie",
    avatar: "/placeholder-user.jpg",
    title: "Bill Saved My Trading Career",
    content: `Y'all, I was about to lose everything. Made some bad trades, down to my last 5 AVAX, ready to quit the frontier life. Then I sat down with Bar Keep Bill for what I thought would be my farewell drink. That AI bartender looked at my wallet history and said "Annie, you're not a quitter, you're just trading with your heart instead of your head." He showed me the market patterns, explained the commodity cycles, and gave me a strategy. Three weeks later, I'm up 300% and just bought my second plot of land. Bill ain't just a bartender, he's a frontier guardian angel.`,
    timestamp: "5 hours ago",
    likes: 89,
    comments: 23,
    category: "trading",
    featured: false,
    tags: ["bill", "trading", "comeback", "ai"],
  },
  {
    id: "3",
    author: "BoxingBear",
    avatar: "/placeholder-user.jpg",
    title: "From Zero to Boxing Legend",
    content: `Started WyoVerse three months ago with nothing but determination and a dream. No land, no stones, no fancy gear - just these two fists and a whole lot of grit. Spent my first week losing every fight, getting laughed out of the saloon. But every loss taught me something. Studied the patterns, learned the timing, saved every stone I could find. Finally got my first win against RustyCowpoke, and it felt better than striking oil! Now I'm ranked #3 in the territory with a 47-2 record. The frontier rewards those who never give up.`,
    timestamp: "1 day ago",
    likes: 156,
    comments: 34,
    category: "boxing",
    featured: true,
    tags: ["boxing", "perseverance", "ranking", "inspiration"],
  },
]

export function FrontierStoriesUGC() {
  const [stories, setStories] = useState<FrontierStory[]>(SAMPLE_STORIES)
  const [newStory, setNewStory] = useState({ title: "", content: "", category: "adventure" as const })
  const [showWriteForm, setShowWriteForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", name: "All Stories", icon: "📚" },
    { id: "adventure", name: "Adventures", icon: "🏔️" },
    { id: "trading", name: "Trading Tales", icon: "💰" },
    { id: "boxing", name: "Boxing Stories", icon: "🥊" },
    { id: "land", name: "Land Chronicles", icon: "🏡" },
    { id: "community", name: "Community", icon: "🤝" },
  ]

  const filteredStories =
    selectedCategory === "all" ? stories : stories.filter((story) => story.category === selectedCategory)

  const handleLike = (storyId: string) => {
    setStories((prev) => prev.map((story) => (story.id === storyId ? { ...story, likes: story.likes + 1 } : story)))
  }

  const submitStory = () => {
    if (newStory.title && newStory.content) {
      const story: FrontierStory = {
        id: Date.now().toString(),
        author: "You",
        avatar: "/placeholder-user.jpg",
        title: newStory.title,
        content: newStory.content,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        category: newStory.category,
        featured: false,
        tags: [],
      }
      setStories((prev) => [story, ...prev])
      setNewStory({ title: "", content: "", category: "adventure" })
      setShowWriteForm(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "adventure":
        return "bg-green-500"
      case "trading":
        return "bg-blue-500"
      case "boxing":
        return "bg-red-500"
      case "land":
        return "bg-yellow-500"
      case "community":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2 font-serif">Frontier Stories</h1>
          <p className="text-lg text-amber-700 mb-4">
            Share your adventures, victories, and wisdom from the digital frontier
          </p>
          <Button onClick={() => setShowWriteForm(!showWriteForm)} className="bg-amber-600 hover:bg-amber-700">
            <Feather className="w-4 h-4 mr-2" />
            Write Your Story
          </Button>
        </div>

        {/* Write Story Form */}
        <AnimatePresence>
          {showWriteForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <Card className="border-2 border-amber-300">
                <CardHeader>
                  <CardTitle className="text-amber-900 font-serif">Share Your Frontier Tale</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Give your story a catchy title..."
                    value={newStory.title}
                    onChange={(e) => setNewStory((prev) => ({ ...prev, title: e.target.value }))}
                    className="border-amber-200"
                  />
                  <Textarea
                    placeholder="Tell us about your adventure, partner! What happened? What did you learn? How did it change your frontier journey?"
                    value={newStory.content}
                    onChange={(e) => setNewStory((prev) => ({ ...prev, content: e.target.value }))}
                    className="min-h-32 border-amber-200"
                  />
                  <div className="flex gap-4">
                    <select
                      value={newStory.category}
                      onChange={(e) => setNewStory((prev) => ({ ...prev, category: e.target.value as any }))}
                      className="px-3 py-2 border border-amber-200 rounded-md"
                    >
                      <option value="adventure">Adventure</option>
                      <option value="trading">Trading</option>
                      <option value="boxing">Boxing</option>
                      <option value="land">Land</option>
                      <option value="community">Community</option>
                    </select>
                    <Button onClick={submitStory} className="bg-green-600 hover:bg-green-700">
                      Publish Story
                    </Button>
                    <Button
                      onClick={() => setShowWriteForm(false)}
                      variant="outline"
                      className="border-amber-600 text-amber-600"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={
                selectedCategory === category.id
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "border-amber-600 text-amber-600 hover:bg-amber-50"
              }
              size="sm"
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>

        {/* Stories Feed */}
        <div className="space-y-6">
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`relative overflow-hidden ${
                  story.featured
                    ? "border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-100"
                    : "border border-amber-200 bg-white"
                }`}
              >
                {story.featured && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-yellow-500 text-yellow-900">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={story.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{story.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-amber-900">{story.author}</h3>
                        <Badge className={`${getCategoryColor(story.category)} text-white text-xs`}>
                          {story.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-amber-600">{story.timestamp}</p>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-serif text-amber-900 mt-2">{story.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-amber-800 leading-relaxed mb-4 whitespace-pre-line">{story.content}</p>

                  {/* Tags */}
                  {story.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {story.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2 border-t border-amber-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(story.id)}
                      className="text-amber-600 hover:text-red-500 hover:bg-red-50"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {story.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-amber-600 hover:text-blue-500 hover:bg-blue-50">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {story.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-amber-600 hover:text-green-500 hover:bg-green-50">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 bg-amber-100 rounded-lg p-6">
          <h3 className="text-xl font-bold text-amber-900 mb-2">Every Pioneer Has a Story</h3>
          <p className="text-amber-700 mb-4">
            Your adventures inspire others and build the legend of WyoVerse. Share your tale and become part of frontier
            history!
          </p>
          <Button onClick={() => setShowWriteForm(true)} className="bg-amber-600 hover:bg-amber-700">
            <Trophy className="w-4 h-4 mr-2" />
            Share Your Legend
          </Button>
        </div>
      </div>
    </div>
  )
}
