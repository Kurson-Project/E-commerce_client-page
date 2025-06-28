import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Settings() {
    const { user, logout } = useAuth();
    return (
        <div className="space-y-4">
            <h1 className='text-3xl font-bold'>Settings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className='gap-2'>
                    <CardHeader className='gap-0'>
                        <CardTitle className='py-0 text-xl'>Profile</CardTitle>
                        <CardDescription>Your profile information.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-white">
                                {user?.name?.[0].toUpperCase()}
                            </div>
                            <div>
                                <p className="text-xl font-semibold leading-none">{user?.name}</p>
                                <p className="text-lg text-muted-foreground">{user?.email}</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex justify-end gap-4 w-full">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button size={"sm"}>Edit Profile</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Edit Profile</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            You are about to edit your profile.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <div className="space-y-2">
                                        <div className="grid gap-1">
                                            <Label>Name</Label>
                                            <Input type="text" defaultValue={user?.name} />
                                        </div>
                                        <div className="grid gap-1">
                                            <Label>Email</Label>
                                            <Input type="email" defaultValue={user?.email} />
                                        </div>
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction>Save</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <Button size={"sm"} variant="destructive" onClick={logout}>Logout</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}