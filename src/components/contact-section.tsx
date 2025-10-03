import Link from 'next/link'
import { Mail, Phone, Globe, Github, Linkedin, Code } from "lucide-react";
import { contactInfo } from "@/lib/contact";

const links = [
    {
        title: 'Home',
        href: '#hero',
    },
    {
        title: 'Skills',
        href: '#skills',
    },
    {
        title: 'Experience',
        href: '#experience',
    },
    {
        title: 'Projects',
        href: '#projects',
    },
    {
        title: 'Education',
        href: '#education',
    },
    {
        title: 'Contact',
        href: '#contact',
    },
]

const contactLinks = [
    {
        title: 'Email',
        href: `mailto:${contactInfo.email}`,
        icon: Mail,
    },
    {
        title: 'Phone',
        href: `tel:${contactInfo.phone.replace(/\s+/g, "")}`,
        icon: Phone,
    },
    {
        title: 'GitHub',
        href: contactInfo.github,
        icon: Github,
    },
    {
        title: 'LinkedIn',
        href: contactInfo.linkedin,
        icon: Linkedin,
    },
]

export default function ContactSection() {
    return (
        <section id="contact" className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto block size-fit text-base">
                    <Code className="size-8" />
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {contactLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.title}
                            className="text-muted-foreground hover:text-primary block">
                            <link.icon className="size-6" />
                        </Link>
                    ))}
                </div>
                <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} {contactInfo.name}, All rights reserved</span>
            </div>
        </section>
    )
}
