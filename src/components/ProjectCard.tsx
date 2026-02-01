import { Star, GitFork, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Project } from "@/lib/data";
import { motion } from "framer-motion";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full"
        >
            <Card className="h-full glass hover:bg-white/10 transition-all cursor-pointer group border-white/5 relative overflow-hidden hover:border-primary/50 animate-glow">
                {/* Hover Shimmer Effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg]" />

                <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight className="size-6 text-primary shadow-primary/50 drop-shadow-lg" />
                </div>

                <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors tracking-tight leading-tight pr-6">
                            {project.name}
                        </CardTitle>
                        <div className="text-[11px] uppercase tracking-tighter font-black bg-primary/20 text-primary px-2.5 py-1 rounded-full border border-primary/30 backdrop-blur-md shrink-0">
                            {project.language}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <p className="text-white/80 text-base line-clamp-2 mb-8 leading-relaxed font-medium">
                        {project.description}
                    </p>
                    <div className="flex items-center gap-8 text-sm font-bold">
                        <div className="flex items-center gap-2 group/stat">
                            <Star className="size-5 text-yellow-500 fill-yellow-500/20 group-hover/stat:fill-yellow-500 transition-colors" />
                            <span className="tabular-nums">{project.stars}</span>
                        </div>
                        <div className="flex items-center gap-2 group/stat">
                            <GitFork className="size-5 text-secondary group-hover/stat:text-primary transition-colors" />
                            <span className="tabular-nums">{project.forks}</span>
                        </div>
                        <div className="ml-auto text-xs text-muted-foreground/40 italic font-normal">
                            {project.lastUpdated}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
