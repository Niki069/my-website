/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import avatarImg from './avatar.png';
import { 
  Github, 
  Mail, 
  Phone, 
  ExternalLink, 
  Cpu, 
  Code, 
  Database, 
  Zap, 
  Youtube, 
  User, 
  ChevronRight,
  Globe,
  Menu,
  X,
  Layers,
  Search,
  MessageCircle,
  AtSign,
  Palette,
  Briefcase,
  BookOpen,
  MessageSquare,
  Info,
  Bot,
  Brain,
  Terminal,
  Sparkles,
  GraduationCap,
  Users
} from 'lucide-react';

// --- Types ---
interface Project {
  id: string;
  title: { EN: string; CN: string };
  description: { EN: string; CN: string };
  tags: string[];
  github?: string;
  link?: string;
  icon: ReactNode;
}

interface LibraryItem {
  id: string;
  title: { EN: string; CN: string };
  subtitle: { EN: string; CN: string };
  icon: ReactNode;
  link?: string;
}

// --- Initial Data ---
const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: { EN: "AI Multi-channel Content Automation System", CN: "AI 多渠道内容自动化系统" },
    description: { EN: "Built on Coze, transforming video to cross-platform posts within 15 minutes, boosting productivity by 300%.", CN: "基于 Coze 搭建，实现 15 分钟内从视频到全平台推文的转化，提升 300% 创作效率。" },
    tags: ["Coze", "Workflow", "Automation"],
    icon: <Zap className="w-6 h-6 text-neon-cyan" />,
    link: "#"
  },
  {
    id: '2',
    title: { EN: "Intelligent User Sentiment Monitoring Matrix", CN: "智能用户舆情监测矩阵" },
    description: { EN: "Utilizing LLM for automated semantic analysis of massive comments, outputting structured operational decision suggestions.", CN: "利用 LLM 对海量评论进行自动化语义分析，输出结构化运营决策建议。" },
    tags: ["LLM", "NLP", "Analytics"],
    icon: <Search className="w-6 h-6 text-neon-purple" />,
    link: "#"
  },
  {
    id: '3',
    title: { EN: "Vertical Domain RAG Knowledge Assistant", CN: "垂直领域 RAG 知识助手" },
    description: { EN: "Precise Q&A bot built for internal corporate documents, solving the problem of fragmented operational information retrieval.", CN: "针对企业内部文档构建的精准问答机器人，解决运营信息检索碎片化问题。" },
    tags: ["RAG", "Knowledge Base", "Vector DB"],
    icon: <Database className="w-6 h-6 text-neon-cyan" />,
    link: "#"
  },
  {
    id: '4',
    title: { EN: "AI-powered Resume Deep Optimization Engine", CN: "AI 驱动的简历深度优化引擎" },
    description: { EN: "Built with LLM, it automates the reconstruction of raw experience into a highly matched resume within 3 minutes, increasing interview invitation conversion rates by 200%.", CN: "基于大模型（LLM）构建，实现 3 分钟内从原始经历到高匹配度简历的自动重构，提升 200% 的面试邀请转化率" },
    tags: ["LLM", "Resume", "Optimization"],
    icon: <Code className="w-6 h-6 text-neon-purple" />,
    link: "#"
  }
];

const AI_MODELS: LibraryItem[] = [
  { id: 'm1', title: { EN: "Claude", CN: "Claude" }, subtitle: { EN: "Anthropic's flagship model", CN: "Anthropic 旗舰模型" }, icon: <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=128" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" alt="Claude" />, link: "https://claude.ai" },
  { id: 'm2', title: { EN: "GPT-4o", CN: "GPT-4o" }, subtitle: { EN: "OpenAI's versatile model", CN: "OpenAI 全能模型" }, icon: <img src="https://www.google.com/s2/favicons?domain=openai.com&sz=128" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" alt="GPT" />, link: "https://chatgpt.com" },
  { id: 'm3', title: { EN: "Gemini", CN: "Gemini" }, subtitle: { EN: "Google's multimodal AI", CN: "Google 多模态 AI" }, icon: <img src="https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" alt="Gemini" />, link: "https://gemini.google.com" },
  { id: 'm4', title: { EN: "DeepSeek", CN: "DeepSeek" }, subtitle: { EN: "Powerful open-source model", CN: "强大的国产开源模型" }, icon: <img src="https://www.google.com/s2/favicons?domain=deepseek.com&sz=128" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" alt="DeepSeek" />, link: "https://deepseek.com" },
  { id: 'm5', title: { EN: "Kimi", CN: "Kimi" }, subtitle: { EN: "Moonshot AI's long-context model", CN: "月之暗面长文本模型" }, icon: <img src="https://www.google.com/s2/favicons?domain=kimi.ai&sz=128" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" alt="Kimi" />, link: "https://kimi.ai" },
  { id: 'm6', title: { EN: "Qwen", CN: "通义千问" }, subtitle: { EN: "Alibaba's large language model", CN: "阿里巴巴大语言模型" }, icon: <img src="https://www.google.com/s2/favicons?domain=tongyi.aliyun.com&sz=128" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" alt="Qwen" />, link: "https://tongyi.aliyun.com" },
];

const LEARNING_SOFTWARE: LibraryItem[] = [
  { id: 'l1', title: { EN: "Obsidian", CN: "Obsidian" }, subtitle: { EN: "Second brain for knowledge", CN: "打造个人知识库的第二大脑" }, icon: <img src="https://www.google.com/s2/favicons?domain=obsidian.md&sz=128" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" alt="Obsidian" />, link: "https://obsidian.md" },
  { id: 'l2', title: { EN: "NotebookLM", CN: "NotebookLM" }, subtitle: { EN: "AI-powered research assistant", CN: "AI 驱动的研究辅助工具" }, icon: <img src="https://www.google.com/s2/favicons?domain=notebooklm.google&sz=128" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" alt="NotebookLM" />, link: "https://notebooklm.google.com" },
];

const FOLLOW_PEOPLE: LibraryItem[] = [
  { id: 'fp1', title: { EN: "Andrew Ng", CN: "吴恩达" }, subtitle: { EN: "Founder of DeepLearning.AI", CN: "DeepLearning.AI 创始人" }, icon: <User className="w-5 h-5" />, link: "https://twitter.com/AndrewYNg" },
  { id: 'fp2', title: { EN: "Andrej Karpathy", CN: "Andrej Karpathy" }, subtitle: { EN: "AI Educator & Researcher", CN: "AI 教育家与研究员" }, icon: <User className="w-5 h-5" />, link: "https://twitter.com/karpathy" },
  { id: 'fp3', title: { EN: "Fei-Fei Li", CN: "李飞飞" }, subtitle: { EN: "Stanford Professor, AI Visionary", CN: "斯坦福教授，AI 视觉先驱" }, icon: <User className="w-5 h-5" />, link: "https://twitter.com/drfeifei" },
  { id: 'fp4', title: { EN: "Sam Altman", CN: "Sam Altman" }, subtitle: { EN: "CEO of OpenAI", CN: "OpenAI 首席执行官" }, icon: <User className="w-5 h-5" />, link: "https://twitter.com/sama" },
  { id: 'fp5', title: { EN: "Li Jigang", CN: "李继刚" }, subtitle: { EN: "Prompt Engineering Expert", CN: "提示词工程专家" }, icon: <User className="w-5 h-5" />, link: "https://twitter.com/lijigang" },
];

const AI_COURSES: LibraryItem[] = [
  { id: 'c1', title: { EN: "Machine Learning Specialization", CN: "机器学习专项课程" }, subtitle: { EN: "By Andrew Ng (Coursera)", CN: "吴恩达主讲 (Coursera)" }, icon: <GraduationCap className="w-5 h-5" />, link: "https://www.coursera.org/specializations/machine-learning-introduction" },
  { id: 'c2', title: { EN: "CS224N: NLP with Deep Learning", CN: "CS224N: 深度学习自然语言处理" }, subtitle: { EN: "Stanford University", CN: "斯坦福大学公开课" }, icon: <GraduationCap className="w-5 h-5" />, link: "http://web.stanford.edu/class/cs224n/" },
  { id: 'c3', title: { EN: "Generative AI for Everyone", CN: "面向全人类的生成式 AI" }, subtitle: { EN: "DeepLearning.AI", CN: "入门级生成式 AI 课程" }, icon: <GraduationCap className="w-5 h-5" />, link: "https://www.coursera.org/learn/generative-ai-for-everyone" },
  { id: 'c4', title: { EN: "Neural Networks: Zero to Hero", CN: "神经网络：从零到英雄" }, subtitle: { EN: "By Andrej Karpathy", CN: "Andrej Karpathy 经典教程" }, icon: <GraduationCap className="w-5 h-5" />, link: "https://karpathy.ai/zero-to-hero.html" },
  { id: 'c5', title: { EN: "Full Stack LLM App Development", CN: "全栈 LLM 应用开发" }, subtitle: { EN: "DeepLearning.AI", CN: "实战型 LLM 应用构建" }, icon: <GraduationCap className="w-5 h-5" />, link: "https://www.deeplearning.ai/short-courses/" },
];

const PROGRAMMING_SOFTWARE: LibraryItem[] = [
  { id: 'p1', title: { EN: "Trae", CN: "Trae" }, subtitle: { EN: "Adaptive AI IDE by ByteDance", CN: "字节跳动自研 AI IDE" }, icon: <img src="https://www.google.com/s2/favicons?domain=trae.ai&sz=128" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" alt="Trae" />, link: "https://trae.ai" },
  { id: 'p2', title: { EN: "Cursor", CN: "Cursor" }, subtitle: { EN: "The AI Code Editor", CN: "为 AI 编程而生的编辑器" }, icon: <img src="https://www.google.com/s2/favicons?domain=cursor.sh&sz=128" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" alt="Cursor" />, link: "https://cursor.sh" },
  { id: 'p3', title: { EN: "Codex", CN: "Codex" }, subtitle: { EN: "AI programming model", CN: "AI 编程模型" }, icon: <img src="https://www.google.com/s2/favicons?domain=openai.com&sz=128" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" alt="Codex" />, link: "https://openai.com/blog/openai-codex" },
];

// --- Components ---

const SectionTitle = ({ children, highlight }: { children: string, highlight?: string }) => {
  if (!highlight) return <h2 className="text-3xl md:text-4xl font-bold mb-4">{children}</h2>;
  const parts = children.split(highlight);
  return (
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      {parts[0]}<span className="text-neon-purple">{highlight}</span>{parts[1]}
    </h2>
  );
};

const GlassCard = ({ children, className = "" }: { children: ReactNode, className?: string, key?: string }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`glass glass-hover p-6 rounded-2xl relative group/card ${className}`}
  >
    {children}
  </motion.div>
);

// --- Pages ---

const AboutPage = ({ lang }: { lang: 'EN' | 'CN' }) => (
  <div className="space-y-16">
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-neon-cyan mb-6 border-neon-cyan/30">
          <span>✨</span>{lang === 'EN' ? 'AI Developer & Knowledge Engineer' : 'AI 开发者 & 知识工程师'}
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight cursor-default">
          <motion.span className="inline-block" whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
            {lang === 'EN' ? 'Hi, I am' : '你好，我是'}
          </motion.span>
          <br />
          <motion.span className="text-gradient-cyan-purple inline-block" whileHover={{ x: 25 }} transition={{ type: "spring", stiffness: 200 }}>
            Niki Yang
          </motion.span>
        </h1>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-[1px] w-8 bg-neon-cyan/50"></div>
          <p className="text-sm md:text-base font-mono tracking-widest text-neon-cyan/80 uppercase">
            {lang === 'EN' ? 'Open Minds, Open Builds.' : '开放思维，开放构建'}
          </p>
        </div>
        <p className="text-xl text-text-muted mb-8 max-w-xl leading-relaxed">
          {lang === 'EN' ? (
            <>I build <span className="text-text-main font-bold italic">AI-driven products</span> and structured knowledge systems.</>
          ) : (
            <>我致力于构建 <span className="text-text-main font-bold italic">AI 驱动的产品</span> 和结构化知识体系。</>
          )}
        </p>
        <div className="flex items-center gap-4 text-sm text-text-muted font-mono mb-8">
          <span>[Data Analysis]</span><span className="opacity-30">|</span>
          <span>[LLM Evaluation]</span><span className="opacity-30">|</span>
          <span>[Workflow Automation]</span>
        </div>

        <Link to="/works" className="inline-flex px-8 py-4 bg-gradient-to-r from-neon-purple to-indigo-600 rounded-2xl font-bold text-white glow-purple hover:brightness-110 transition-all items-center gap-2">
          {lang === 'EN' ? 'Explore My Works' : '探索我的作品'}
          <ChevronRight className="w-5 h-5" />
        </Link>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
        <div className="absolute -inset-4 bg-neon-cyan/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
        <div className="relative aspect-[4/5] max-w-md mx-auto rounded-[2rem] overflow-hidden border border-white/10 glow-cyan group">
          <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10 animate-[scan_3s_linear_infinite]"></div>
          <div className="absolute top-4 left-4 z-10 text-[10px] font-mono text-neon-cyan opacity-60">ID: NIKI_YANG_001<br />STATUS: ONLINE</div>
          <div className="absolute bottom-4 right-4 z-10 text-[10px] font-mono text-neon-cyan opacity-60 text-right">LAT: 31.2304° N<br />LON: 121.4737° E</div>
          <img src={avatarImg} alt="Portrait" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-cyan opacity-40"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-cyan opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-cyan opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-cyan opacity-40"></div>
        </div>
      </motion.div>
    </section>

    <div className="flex flex-wrap gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-4 group glass p-6 rounded-3xl max-w-fit"
      >
        <div className="w-12 h-12 rounded-2xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan group-hover:bg-neon-cyan group-hover:text-[var(--bg-from)] transition-all duration-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-neon-cyan opacity-70 font-black mb-1">Contact Me</div>
          <a href="mailto:nikiy9853@gmail.com" className="text-lg md:text-xl text-text-main font-bold hover:text-neon-cyan transition-colors tracking-tight">
            nikiy9853@gmail.com
          </a>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex items-center gap-4 group glass p-6 rounded-3xl max-w-fit"
      >
        <div className="w-12 h-12 rounded-2xl bg-neon-purple/10 flex items-center justify-center text-neon-purple group-hover:bg-neon-purple group-hover:text-[var(--bg-from)] transition-all duration-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <Github className="w-6 h-6" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-neon-purple opacity-70 font-black mb-1">Follow Me</div>
          <a href="https://github.com/Niki069" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl text-text-main font-bold hover:text-neon-purple transition-colors tracking-tight">
            github.com/Niki069
          </a>
        </div>
      </motion.div>
    </div>
  </div>
);

const WorksPage = ({ lang }: { lang: 'EN' | 'CN' }) => {
  const skills = [
    { name: "Prompt Engineering", level: 95, desc: { EN: "Advanced prompt design & optimization", CN: "高级提示词设计与优化" } },
    { name: "RAG", level: 90, desc: { EN: "Retrieval Augmented Generation systems", CN: "检索增强生成系统" } },
    { name: "Workflow Design", level: 92, desc: { EN: "AI automation & multi-agent orchestration", CN: "AI 自动化与多智能体编排" } },
    { name: "Model Tuning", level: 85, desc: { EN: "Fine-tuning & parameter optimization", CN: "模型微调与参数优化" } },
    { name: "Evaluation & QC", level: 88, desc: { EN: "LLM performance & quality control", CN: "LLM 性能评估与质量控制" } },
  ];

  return (
    <div className="space-y-24">
      {/* Skill Matrix */}
      <section>
        <div className="mb-12 text-center">
          <SectionTitle highlight="Skills">{lang === 'EN' ? 'AI Skill Matrix' : 'AI 技能矩阵'}</SectionTitle>
          <p className="text-text-muted max-w-2xl mx-auto">
            {lang === 'EN' ? 'My technical expertise in the field of Artificial Intelligence.' : '我在人工智能领域的技术专长。'}
          </p>
        </div>
        
        <GlassCard className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center text-neon-cyan">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="text-xs font-black uppercase tracking-[0.3em] text-neon-cyan opacity-80">
              AI & Machine Learning
            </div>
          </div>

          <div className="space-y-10">
            {skills.map((skill, idx) => (
              <div key={skill.name} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div className="flex items-baseline gap-3">
                    <span className="text-lg md:text-xl font-bold text-text-main">{skill.name}</span>
                    <span className="text-xs text-text-muted font-medium">{skill.desc[lang]}</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-neon-purple">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* Projects Grid */}
      <section className="mb-20">
        <div className="mb-12 text-center">
          <SectionTitle highlight="Works">{lang === 'EN' ? 'Selected Works' : '精选作品集'}</SectionTitle>
          <p className="text-text-muted max-w-2xl mx-auto">
            {lang === 'EN' ? 'A collection of my work exploring LLM performance, data analysis, and productivity tools.' : '我在大语言模型性能、数据分析和生产力工具方面的探索成果。'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_PROJECTS.map((project) => (
            <GlassCard key={project.id} className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">{project.icon}</div>
                <div className="flex gap-3">
                  {project.github && <a href={project.github} className="p-2 glass rounded-lg text-text-muted hover:text-neon-cyan transition-colors"><Github className="w-5 h-5" /></a>}
                  {project.link && <a href={project.link} className="p-2 glass rounded-lg text-text-muted hover:text-neon-cyan transition-colors"><ExternalLink className="w-5 h-5" /></a>}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-cyan transition-colors">{project.title[lang]}</h3>
              <p className="text-text-muted mb-6 flex-grow leading-relaxed">{project.description[lang]}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-[10px] font-bold uppercase tracking-wider text-text-muted">{tag}</span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};

const LibraryPage = ({ lang }: { lang: 'EN' | 'CN' }) => (
  <section className="mb-20">
    <div className="mb-12 text-center">
      <SectionTitle>{lang === 'EN' ? 'AI Resource Library' : 'AI 资源库'}</SectionTitle>
      <p className="text-text-muted max-w-2xl mx-auto">
        {lang === 'EN' ? 'Curated AI models, tools, and courses to empower your productivity.' : '精选 AI 模型、工具与课程，赋能您的生产力。'}
      </p>
    </div>
    
    <div className="space-y-16">
      {/* Row 1: Models & Software */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* AI Models */}
        <div className="space-y-6">
          <h4 className="flex items-center gap-2 text-lg font-bold text-neon-cyan"><Bot className="w-5 h-5" />{lang === 'EN' ? 'AI Models' : '常用 AI 模型'}</h4>
          <div className="grid grid-cols-1 gap-4">
            {AI_MODELS.map((item) => (
              <a href={item.link} key={item.id} target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-xl flex items-center gap-4 cursor-pointer group relative block">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all overflow-hidden p-2">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-bold text-text-main">{item.title[lang]}</div>
                  <div className="text-xs text-text-muted">{item.subtitle[lang]}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Learning Software */}
        <div className="space-y-6">
          <h4 className="flex items-center gap-2 text-lg font-bold text-neon-purple"><Brain className="w-5 h-5" />{lang === 'EN' ? 'Learning Tools' : 'AI 学习软件'}</h4>
          <div className="grid grid-cols-1 gap-4">
            {LEARNING_SOFTWARE.map((item) => (
              <a href={item.link} key={item.id} target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-xl flex items-center gap-4 cursor-pointer group relative block">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all overflow-hidden p-2">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-bold text-text-main">{item.title[lang]}</div>
                  <div className="text-xs text-text-muted">{item.subtitle[lang]}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Programming Software */}
        <div className="space-y-6">
          <h4 className="flex items-center gap-2 text-lg font-bold text-neon-cyan"><Terminal className="w-5 h-5" />{lang === 'EN' ? 'Programming' : 'AI 编程软件'}</h4>
          <div className="grid grid-cols-1 gap-4">
            {PROGRAMMING_SOFTWARE.map((item) => (
              <a href={item.link} key={item.id} target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-xl flex items-center gap-4 cursor-pointer group relative block">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all overflow-hidden p-2">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-bold text-text-main">{item.title[lang]}</div>
                  <div className="text-xs text-text-muted">{item.subtitle[lang]}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: People & Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* People to Follow */}
        <div className="space-y-6">
          <h4 className="flex items-center gap-2 text-lg font-bold text-neon-purple"><Users className="w-5 h-5" />{lang === 'EN' ? 'People to Follow' : '关注的专家'}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FOLLOW_PEOPLE.map((item) => (
              <a href={item.link} key={item.id} target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-xl flex items-center gap-4 cursor-pointer group relative block">
                <div className="w-10 h-10 rounded-lg bg-neon-purple/10 flex items-center justify-center text-neon-purple group-hover:bg-neon-purple group-hover:text-white transition-all overflow-hidden">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-bold text-text-main">{item.title[lang]}</div>
                  <div className="text-xs text-text-muted">{item.subtitle[lang]}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* AI Courses */}
        <div className="space-y-6">
          <h4 className="flex items-center gap-2 text-lg font-bold text-neon-cyan"><GraduationCap className="w-5 h-5" />{lang === 'EN' ? 'AI Courses' : '学习的课程'}</h4>
          <div className="grid grid-cols-1 gap-4">
            {AI_COURSES.map((item) => (
              <a href={item.link} key={item.id} target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-xl flex items-center gap-4 cursor-pointer group relative block">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all overflow-hidden p-2">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-bold text-text-main">{item.title[lang]}</div>
                  <div className="text-xs text-text-muted">{item.subtitle[lang]}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MessagesPage = ({ lang }: { lang: 'EN' | 'CN' }) => (
  <section className="mb-20">
    <div className="mb-12 text-center">
      <SectionTitle>{lang === 'EN' ? 'Message Board' : '留言板'}</SectionTitle>
      <p className="text-text-muted max-w-2xl mx-auto">
        {lang === 'EN' ? 'Leave a message or reach out through these channels.' : '留下您的信息或通过这些渠道联系我。'}
      </p>
    </div>
    <div className="max-w-3xl mx-auto glass p-8 rounded-3xl mb-12">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder={lang === 'EN' ? 'Name' : '姓名'} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-cyan transition-colors" />
          <input type="email" placeholder={lang === 'EN' ? 'Email' : '邮箱'} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-cyan transition-colors" />
        </div>
        <textarea placeholder={lang === 'EN' ? 'Message' : '留言内容'} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-cyan transition-colors"></textarea>
        <button className="w-full py-4 bg-gradient-to-r from-neon-cyan to-blue-600 rounded-xl font-bold text-white hover:brightness-110 transition-all">
          {lang === 'EN' ? 'Send Message' : '发送留言'}
        </button>
      </form>
    </div>
  </section>
);

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<'EN' | 'CN'>('EN');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'cyber' | 'claude'>('cyber');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === 'cyber' ? 'claude' : 'cyber');

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[var(--bg-from)] via-[var(--bg-via)] to-[var(--bg-to)] selection:bg-neon-primary/30 transition-colors duration-500">
        <Navbar 
          lang={lang} 
          setLang={setLang} 
          theme={theme} 
          toggleTheme={toggleTheme} 
          isScrolled={isScrolled} 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
        />
        <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          <Routes>
            <Route path="/" element={<AboutPage lang={lang} />} />
            <Route path="/works" element={<WorksPage lang={lang} />} />
            <Route path="/library" element={<LibraryPage lang={lang} />} />
            <Route path="/messages" element={<MessagesPage lang={lang} />} />
          </Routes>
        </main>
        <Footer lang={lang} />
      </div>
    </Router>
  );
}

const Navbar = ({ lang, setLang, theme, toggleTheme, isScrolled, mobileMenuOpen, setMobileMenuOpen }: any) => {
  const location = useLocation();
  const navLinks = [
    { name: lang === 'EN' ? 'About' : '关于我', href: '/', icon: <Info className="w-4 h-4" /> },
    { name: lang === 'EN' ? 'Works' : '作品集', href: '/works', icon: <Briefcase className="w-4 h-4" /> },
    { name: lang === 'EN' ? 'Library' : '资源库', href: '/library', icon: <BookOpen className="w-4 h-4" /> },
    { name: lang === 'EN' ? 'Messages' : '留言板', href: '/messages', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 glass shadow-lg' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-neon-cyan flex items-center justify-center glow-primary group-hover:scale-110 transition-transform">
            <span className="text-[var(--bg-from)] font-bold text-xl">N</span>
          </div>
          <span className="font-bold text-xl tracking-tighter hidden sm:block">CYBER<span className="text-neon-cyan">PORTFOLIO</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === link.href ? 'text-neon-cyan' : 'text-text-muted hover:text-neon-cyan'}`}
            >
              {link.icon}{link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="glass p-2 rounded-full hover:border-neon-primary transition-all group">
            <Palette className={`w-5 h-5 transition-colors ${theme === 'cyber' ? 'text-slate-400 group-hover:text-neon-cyan' : 'text-amber-700 group-hover:text-amber-900'}`} />
          </button>
          <button onClick={() => setLang(lang === 'EN' ? 'CN' : 'EN')} className="glass px-3 py-1 rounded-full text-xs font-bold hover:border-neon-cyan transition-colors">
            {lang}
          </button>
          <button className="md:hidden text-text-main" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden glass border-t border-white/10 overflow-hidden">
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 text-lg font-medium ${location.pathname === link.href ? 'text-neon-cyan' : 'text-text-muted'}`}>
                  {link.icon}{link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ lang }: { lang: 'EN' | 'CN' }) => (
  <footer className="border-t border-white/10 py-12 glass">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-neon-cyan flex items-center justify-center">
          <span className="text-[var(--bg-from)] font-bold text-sm">N</span>
        </div>
        <span className="font-bold text-lg tracking-tighter">CYBER<span className="text-neon-cyan">PORTFOLIO</span></span>
      </div>
      <p className="text-text-muted text-sm">© 2026 Niki Yang. Built with React, Tailwind & Framer Motion.</p>
      <div className="flex gap-6">
        <a href="#" className="text-text-muted hover:text-neon-cyan transition-colors"><Github className="w-5 h-5" /></a>
        <a href="#" className="text-text-muted hover:text-green-500 transition-colors"><MessageCircle className="w-5 h-5" /></a>
        <a href="#" className="text-text-muted hover:text-red-500 transition-colors"><Mail className="w-5 h-5" /></a>
      </div>
    </div>
  </footer>
);
