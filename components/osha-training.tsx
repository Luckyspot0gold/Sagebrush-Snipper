"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { HardHat, Shield, Factory, Construction, Truck } from "lucide-react"

type TrainingProgram = {
  id: string
  title: string
  description: string
  duration: string
  certification: string
  industry: "construction" | "mining" | "manufacturing" | "transportation" | "general"
}

const trainingPrograms: TrainingProgram[] = [
  {
    id: "osha-1",
    title: "Construction Site Safety",
    description: "Virtual reality training for identifying and mitigating hazards on construction sites.",
    duration: "4 hours",
    certification: "OSHA 10-Hour Construction",
    industry: "construction",
  },
  {
    id: "osha-2",
    title: "Mining Operations Safety",
    description: "Comprehensive safety training for underground and surface mining operations.",
    duration: "8 hours",
    certification: "MSHA Part 48 Compliance",
    industry: "mining",
  },
  {
    id: "osha-3",
    title: "Manufacturing Safety Protocols",
    description: "Training for machine operation, lockout/tagout procedures, and factory floor safety.",
    duration: "6 hours",
    certification: "OSHA General Industry",
    industry: "manufacturing",
  },
  {
    id: "osha-4",
    title: "Transportation Safety",
    description: "Safety training for commercial drivers and transportation workers.",
    duration: "4 hours",
    certification: "DOT Compliance",
    industry: "transportation",
  },
  {
    id: "osha-5",
    title: "Fall Protection",
    description: "Specialized training for working at heights and using fall protection equipment.",
    duration: "3 hours",
    certification: "OSHA Fall Protection",
    industry: "construction",
  },
  {
    id: "osha-6",
    title: "Hazardous Materials Handling",
    description: "Training for safe handling, storage, and disposal of hazardous materials.",
    duration: "5 hours",
    certification: "HAZWOPER Awareness",
    industry: "general",
  },
]

export function OSHATraining() {
  const { toast } = useToast()

  const handleEnroll = (program: TrainingProgram) => {
    toast({
      title: "Enrollment Successful",
      description: `You've enrolled in "${program.title}". Your VR training kit will be prepared.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <HardHat className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">OSHA Certified</h3>
          <p className="text-sm text-muted-foreground mt-1">All training programs meet or exceed OSHA requirements</p>
        </div>

        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <Shield className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">VR Immersion</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Realistic scenarios in virtual environments for effective learning
          </p>
        </div>

        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <Construction className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">Industry Specific</h3>
          <p className="text-sm text-muted-foreground mt-1">Tailored training for different industries and job roles</p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Available Training Programs</h3>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Programs</TabsTrigger>
            <TabsTrigger value="construction">Construction</TabsTrigger>
            <TabsTrigger value="mining">Mining</TabsTrigger>
            <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
            <TabsTrigger value="transportation">Transportation</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {trainingPrograms.map((program) => (
                <TrainingCard key={program.id} program={program} onEnroll={handleEnroll} />
              ))}
            </div>
          </TabsContent>

          {["construction", "mining", "manufacturing", "transportation", "general"].map((industry) => (
            <TabsContent key={industry} value={industry} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {trainingPrograms
                  .filter((program) => program.industry === industry)
                  .map((program) => (
                    <TrainingCard key={program.id} program={program} onEnroll={handleEnroll} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">How VR Training Works</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">1. Enroll in a Program</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Select a training program that matches your industry needs.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">2. Receive VR Equipment</h4>
            <p className="text-sm text-muted-foreground mt-1">Get access to the WyoVerse VR training environment.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">3. Complete Certification</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Finish the training and receive your OSHA certification.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TrainingCard({
  program,
  onEnroll,
}: {
  program: TrainingProgram
  onEnroll: (program: TrainingProgram) => void
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start gap-3">
        {program.industry === "construction" && <Construction className="h-5 w-5 text-primary flex-shrink-0" />}
        {program.industry === "mining" && <HardHat className="h-5 w-5 text-primary flex-shrink-0" />}
        {program.industry === "manufacturing" && <Factory className="h-5 w-5 text-primary flex-shrink-0" />}
        {program.industry === "transportation" && <Truck className="h-5 w-5 text-primary flex-shrink-0" />}
        {program.industry === "general" && <Shield className="h-5 w-5 text-primary flex-shrink-0" />}
        <div>
          <h3 className="font-medium">{program.title}</h3>
          <p className="text-sm text-muted-foreground">Certification: {program.certification}</p>
        </div>
      </div>
      <p className="text-sm mt-2">{program.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm">Duration: {program.duration}</span>
        <Button size="sm" onClick={() => onEnroll(program)}>
          Enroll
        </Button>
      </div>
    </div>
  )
}
