"use client"

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

import ThreeScene from '@/components/custom/background'
import Nav from '@/components/custom/nav'

const DynamicProjects = dynamic(() => import('./routes/projects'), { ssr: false })
const DynamicContact = dynamic(() => import('./routes/contact'), { ssr: false })
const DynamicHome = dynamic(() => import('./routes/home'), { ssr: false })

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Page() {
    const router = useRouter()
    const pathname = usePathname()

    const back = () => router.back()
    const forward = () => window.history.forward()
    const refresh = () => router.refresh()

    const openDevTools = () => document.getElementById('alert')!.click()

    const home = () => router.push('/')
    const contact = () => router.push('/contact')
    const projects = () => router.push('/projects')
    const ps5 = () => router.push('/ps5')

    const github = () => window.open('https://github.com/FrontendTitan', '_blank')
    const youtube = () => window.open('https://youtube.com/@FrontendTitan?si=DQL8OJp7Jvm9GK2s', '_blank')

    return (
        <>
            {/* Right-Click Menu */}
            <ContextMenu>
                <ContextMenuTrigger>
                    <UserInterface pathname={pathname} router={router} />
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                    <ContextMenuItem inset onClick={back}>
                        Back
                        <ContextMenuShortcut>{'<'}</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset onClick={forward}>
                        Forward
                        <ContextMenuShortcut>{'>'}</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset onClick={refresh}>
                        Reload
                        <ContextMenuShortcut >CTRL/⌘ + R</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger inset>Pages</ContextMenuSubTrigger>
                        <ContextMenuSubContent className="w-48">
                            <ContextMenuItem onClick={home}>Home</ContextMenuItem>
                            <ContextMenuItem onClick={contact}>Contact</ContextMenuItem>
                            <ContextMenuItem onClick={projects}>Projects</ContextMenuItem>
                            <ContextMenuItem onClick={ps5}>PS5</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem onClick={github}>GitHub</ContextMenuItem>
                            <ContextMenuItem onClick={youtube}>YouTube</ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={openDevTools}>Developer Tools</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            {/* Alert Dialog For DevTools */}
            <AlertDialog>
                <AlertDialogTrigger id='alert'></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Developer Tools</AlertDialogTitle>
                        <AlertDialogDescription>
                            Browsers do not allow websites to open the developer tools. Press
                            F12 on your keyboard to do so.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

function UserInterface(props: { pathname: string, router: AppRouterInstance }) {
    let PageComponent

    // Determine which component to render based on the current pathname
    switch (props.pathname) {
        case '/projects':
            PageComponent = DynamicProjects
            break
        case '/contact':
            PageComponent = DynamicContact
            break
        case '/': // Assuming '/' is the route for the Home component
            PageComponent = DynamicHome
            break
        default:
            PageComponent = DynamicHome // Default to Home if no matching route is found
    }

    return (
        <ThreeScene>
            <div className='container mx-auto px-4'>
                <Nav pathname={props.pathname} router={props.router} />
                <div>
                    <PageComponent />
                </div>
            </div>
        </ThreeScene>
    )
}