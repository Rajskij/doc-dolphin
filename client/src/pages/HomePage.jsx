import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import analyzeScreenshot from "./analyze-tab.png"; // Replace with actual images
// import historyScreenshot from "./history-tab.png";
// import moodScreenshot from "./mood-tab.png";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-9rem)] p-6">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Doc Dolphin</h1>
        <p className="text-foreground">Track health & mood for better insights</p>
      </header>

      {/* Main Tabs */}
      <Tabs defaultValue="analyze" className="mx-auto max-w-4xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analyze" className="flex items-center gap-2">
            Test Analyze
          </TabsTrigger>
          <TabsTrigger value="mood" className="flex items-center gap-2">
            Mood Tracker
          </TabsTrigger>
        </TabsList>

        {/* Analyze Tab */}
        <TabsContent value="analyze">
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Analyze Medical Tests</h2>
              <p className="text-gray-600">
                Track how you feel alongside test results.
              </p>
              <img
                src={'analyzeScreenshot'}
                alt="Analysis Interface"
                className="rounded-lg border shadow-sm"
              />
              <Button className="py-2 px-4">
                Analyze Test
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Mood Tracker Tab */}
        <TabsContent value="mood">
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Daily Mood Log</h2>
              <p className="text-gray-600">
                Track how you feel alongside test results.
              </p>
              <img
                src={'moodScreenshot'}
                alt="Mood Tracker Interface"
                className="rounded-lg border shadow-sm"
              />
              <div className="flex gap-2">
                <Button className="py-2 px-4">
                  View Trends
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
