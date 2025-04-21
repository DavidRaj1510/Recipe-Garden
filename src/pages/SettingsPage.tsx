
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Star, 
  Globe,
  Coffee,
  Clock,
  Scale,
  BellRing
} from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    publicProfile: true,
    mealReminders: false,
    metricUnits: true,
    saveHistory: true,
    dataCollection: true,
    autoTranslate: false,
    coffeeMode: false,
    timeManagement: true,
  });

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "Setting updated",
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="space-y-10">
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Sun className="h-6 w-6" /> Appearance
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">
                Choose your preferred theme
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('light')}
              >
                <Sun className="h-4 w-4 mr-1" /> Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('dark')}
              >
                <Moon className="h-4 w-4 mr-1" /> Dark
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Bell className="h-6 w-6" /> Notifications
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified about new recipes and features
                </p>
              </div>
              <Switch 
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Receive weekly digests and updates
                </p>
              </div>
              <Switch 
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => handleSettingChange('emailAlerts', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Meal Reminders</p>
                <p className="text-sm text-muted-foreground">
                  Get daily reminders for meal planning
                </p>
              </div>
              <Switch 
                checked={settings.mealReminders}
                onCheckedChange={(checked) => handleSettingChange('mealReminders', checked)}
              />
            </div>
          </div>
        </div>

        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Globe className="h-6 w-6" /> Preferences
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Metric Units</p>
                <p className="text-sm text-muted-foreground">
                  Use metric instead of imperial measurements
                </p>
              </div>
              <Switch 
                checked={settings.metricUnits}
                onCheckedChange={(checked) => handleSettingChange('metricUnits', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-Translate</p>
                <p className="text-sm text-muted-foreground">
                  Automatically translate recipes to your language
                </p>
              </div>
              <Switch 
                checked={settings.autoTranslate}
                onCheckedChange={(checked) => handleSettingChange('autoTranslate', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Coffee Mode</p>
                <p className="text-sm text-muted-foreground">
                  Highlight caffeinated recipes
                </p>
              </div>
              <Switch 
                checked={settings.coffeeMode}
                onCheckedChange={(checked) => handleSettingChange('coffeeMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Time Management</p>
                <p className="text-sm text-muted-foreground">
                  Show cooking time estimates
                </p>
              </div>
              <Switch 
                checked={settings.timeManagement}
                onCheckedChange={(checked) => handleSettingChange('timeManagement', checked)}
              />
            </div>
          </div>
        </div>

        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6" /> Privacy
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Public Profile</p>
                <p className="text-sm text-muted-foreground">
                  Make your profile visible to other users
                </p>
              </div>
              <Switch 
                checked={settings.publicProfile}
                onCheckedChange={(checked) => handleSettingChange('publicProfile', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Save Search History</p>
                <p className="text-sm text-muted-foreground">
                  Store your recipe search history
                </p>
              </div>
              <Switch 
                checked={settings.saveHistory}
                onCheckedChange={(checked) => handleSettingChange('saveHistory', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Collection</p>
                <p className="text-sm text-muted-foreground">
                  Allow anonymous usage data collection
                </p>
              </div>
              <Switch 
                checked={settings.dataCollection}
                onCheckedChange={(checked) => handleSettingChange('dataCollection', checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
