import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    User,
    Bell,
    CreditCard,
    Shield,
    Globe,
    Save,
    Upload
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export default function Settings() {
    const [formData, setFormData] = useState({
        // Profile
        name: 'Admin User',
        email: 'admin@templatehub.com',
        bio: 'Platform administrator managing templates and AI agents.',

        // Notifications
        emailNotifications: true,
        orderNotifications: true,
        marketingEmails: false,

        // Security
        twoFactorEnabled: true,
        loginAlerts: true,

        // System
        darkMode: false,
        autoBackup: true,
        maintenanceMode: false
    });

    const handleSave = () => {
        toast.success('Settings saved successfully!');
    };

    return (
        <div className="space-y-6 md:p-0 p-2">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account and system preferences</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="profile" className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center space-x-2">
                        <Bell className="w-4 h-4" />
                        <span>Notifications</span>
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4" />
                        <span>Billing</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Security</span>
                    </TabsTrigger>
                    <TabsTrigger value="system" className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>System</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal information and profile details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center space-x-6">
                                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                                    <User className="w-12 h-12 text-muted-foreground" />
                                </div>
                                <div>
                                    <Button variant="outline">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Change Avatar
                                    </Button>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Upload a new profile picture. Max file size: 2MB
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    value={formData.bio}
                                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                    placeholder="Tell us about yourself..."
                                    rows={3}
                                    className="mt-1"
                                />
                            </div>

                            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Choose how you want to be notified about activity</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Email Notifications</p>
                                    <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                                </div>
                                <Switch
                                    checked={formData.emailNotifications}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, emailNotifications: checked }))}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Order Notifications</p>
                                    <p className="text-sm text-muted-foreground">Get notified when new orders are placed</p>
                                </div>
                                <Switch
                                    checked={formData.orderNotifications}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, orderNotifications: checked }))}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Marketing Emails</p>
                                    <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                                </div>
                                <Switch
                                    checked={formData.marketingEmails}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, marketingEmails: checked }))}
                                />
                            </div>

                            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="w-4 h-4 mr-2" />
                                Save Preferences
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="billing" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing Information</CardTitle>
                            <CardDescription>Manage your subscription and payment methods</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-6 bg-muted rounded-lg border ">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-900">Pro Plan</h3>
                                        <p className="text-blue-700">$29/month • Next billing: Feb 15, 2024</p>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium mb-4">Payment Methods</h4>
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">VISA</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">•••• •••• •••• 4242</p>
                                                <p className="text-sm text-muted-foreground">Expires 12/26</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <Button variant="outline">Add Payment Method</Button>
                                <Button variant="outline">Download Invoices</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your account security and privacy</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Two-Factor Authentication</p>
                                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                                </div>
                                <Switch
                                    checked={formData.twoFactorEnabled}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, twoFactorEnabled: checked }))}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Login Alerts</p>
                                    <p className="text-sm text-muted-foreground">Get notified of new sign-ins to your account</p>
                                </div>
                                <Switch
                                    checked={formData.loginAlerts}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, loginAlerts: checked }))}
                                />
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h4 className="font-medium">Change Password</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" type="password" className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" className="mt-1" />
                                    </div>
                                </div>
                                <Button variant="outline">Update Password</Button>
                            </div>

                            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="w-4 h-4 mr-2" />
                                Save Security Settings
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="system" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Settings</CardTitle>
                            <CardDescription>Configure system-wide preferences and maintenance</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Dark Mode</p>
                                    <p className="text-sm text-muted-foreground">Enable dark theme for the admin interface</p>
                                </div>
                                <Switch
                                    checked={formData.darkMode}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, darkMode: checked }))}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Automatic Backups</p>
                                    <p className="text-sm text-muted-foreground">Enable daily automatic backups of your data</p>
                                </div>
                                <Switch
                                    checked={formData.autoBackup}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, autoBackup: checked }))}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Maintenance Mode</p>
                                    <p className="text-sm text-muted-foreground">Put the platform in maintenance mode</p>
                                </div>
                                <Switch
                                    checked={formData.maintenanceMode}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, maintenanceMode: checked }))}
                                />
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h4 className="font-medium">System Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Platform Version</p>
                                        <p className="font-medium">v2.1.4</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Last Updated</p>
                                        <p className="font-medium">January 15, 2024</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Database Status</p>
                                        <p className="font-medium text-green-600">Online</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Storage Used</p>
                                        <p className="font-medium">2.4 GB / 10 GB</p>
                                    </div>
                                </div>
                            </div>

                            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="w-4 h-4 mr-2" />
                                Save System Settings
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}