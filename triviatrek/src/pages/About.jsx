import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Target, Users, Award, Zap, Heart, Code, Lightbulb, Sparkles, TrendingUp, Globe, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: <BookOpen size={32} />,
      title: "Diverse Categories",
      description: "Explore thousands of questions across multiple categories including Science, History, Entertainment, and more.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Target size={32} />,
      title: "Multiple Difficulty Levels",
      description: "Challenge yourself with Easy, Medium, or Hard difficulty levels tailored to your skill level.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Award size={32} />,
      title: "Track Your Progress",
      description: "Monitor your performance, view detailed analytics, and see how you improve over time.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <Users size={32} />,
      title: "Compete Globally",
      description: "Join the leaderboard and compete with players from around the world to see who ranks highest.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Zap size={32} />,
      title: "Real-Time Quizzes",
      description: "Take timed quizzes with instant feedback and detailed explanations for each question.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Learn & Improve",
      description: "Review your mistakes, understand correct answers, and expand your knowledge with every quiz.",
      color: "from-rose-500 to-pink-500",
    },
  ];

  const stats = [
    { label: "Categories", value: "50+", icon: <BookOpen size={24} />, delay: 0.1 },
    { label: "Questions", value: "10K+", icon: <Target size={24} />, delay: 0.2 },
    { label: "Active Users", value: "1K+", icon: <Users size={24} />, delay: 0.3 },
    { label: "Quiz Attempts", value: "5K+", icon: <Award size={24} />, delay: 0.4 },
  ];

  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Create your free account to start your trivia journey. It only takes a minute!",
      color: "from-blue-500 to-indigo-600",
      icon: <Rocket size={28} />,
    },
    {
      number: 2,
      title: "Choose a Quiz",
      description: "Browse through our extensive collection of categories and select a quiz that interests you.",
      color: "from-purple-500 to-pink-600",
      icon: <BookOpen size={28} />,
    },
    {
      number: 3,
      title: "Play & Compete",
      description: "Answer questions, see your results, and climb the leaderboard to become a trivia master!",
      color: "from-amber-500 to-orange-600",
      icon: <TrendingUp size={28} />,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-xl mb-4 border border-white/20"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <Heart className="text-red-500" size={20} />
              </motion.div>
              <span className="text-sm font-semibold text-gray-700">About TriviaTrek</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight"
            >
              Welcome to
              <motion.span
                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                TriviaTrek
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Your ultimate destination for challenging quizzes, learning new facts, and competing with players worldwide.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mt-8"
            >
              <motion.div
                variants={floatingVariants}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
              >
                <Globe size={18} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Join the Global Community</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 text-white shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.h3
                  className="text-5xl font-bold text-gray-900 mb-3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: stat.delay, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-600 font-semibold text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="bg-white rounded-3xl shadow-2xl p-12 md:p-20 overflow-hidden relative"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-100/50 to-rose-100/50 rounded-full blur-3xl -ml-32 -mb-32" />

            <div className="relative z-10">
              <motion.div variants={itemVariants} className="text-center mb-16">
                <motion.div
                  className="inline-flex items-center gap-2 mb-6"
                  whileHover={{ scale: 1.1 }}
                >
                  <Sparkles className="text-yellow-500" size={32} />
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  To make learning fun, engaging, and accessible to everyone through interactive quizzes
                  and friendly competition.
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
              >
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 shadow-lg"
                >
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <BookOpen className="text-blue-600" size={32} />
                    What We Offer
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    TriviaTrek provides a comprehensive quiz platform where you can test your knowledge
                    across various topics, track your progress, and compete on global leaderboards.
                    Whether you're a trivia enthusiast or just looking to learn something new, we've
                    got something for everyone.
                  </p>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border border-purple-100 shadow-lg"
                >
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Target className="text-purple-600" size={32} />
                    Why Choose Us
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Our platform combines the best of learning and entertainment. With thousands of
                    questions, multiple difficulty levels, detailed analytics, and a vibrant community
                    of players, TriviaTrek is the perfect place to challenge yourself and grow your
                    knowledge.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="text-yellow-500" size={28} />
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Key Features
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
            >
              Everything you need for an amazing quiz experience
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="group p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg relative z-10`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-white/30 backdrop-blur-sm relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600"
            >
              Get started in three simple steps
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          >
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 transform -translate-y-1/2 z-0" />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="text-center p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative z-10"
              >
                <motion.div
                  className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6 shadow-lg relative`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="absolute">{step.number}</span>
                </motion.div>
                <motion.div
                  className="mb-4 flex justify-center"
                  whileHover={{ y: -5 }}
                >
                  <div className={`p-4 bg-gradient-to-br ${step.color} rounded-2xl text-white shadow-lg`}>
                    {step.icon}
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            />

            <motion.div variants={itemVariants} className="relative z-10">
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-6"
                whileHover={{ scale: 1.05 }}
              >
                Ready to Start?
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl mb-10 opacity-95"
              >
                Join thousands of players testing their knowledge every day
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/Category"
                    className="inline-block px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform transition-all duration-300"
                  >
                    Explore Categories
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/leaderboard"
                    className="inline-block px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                  >
                    View Leaderboard
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-gray-600 mb-4"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Code size={20} />
            </motion.div>
            <p className="text-base font-medium">
              Built with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block"
              >
                <Heart className="inline text-red-500" size={18} />
              </motion.span>{" "}
              for trivia enthusiasts
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-gray-500"
          >
            © 2025 TriviaTrek. All rights reserved.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default About;
