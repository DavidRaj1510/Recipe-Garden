
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Settings, Bell, Shield, Moon, Star } from 'lucide-react';

interface Profile {
  username: string;
  full_name: string;
  avatar_url: string | null;
}

const profileFormSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  full_name: z.string().min(2, { message: "Full name must be at least 2 characters" }),
});

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailAlerts: false,
    publicProfile: true,
    mealReminders: false,
    metricUnits: true,
    saveHistory: true,
    dataCollection: true,
  });

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      full_name: '',
    },
  });

  useEffect(() => {
    if (!user) return;
    
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        setProfile(data);
        form.reset({
          username: data.username || '',
          full_name: data.full_name || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchUserRecipes = async () => {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setUserRecipes(data || []);
      } catch (error) {
        console.error('Error fetching user recipes:', error);
      }
    };
    
    const fetchSavedRecipes = async () => {
      try {
        const { data, error } = await supabase
          .from('saved_recipes')
          .select('recipe_id, recipes(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setSavedRecipes(data?.map(item => item.recipes) || []);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };
    
    fetchProfile();
    fetchUserRecipes();
    fetchSavedRecipes();
  }, [user]);

  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: values.username,
          full_name: values.full_name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
      
      setProfile(prev => prev ? { ...prev, ...values } : null);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error updating profile',
        description: error.message || 'An error occurred while updating your profile.',
      });
    }
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: 'Setting updated',
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-recipe-green"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User'} />
                  <AvatarFallback className="text-2xl bg-recipe-green text-white">
                    {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <CardTitle>{profile?.full_name || 'User'}</CardTitle>
                  <CardDescription>@{profile?.username || user?.email?.split('@')[0]}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-recipe-green hover:bg-recipe-darkGreen">
                    Update Profile
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="my-recipes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-recipes">My Recipes</TabsTrigger>
              <TabsTrigger value="saved-recipes">Saved Recipes</TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-1 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-recipes" className="mt-6">
              {userRecipes.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">You haven't created any recipes yet.</p>
                  <Button className="mt-4 bg-recipe-green hover:bg-recipe-darkGreen">
                    Create Your First Recipe
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Recipe cards will be rendered here */}
                  <p>Your recipes will appear here</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved-recipes" className="mt-6">
              {savedRecipes.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">You haven't saved any recipes yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Saved recipe cards will be rendered here */}
                  <p>Your saved recipes will appear here</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2" />
                    User Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account preferences and settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center text-gray-700">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </h3>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications about new recipes and features</p>
                        </div>
                        <Switch 
                          checked={settings.notifications}
                          onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Alerts</p>
                          <p className="text-sm text-gray-500">Get weekly digests and important updates</p>
                        </div>
                        <Switch 
                          checked={settings.emailAlerts} 
                          onCheckedChange={(checked) => handleSettingChange('emailAlerts', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Meal Reminders</p>
                          <p className="text-sm text-gray-500">Daily reminders for meal planning</p>
                        </div>
                        <Switch 
                          checked={settings.mealReminders} 
                          onCheckedChange={(checked) => handleSettingChange('mealReminders', checked)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center text-gray-700">
                      <Star className="h-4 w-4 mr-2" />
                      Preferences
                    </h3>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                        </div>
                        <Switch 
                          checked={settings.darkMode} 
                          onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Metric Units</p>
                          <p className="text-sm text-gray-500">Use metric instead of imperial measurements</p>
                        </div>
                        <Switch 
                          checked={settings.metricUnits} 
                          onCheckedChange={(checked) => handleSettingChange('metricUnits', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Public Profile</p>
                          <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                        </div>
                        <Switch 
                          checked={settings.publicProfile} 
                          onCheckedChange={(checked) => handleSettingChange('publicProfile', checked)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center text-gray-700">
                      <Shield className="h-4 w-4 mr-2" />
                      Privacy
                    </h3>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Save Search History</p>
                          <p className="text-sm text-gray-500">Store your recipe search history</p>
                        </div>
                        <Switch 
                          checked={settings.saveHistory} 
                          onCheckedChange={(checked) => handleSettingChange('saveHistory', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Data Collection</p>
                          <p className="text-sm text-gray-500">Allow anonymous usage data collection</p>
                        </div>
                        <Switch 
                          checked={settings.dataCollection} 
                          onCheckedChange={(checked) => handleSettingChange('dataCollection', checked)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-recipe-green hover:bg-recipe-darkGreen">
                    Save All Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
