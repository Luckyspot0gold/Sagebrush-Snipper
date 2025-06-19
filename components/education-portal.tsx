"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { BookOpen, Building2, GraduationCap, School } from "lucide-react"
import Link from "next/link"

type Course = {
  id: string
  title: string
  institution: string
  description: string
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  category: "blockchain" | "finance" | "technology" | "history" | "science"
}

const courses: Course[] = [
  {
    id: "course-1",
    title: "Blockchain Fundamentals",
    institution: "University of Wyoming",
    description: "An introduction to blockchain technology and its applications in the digital economy.",
    duration: "8 weeks",
    level: "beginner",
    category: "blockchain",
  },
  {
    id: "course-2",
    title: "Cryptocurrency Trading Strategies",
    institution: "WyoVerse Financial Academy",
    description: "Learn advanced trading techniques for cryptocurrency markets.",
    duration: "6 weeks",
    level: "intermediate",
    category: "finance",
  },
  {
    id: "course-3",
    title: "Digital Land Management",
    institution: "Wyoming Tech Institute",
    description: "Understand how to manage, develop, and monetize virtual land assets.",
    duration: "4 weeks",
    level: "beginner",
    category: "technology",
  },
  {
    id: "course-4",
    title: "Wyoming History in the Digital Age",
    institution: "Wyoming Historical Society",
    description: "Explore Wyoming's rich history through interactive digital experiences.",
    duration: "10 weeks",
    level: "beginner",
    category: "history",
  },
  {
    id: "course-5",
    title: "Advanced Smart Contract Development",
    institution: "University of Wyoming",
    description: "Learn to create and audit secure smart contracts for blockchain applications.",
    duration: "12 weeks",
    level: "advanced",
    category: "blockchain",
  },
  {
    id: "course-6",
    title: "Renewable Energy Systems",
    institution: "Wyoming Energy Institute",
    description: "Study virtual and real-world renewable energy technologies and markets.",
    duration: "8 weeks",
    level: "intermediate",
    category: "science",
  },
]

export function EducationPortal() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSignUp = () => {
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Sign-up Successful",
      description: "Thank you for signing up! You'll receive information about our educational programs.",
    })

    setEmail("")
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <GraduationCap className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">University of Wyoming</h3>
          <p className="text-sm text-muted-foreground mt-1">Official digital campus with accredited courses</p>
          <Link href="https://www.uwyo.edu/" target="_blank">
            <Button variant="link" className="mt-2">
              Visit Website
            </Button>
          </Link>
        </div>

        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <School className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">WyoVerse Academy</h3>
          <p className="text-sm text-muted-foreground mt-1">Specialized courses in blockchain and digital assets</p>
          <Button variant="link" className="mt-2">
            Explore Courses
          </Button>
        </div>

        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <Building2 className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">OSHA VR Training</h3>
          <p className="text-sm text-muted-foreground mt-1">Virtual reality safety certification programs</p>
          <Link href="/osha">
            <Button variant="link" className="mt-2">
              View Programs
            </Button>
          </Link>
        </div>

        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <BookOpen className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">Community Workshops</h3>
          <p className="text-sm text-muted-foreground mt-1">Free educational events and workshops</p>
          <Button variant="link" className="mt-2">
            See Calendar
          </Button>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Available Courses</h3>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="science">Science</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          {["blockchain", "finance", "technology", "history", "science"].map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {courses
                  .filter((course) => course.category === category)
                  .map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Sign Up for Educational Updates</h3>
        <div className="flex gap-4 max-w-md">
          <Input placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button onClick={handleSignUp}>Sign Up</Button>
        </div>
      </div>
    </div>
  )
}

function CourseCard({ course }: { course: Course }) {
  const { toast } = useToast()

  const handleEnroll = (course: Course) => {
    toast({
      title: "Enrollment Request Sent",
      description: `You've requested enrollment in "${course.title}". Check your email for confirmation.`,
    })
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between">
        <h3 className="font-medium">{course.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            course.level === "beginner"
              ? "bg-green-100 text-green-800"
              : course.level === "intermediate"
                ? "bg-blue-100 text-blue-800"
                : "bg-purple-100 text-purple-800"
          }`}
        >
          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{course.institution}</p>
      <p className="text-sm mt-2">{course.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm">Duration: {course.duration}</span>
        <Button size="sm" onClick={() => handleEnroll(course)}>
          Enroll
        </Button>
      </div>
    </div>
  )
}
