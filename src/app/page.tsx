"use client";

import { Search, Settings, Github, Star, GitFork, AlertCircle, Bell, ChevronRight } from "lucide-react";
import { mockProjects, userStats } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VoiceInteraction } from "@/components/VoiceInteraction";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary/20 relative overflow-hidden pb-20">
      {/* Background Decorative Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] size-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -90, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-20%] size-[800px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none"
      />
      <div className="absolute top-[40%] left-[20%] size-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none animate-pulse-soft" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20">
        <div className="max-w-screen-xl mx-auto px-6 flex h-20 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4 font-black text-2xl tracking-tighter"
          >
            <div className="size-11 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-xl shadow-primary/20 rotate-6 group hover:rotate-0 transition-all duration-500 cursor-pointer overflow-hidden animate-glow">
              <Github className="size-6 text-primary-foreground group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-gradient">GitVoice</span>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="hidden md:flex items-center gap-1 mr-4">
              <Button variant="ghost" size="sm" className="rounded-xl font-black text-[11px] uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors">Dashboard</Button>
              <Button variant="ghost" size="sm" className="rounded-xl font-black text-[11px] uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors">Analytics</Button>
              <Button variant="ghost" size="sm" className="rounded-xl font-black text-[11px] uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors">Settings</Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-primary/10 transition-colors hidden sm:flex"><Search className="size-5" /></Button>
              <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-primary/10 transition-colors"><Bell className="size-5" /></Button>
              <div className="h-8 w-[1px] bg-white/10 mx-2" />
              <Avatar className="size-10 border-2 border-primary/20 hover:border-primary transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 animate-glow">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="text-xs font-black">US</AvatarFallback>
              </Avatar>
            </div>
          </motion.nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-6 flex-1 py-16 flex flex-col gap-16 relative z-10">

        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-4 text-center md:text-left relative"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 animate-pulse-soft shadow-lg shadow-primary/5">
            <span className="size-2 rounded-full bg-primary shadow-glow shadow-primary" />
            Systems Operational
          </div>
          <h1 className="text-6xl font-[1000] tracking-[-0.05em] lg:text-8xl max-w-5xl leading-[0.85] text-white">
            Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent italic pr-2">Developer</span>
          </h1>
          <p className="text-white/80 text-2xl max-w-3xl font-medium mx-auto md:mx-0 leading-relaxed tracking-tight">
            Your AI-powered voice interface for GitHub is ready. <br className="hidden lg:block" />
            What would you like to build today?
          </p>
        </motion.section>

        {/* Voice Interaction Area (Hero) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-4xl mx-auto"
        >
          <VoiceInteraction />
        </motion.div>

        {/* Statistics Row */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={item} whileHover={{ y: -5 }}>
            <Card className="glass overflow-hidden border-white/10 group hover:border-yellow-500/50 transition-all duration-500 animate-glow">
              <CardContent className="p-7 flex flex-col gap-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all duration-500 group-hover:rotate-12 group-hover:scale-125">
                  <Star className="size-14 text-yellow-500" />
                </div>
                <span className="text-muted-foreground/60 text-xs font-black uppercase tracking-[0.2em]">Total Stars</span>
                <span className="text-5xl font-black flex items-center gap-3 text-yellow-500 drop-shadow-[0_4px_16px_rgba(234,179,8,0.2)]">
                  {userStats.totalStars}
                </span>
                <div className="mt-3 text-[11px] font-black text-yellow-600/80 uppercase tracking-tighter flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-yellow-500/5 border border-yellow-500/10 w-fit">
                  <ChevronRight className="size-3" /> Top 5% Contributor
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -5 }}>
            <Card className="glass border-white/10 group hover:border-secondary/50 transition-all duration-500 animate-glow">
              <CardContent className="p-7 flex flex-col gap-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-125">
                  <GitFork className="size-14 text-secondary" />
                </div>
                <span className="text-muted-foreground/60 text-xs font-black uppercase tracking-[0.2em]">Forks</span>
                <span className="text-5xl font-black text-secondary drop-shadow-[0_4px_16px_rgba(6,182,212,0.2)]">{userStats.totalForks}</span>
                <div className="mt-3 text-[11px] font-black text-secondary/80 uppercase tracking-tighter flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-secondary/5 border border-secondary/10 w-fit">
                  <ChevronRight className="size-3" /> Trending Projects
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -5 }}>
            <Card className="glass border-white/10 group hover:border-destructive/50 transition-all duration-500 animate-glow">
              <CardContent className="p-7 flex flex-col gap-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all duration-500 group-hover:scale-125">
                  <AlertCircle className="size-14 text-destructive" />
                </div>
                <span className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">Open Issues</span>
                <span className="text-5xl font-black text-destructive drop-shadow-[0_4px_16px_rgba(239,68,68,0.2)]">{userStats.openIssues}</span>
                <div className="mt-3 text-[11px] font-black text-destructive/80 uppercase tracking-tighter flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-destructive/5 border border-destructive/10 w-fit">
                  <ChevronRight className="size-3" /> Priority Tasks
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -5 }}>
            <Card className="glass border-white/10 group hover:border-green-500/50 transition-all duration-500 animate-glow">
              <CardContent className="p-7 flex flex-col gap-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-125">
                  <Github className="size-14 text-green-500" />
                </div>
                <span className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">Contributions</span>
                <span className="text-5xl font-black text-green-500 drop-shadow-[0_4px_16px_rgba(34,197,94,0.2)]">+{userStats.contributionsMonth}</span>
                <div className="mt-3 text-[11px] font-black text-green-600/80 uppercase tracking-tighter flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-green-500/5 border border-green-500/10 w-fit">
                  <ChevronRight className="size-3" /> Consistency 12/12
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Recent Projects */}
        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center justify-between border-l-4 border-primary pl-6"
          >
            <div>
              <h2 className="text-3xl font-black tracking-tight">Active Repositories</h2>
              <p className="text-white/60 font-medium">Synced with your latest changes</p>
            </div>
            <Button variant="outline" className="rounded-xl font-bold bg-background/50 glass hover:bg-primary hover:text-primary-foreground transition-all">
              View all
            </Button>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {mockProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </section>

      </div>
    </main>
  );
}
