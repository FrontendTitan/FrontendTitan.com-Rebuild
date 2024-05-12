import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Nav(props: { pathname: string, router: AppRouterInstance }) {
    const home = () => props.router.push('/')
    const contact = () => props.router.push('/contact')
    const projects = () => props.router.push('/projects')
    const ps5 = () => props.router.push('/ps5')

    const github = () => window.open('https://github.com/FrontendTitan', '_blank')
    const youtube = () => window.open('https://youtube.com/@FrontendTitan?si=DQL8OJp7Jvm9GK2s', '_blank')

    return (
        <nav className='p-5 w-full flex justify-between'>
            <h1 className='text-3xl font-bold'>FrontendTitan</h1>
            <DropdownMenu>
                <DropdownMenuTrigger>☰</DropdownMenuTrigger>
                <DropdownMenuContent className='mr-3'>
                    <DropdownMenuLabel>Pages</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={home}>Home</DropdownMenuItem>
                    <DropdownMenuItem onClick={contact}>Contact</DropdownMenuItem>
                    <DropdownMenuItem onClick={projects}>Projects</DropdownMenuItem>
                    <DropdownMenuItem onClick={ps5}>PS5</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>External Links</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={github}>GitHub</DropdownMenuItem>
                    <DropdownMenuItem onClick={youtube}>YouTube</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}