import { DashboardLayout } from "@/components/dashboard-layout"
import { EnhancedCommunityFeed } from "@/components/enhanced-community-feed"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CommunityPage() {
  return (
    <DashboardLayout>
      <div
        className="min-h-screen relative"
        style={{
          backgroundImage: `url('/images/wyoverse-digital-mountain.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Ghosted overlay for readability */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>

        <div className="relative z-10 flex flex-col gap-6 p-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-serif mb-2 text-gray-900">WyoVerse Pioneer Community</h1>
            <p className="text-lg text-gray-700 font-serif italic">
              "Where Digital Frontiersmen Gather to Share Tales & Trade"
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Facebook Integration Card */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-600 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook Connect
                </CardTitle>
                <CardDescription>Connect with pioneers on Facebook</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-serif">
                  Connect Facebook
                </button>
                <p className="text-sm text-gray-600 mt-2">Share your frontier adventures</p>
              </CardContent>
            </Card>

            {/* Marketplace Integration Card */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-600 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Trading Post
                </CardTitle>
                <CardDescription>Buy & sell frontier goods</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-serif">
                  Open Marketplace
                </button>
                <p className="text-sm text-gray-600 mt-2">Trade STONES, Tatonka & Artifacts</p>
              </CardContent>
            </Card>

            {/* Google Cloud Integration Card */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-red-600 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-red-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017 0z" />
                  </svg>
                  Cloud Storage
                </CardTitle>
                <CardDescription>Secure frontier data storage</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-serif">
                  Access Cloud
                </button>
                <p className="text-sm text-gray-600 mt-2">Backup your digital assets</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Community Feed</CardTitle>
              <CardDescription className="font-serif">
                Connect with other pioneers in the digital frontier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedCommunityFeed />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
