import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useTheme } from "@/context/ThemProvider";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuthContext()
  const { theme } = useTheme();

  console.log('this is theme', getImgUrl('/analyzer'))

  function getImgUrl(img) {
    let color = theme;
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      color = systemTheme;
    }
    return `${img}-${color}.png`;
  }

  function handleClick(url) {
    if (!user) return navigate('/login')
    navigate(url);
  }

  return (
    <div className="min-h-[calc(100vh-9rem)] p-6">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Doc Dolphin</h1>
        <p className="text-foreground">Helps you better understand your mental health through two key tools</p>
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
              <h2 className="text-xl font-semibold">Test Analyzer</h2>
              <ul className="text-muted-foreground list-disc pl-4">
                <li>Upload or enter results from psychological, diagnostic, or personality tests.</li>
                <li>Doc Dolphin analyzes the data and provides clear, AI-generated insights.</li>
                <li>Save your test history for future reference or comparisons.</li>
              </ul>
              <img
                src={getImgUrl('/analyzer')}
                alt="Analysis Interface"
                className="rounded-lg  shadow-sm"
              />
              <h2 className="text-xl font-semibold">Results Dashboard</h2>
              <ul className="text-muted-foreground list-disc pl-4">
                <li>View saved test results in a centralized location.</li>
                <li>Compare past analyses and track changes over time.</li>
              </ul>
              <img
                src={getImgUrl('/results')}
                alt="Results Dashboard"
                className="rounded-lg  shadow-sm"
              />
              <Button className="py-2 px-4" onClick={() => handleClick('/analyze')}>
                Try Now
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Mood Tracker Tab */}
        <TabsContent value="mood">
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Mood Journal</h2>
              <ul className="text-muted-foreground list-disc pl-4">
                <li>Log your mood daily through a simple, expressive interface.</li>
                <li>Add notes or reflections to better understand how you’re feeling.</li>
              </ul>
              <img
                src={getImgUrl('/log-mood')}
                alt="Mood Journal"
                className="rounded-lg  shadow-sm"
              />
              <h2 className="text-xl font-semibold">Mood History</h2>
              <ul className="text-muted-foreground list-disc pl-4">
                <li>See trends in your emotional state over days, weeks, or months.</li>
                <li>Modify existing entries.</li>
                <li>Remove unwanted records.</li>
              </ul>
              <img
                src={getImgUrl('/mood-history')}
                alt="Mood History"
                className="rounded-lg  shadow-sm"
              />
              <h2 className="text-xl font-semibold">Mood Insights</h2>
              <ul className="text-muted-foreground list-disc pl-4">
                <li>AI-generated summaries help you understand emotional patterns.</li>
                <li>Get tips or reflections based on your recent moods and notes.</li>
              </ul>
              <img
                src={getImgUrl('/mood-insights')}
                alt="Mood Insights"
                className="rounded-lg  shadow-sm"
              />
              <Button className="py-2 px-4" onClick={() => handleClick('/mood')}>
                Try Now
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
