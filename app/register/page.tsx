//app\register\page.tsx
import { Metadata } from 'next'
import Formregister from './Formregister'
 
export const metadata: Metadata = {
    title: 'Register',
}
 
export default async function Register() {
    return <Formregister/>
}