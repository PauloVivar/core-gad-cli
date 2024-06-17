import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

function LoginPage() {
  return (
    <>
      <Tabs defaultValue='account' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='register'>Register</TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          <Card>
            <CardHeader>
              <CardTitle>Login Cuenta</CardTitle>
              <CardDescription>
                Inicio de sesión.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='name'>Email</Label>
                <Input id='name' defaultValue='roman.redrovan@mail.com' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' type='password' />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value='register'>
          <Card>
            <CardHeader>
              <CardTitle>Registrar cuenta</CardTitle>
              <CardDescription>
                Registro de una nueva cuenta.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='current'>Current password</Label>
                <Input id='current' type='password' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='new'>New password</Label>
                <Input id='new' type='password' />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

      </Tabs>
    </>
  )
}

export {LoginPage}